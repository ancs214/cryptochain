const TransactionPool = require('./transaction-pool')
const Transaction = require('./transaction')
const Wallet = require('./index')

describe('TransactionPool', () => {
  let transactionPool, transaction, senderWallet

  beforeEach(() => {
    transactionPool = new TransactionPool()
    senderWallet = new Wallet()
    transaction = new Transaction({
      senderWallet,
      recipient: 'fake-recipient',
      amount: 50,
    })
  })

  describe('setTransaction()', () => {
    it('adds a transaction', () => {
      transactionPool.setTransaction(transaction)

      //our transactionPool should have the transaction added to the transactionMap - looking for transaction id
      expect(transactionPool.transactionMap[transaction.id])
        //toBe with an object will test if that object is the ORIGINAL instance of that object - no changes in properties
        .toBe(transaction)
    })
  })

  describe('existingTransaction()', () => {
    it('returns an existing transaction given an input address', () => {
      //make sure a transaction exists in the transaction pool, passing in overall transaction object
      transactionPool.setTransaction(transaction)

      //the transaction should be the input address: senderwallet
      expect(
        transactionPool.existingTransaction({
          inputAddress: senderWallet.publicKey,
        })
      ).toBe(transaction)
    })
  })
})
