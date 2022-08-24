const TransactionPool = require('./transaction-pool')
const Transaction = require('./transaction')
const Wallet = require('./index')

describe('TransactionPool', () => {
  let transactionPool, transaction

  beforeEach(() => {
    transactionPool = new TransactionPool()
    transaction = new Transaction({
      senderWallet: new Wallet(),
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
})
