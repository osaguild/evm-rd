import { DefenderRelaySigner, DefenderRelayProvider } from 'defender-relay-client/lib/ethers'
import 'dotenv/config'
import { AdminAccessControl__factory } from '../../typechain-types'

async function main() {
  const credentials = {
    apiKey: process.env.RELAYER_API_KEY as string,
    apiSecret: process.env.RELAYER_API_SECRET as string,
  }
  const provider = new DefenderRelayProvider(credentials)
  const signer = new DefenderRelaySigner(credentials, provider, { speed: 'fast' })
  //await AdminAccessControl__factory.connect('0x6f5FcAE8485015Fba44bF8EB9F8AcB15Cc3B11c9', signer).beDeveloper()
  await AdminAccessControl__factory.connect('0x6f5FcAE8485015Fba44bF8EB9F8AcB15Cc3B11c9', signer).dev()
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
