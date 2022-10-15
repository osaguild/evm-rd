import { ethers } from 'hardhat'
import { expect } from 'chai'
import { initialize } from 'zokrates-js'
import { Verifier1, Verifier2 } from '../typechain-types'

describe('zkp', () => {
  describe('x*x=y', () => {
    // common
    let verifier: Verifier1
    const R = ['4', '16']
    let C: Uint8Array
    let PK: Uint8Array

    before(async () => {
      const provider = await initialize()

      // generate C using R and hash
      const source = `
      def main(private field x, field y) {
        assert(x * x == y);
        return;
      }    
      `
      C = provider.compile(source).program

      // generate PK. VK already set in the contract
      const keyPairs = await provider.setup(C)
      PK = keyPairs.pk
      const VK: any = keyPairs.vk

      // deploy Verifier
      const factory = await ethers.getContractFactory('Verifier1')
      verifier = await factory.deploy(VK.alpha, VK.beta, VK.gamma, VK.delta, VK.gamma_abc)
    })

    it('correct answer', async () => {
      const provider = await initialize()

      // generate proof
      const { witness } = provider.computeWitness(C, R)
      const proof = provider.generateProof(C, witness, PK)

      // verify proof
      const pass = await verifier.verifyTx(proof.proof as Verifier1.ProofStruct, proof.inputs as [string])
      expect(pass).to.be.true
    })

    it('other correct answer', async () => {
      const provider = await initialize()

      // generate proof
      const { witness } = provider.computeWitness(C, ['2', '4'])
      const proof = provider.generateProof(C, witness, PK)

      // verify proof
      const pass = await verifier.verifyTx(proof.proof as Verifier1.ProofStruct, proof.inputs as [string])
      expect(pass).to.be.true
    })

    it('private is correct, public is incorrect', async () => {
      const provider = await initialize()
      expect(() => {
        provider.computeWitness(C, ['4', '17'])
      }).throw()
    })

    it('private is incorrect, public is correct', async () => {
      const provider = await initialize()
      expect(() => {
        provider.computeWitness(C, ['3', '16'])
      }).throw()
    })

    it('proof is different every witness, and same witness generate different proof ', async () => {
      const provider = await initialize()

      // generate proof
      const res1 = provider.computeWitness(C, ['2', '4'])
      const res2 = provider.computeWitness(C, ['4', '16'])
      const res3 = provider.computeWitness(C, ['8', '64'])

      const proof1 = provider.generateProof(C, res1.witness, PK)
      const _proof1 = provider.generateProof(C, res1.witness, PK)
      const proof1_ = provider.generateProof(C, res1.witness, PK)
      const proof2 = provider.generateProof(C, res2.witness, PK)
      const proof3 = provider.generateProof(C, res3.witness, PK)

      expect(proof1).not.equal(_proof1)
      expect(proof1).not.equal(proof1_)
      expect(_proof1).not.equal(proof1_)
      expect(proof1).not.equal(proof2)
      expect(proof1).not.equal(proof3)
      expect(proof2).not.equal(proof3)
    })
  })

  describe('password', () => {
    // common
    let verifier: Verifier2
    const R = ['1', '2', '3', '4']
    let C: Uint8Array
    let PK: Uint8Array

    before(async () => {
      const provider = await initialize()

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
      C = provider.compile(hashCheckSource).program

      // generate PK. VK already set in the contract
      const keyPairs = await provider.setup(C)
      PK = keyPairs.pk
      const VK: any = keyPairs.vk

      // deploy Verifier
      const factory = await ethers.getContractFactory('Verifier2')
      verifier = await factory.deploy(VK.alpha, VK.beta, VK.gamma, VK.delta, VK.gamma_abc[0])
    })

    it('correct answer', async () => {
      const provider = await initialize()

      // generate proof
      const { witness } = provider.computeWitness(C, R)
      const proof = provider.generateProof(C, witness, PK)

      // verify proof
      const pass = await verifier.verifyTx(proof.proof as Verifier2.ProofStruct)
      expect(pass).to.be.true
    })

    it('incorrect answer', async () => {
      const provider = await initialize()
      expect(() => {
        provider.computeWitness(C, ['1', '2', '3', '5'])
      }).throw()
      expect(() => {
        provider.computeWitness(C, ['1', '2', '2', '4'])
      }).throw()
      expect(() => {
        provider.computeWitness(C, ['1', '8', '3', '4'])
      }).throw()
      expect(() => {
        provider.computeWitness(C, ['3', '2', '3', '4'])
      }).throw()
    })

    it('proof is different every witness, and same witness generate different proof ', async () => {
      const provider = await initialize()

      const { witness } = provider.computeWitness(C, R)

      const proof1 = provider.generateProof(C, witness, PK)
      const proof2 = provider.generateProof(C, witness, PK)
      const proof3 = provider.generateProof(C, witness, PK)

      expect(proof1).not.equal(proof2)
      expect(proof1).not.equal(proof3)
      expect(proof2).not.equal(proof3)
    })
  })
})
