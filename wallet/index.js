const { STARTING_BALANCE } = require('../config')

//create wallet class with starting balance of 1000
class Wallet {
  constructor() {
    this.balance = STARTING_BALANCE
  }
}

module.exports = Wallet
