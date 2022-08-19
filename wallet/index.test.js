const Wallet = require('./index')
const { verifySignature } = require('../util')

describe('Wallet', () => {
  let wallet

  beforeEach(() => {
    wallet = new Wallet()
  })

  it('has a `balance`', () => {
    expect(wallet).toHaveProperty('balance')
  })

  it('has a `publicKey`', () => {
    expect(wallet).toHaveProperty('publicKey')
  })

  describe('signing data', () => {
    //define sample data to sign
    const data = 'foobar'

    it('verifies a signature', () => {
      expect(
        verifySignature({
          //might as well test on our wallets public key
          publicKey: wallet.publicKey,
          data,
          //signature should be created by using wallet's sign method
          signature: wallet.sign(data),
        })
      ).toBe(true)
    })

    it('does not verify an invalid signature', () => {
      expect(
        verifySignature({
          publicKey: wallet.publicKey,
          data,
          //now test with a new wallet signature
          signature: new Wallet().sign(data),
        })
      ).toBe(false)
    })
  })
})
