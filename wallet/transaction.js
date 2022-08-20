//uuid npm creates unique IDs
const uuid = require('uuid/v1')

class Transaction {
  constructor({ senderWallet, recipient, amount }) {
    this.id = uuid()
    this.outputMap = this.createOutputMap({ senderWallet, recipient, amount })
  }

  createOutputMap({ senderWallet, recipient, amount }) {
    const outputMap = {}

    //create key(recipient), value(amount) pairs within outputMap object
    outputMap[recipient] = amount
    outputMap[senderWallet.publicKey] = senderWallet.balance - amount

    return outputMap
  }
}

module.exports = Transaction
