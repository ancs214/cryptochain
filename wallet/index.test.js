const Wallet = require('./index')
const Transaction = require('./transaction')
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

  describe('createTransaction()', () => {
    describe('and the amount exceeds the balance', () => {
      it('throws an error', () => {
        expect(() =>
          wallet.createTransaction({
            amount: 999999,
            recipient: 'foo-recipient',
          })
        ).toThrow('Amount exceeds balance')
      })
    })

    describe('and the amount is valid', () => {
      let transaction, amount, recipient

      beforeEach(() => {
        amount = 50
        recipient = 'foo-recipient'
        transaction = wallet.createTransaction({ amount, recipient })
      })

      it('creates an instance of `Transaction`', () => {
        //make sure to import Transaction class at top
        expect(transaction instanceof Transaction).toBe(true)
      })

      it('matches the transaction input with the wallet', () => {
        expect(transaction.input.address).toEqual(wallet.publicKey)
      })

      it('outputs the amount to the recipient', () => {
        expect(transaction.outputMap[recipient]).toEqual(amount)
      })
    })
  })
})
