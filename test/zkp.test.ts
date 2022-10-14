import { ethers } from 'hardhat'
import { expect } from 'chai'
import { initialize } from 'zokrates-js'
import { Verifier1, Verifier2 } from '../typechain-types'

describe('zkp', () => {
  it('x*x=y', async () => {
    const provider = await initialize()
    const R = ['4', '16']

    // generate C using R and hash
    const source = `
    def main(private field x, field y) {
      assert(x * x == y);
      return;
    }    
    `
    const C = provider.compile(source).program

    // generate PK. VK already set in the contract
    const keyPairs = await provider.setup(C)
    const PK = keyPairs.pk
    const VK: any = keyPairs.vk

    // deploy Verifier
    const factory = await ethers.getContractFactory('Verifier1')
    const verifier = await factory.deploy(VK.alpha, VK.beta, VK.gamma, VK.delta, VK.gamma_abc)

    // generate proof
    const { witness } = provider.computeWitness(C, R)
    const proof = provider.generateProof(C, witness, PK)

    // verify proof
    const pass = await verifier.verifyTx(proof.proof as Verifier1.ProofStruct, proof.inputs as [string])
    expect(pass).to.be.true
  })

  it('password', async () => {
    const provider = await initialize()
    const R = ['1', '2', '3', '4']
    const G = ['1', '2', '3', '4']

    // generate hash
    const hashSource = `
    import "hashes/sha256/512bitPacked" as sha256packed;
    def main(private field a, private field b, private field c, private field d) -> field[2] {
      field[2] h = sha256packed([a, b, c, d]);
      return h;
    }
    `
    const artifacts = await provider.compile(hashSource)
    const { output } = provider.computeWitness(artifacts, R)
    const [hash1, hash2] = JSON.parse(output)

    // generate C using R and hash
    const hashCheckSource = `
    import "hashes/sha256/512bitPacked" as sha256packed;
    def main(private field a, private field b, private field c, private field d) {
      field[2] h = sha256packed([a, b, c, d]);
      assert(h[0] == ${hash1});
      assert(h[1] == ${hash2});
      return;
    }
    `
    const C = provider.compile(hashCheckSource).program

    // generate PK. VK already set in the contract
    const keyPairs = await provider.setup(C)
    const PK = keyPairs.pk
    const VK: any = keyPairs.vk

    // deploy Verifier
    const factory = await ethers.getContractFactory('Verifier2')
    const verifier = await factory.deploy(VK.alpha, VK.beta, VK.gamma, VK.delta, VK.gamma_abc[0])

    // generate proof
    const { witness } = provider.computeWitness(C, G)
    const proof = provider.generateProof(C, witness, PK)

    // verify proof
    const pass = await verifier.verifyTx(proof.proof as Verifier2.ProofStruct)
    expect(pass).to.be.true
  })
})
