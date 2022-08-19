const { STARTING_BALANCE } = require('../config')
const { ec } = require('../util')

//create wallet class with starting balance of 1000
class Wallet {
  constructor() {
    this.balance = STARTING_BALANCE

    //use elliptical npm to generate key pair
    const keyPair = ec.genKeyPair()

    //set public key property on this instance; parse to hex format
    this.publicKey = keyPair.getPublic().encode('hex')
  }
}

module.exports = Wallet
