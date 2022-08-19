const { STARTING_BALANCE } = require('../config')
const { ec } = require('../util')
const cryptoHash = require('../util/crypto-hash')

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
}

module.exports = Wallet
