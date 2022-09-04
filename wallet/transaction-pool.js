class TransactionPool {
  constructor() {
    this.transactionMap = {}
  }

  setTransaction(transaction) {
    this.transactionMap[transaction.id] = transaction
  }

  existingTransaction({ inputAddress }) {
    //get array of all transactions in the transaction map
    const transactions = Object.values(this.transactionMap)

    //return the first item in the array that matches a certain condition
    return transactions.find(
      (transaction) => transaction.input.address === inputAddress
    )
  }
}

module.exports = TransactionPool
