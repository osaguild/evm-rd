# nonce

## small nonce transaction

etherscan error is occurred. message: `nonce too low`

## big nonce transaction (success)

- success to broadcast transaction, but not become success status is pending. because skipped nonce 5.
- nonce 6 transaction [0x39901e6a7cce1c15b446fd5e23a8447574769da491b56e546c1fe30a6f3b03a9](https://goerli.etherscan.io/tx/0x39901e6a7cce1c15b446fd5e23a8447574769da491b56e546c1fe30a6f3b03a9)
- I send another transaction which nonce is 5 after.
- nonce 5 transaction [0xf9a55ba56688c10fd5ff150a065dfc64ce4e97675b8945e4db3521a0802883e5](https://goerli.etherscan.io/tx/0xf9a55ba56688c10fd5ff150a065dfc64ce4e97675b8945e4db3521a0802883e5)
- after it nonce 5 and 6 become success status.
