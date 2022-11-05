# chain link

## random number
- [subscription method](https://docs.chain.link/docs/vrf/v2/subscription/)
- [direct funding method](https://docs.chain.link/docs/vrf/v2/direct-funding/)

## subscription method
- open [subscription manager](https://vrf.chain.link/mumbai)
- create subscription
- add funds to subscription which is 5 LINK
- open code on [remix](https://remix.ethereum.org/#url=https://docs.chain.link/samples/VRF/VRFv2Consumer.sol)
- fix parameters as mumbai and deploy
- add contract address to subscription as consumer
- call requestRandomWords()
- call getRequestStatus()

## direct funding method
- open code on [remix](/remix.ethereum.org/#url=https://docs.chain.link/samples/VRF/VRFv2DirectFundingConsumer.sol)
- send 5 LINK to contract address
- call requestRandomWords()
- call getRequestStatus()
