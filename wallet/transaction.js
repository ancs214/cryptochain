//uuid npm creates unique IDs
const uuid = require('uuid/v1')
const { verifySignature } = require('../util')

class Transaction {
  constructor({ senderWallet, recipient, amount }) {
    this.id = uuid()
    this.outputMap = this.createOutputMap({ senderWallet, recipient, amount })
    this.input = this.createInput({ senderWallet, outputMap: this.outputMap })
  }

  createOutputMap({ senderWallet, recipient, amount }) {
    const outputMap = {}

    //create key(recipient), value(amount) pairs within outputMap object
    outputMap[recipient] = amount
    outputMap[senderWallet.publicKey] = senderWallet.balance - amount

    return outputMap
  }

  createInput({ senderWallet, outputMap }) {
    return {
      timestamp: Date.now(),
      amount: senderWallet.balance,
      address: senderWallet.publicKey,
      signature: senderWallet.sign(outputMap),
    }
  }

  update({ senderWallet, recipient, amount }) {
    //set recipient to the amount
    this.outputMap[recipient] = amount

    //subtract amount from senderWallet publicKey
    this.outputMap[senderWallet.publicKey] =
      this.outputMap[senderWallet.publicKey] - amount

    //create new signature for input with createInput func now that transaction has been updated
    this.input = this.createInput({ senderWallet, outputMap: this.outputMap })
  }

  static validTransaction(transaction) {
    //destructure both transaction and input
    const {
      input: { address, amount, signature },
      outputMap,
    } = transaction

    //check if amount = all values contained in outputMap
    const outputTotal = Object.values(outputMap).reduce(
      (total, outputAmount) => total + outputAmount
    )

    if (amount !== outputTotal) {
      console.error(`Invalid transaction from ${address}`)
      return false
    }

    if (!verifySignature({ publicKey: address, data: outputMap, signature })) {
      console.error(`Invalid signature from ${address}`)
      return false
    }

    return true
  }
}

module.exports = Transaction
