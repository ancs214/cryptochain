const Transaction = require('./transaction')
const { STARTING_BALANCE } = require('../config')
const { ec, cryptoHash } = require('../util')

//create wallet class with starting balance of 1000
class Wallet {
  constructor() {
    this.balance = STARTING_BALANCE

    //use elliptical npm to generate key pair
    this.keyPair = ec.genKeyPair()

    //set public key property on this instance; parse to hex format
    this.publicKey = this.keyPair.getPublic().encode('hex')
  }

  //key pair sign method to sign data; first parse data to a single cryptographic hash
  sign(data) {
    return this.keyPair.sign(cryptoHash(data))
  }

  createTransaction({ recipient, amount }) {
    if (amount > this.balance) {
      //throw instance of Error class in JS
      throw new Error('Amount exceeds balance')
    }

    //need senderWallet to represent the local wallet instance
    return new Transaction({ senderWallet: this, recipient, amount })
  }
}

module.exports = Wallet
