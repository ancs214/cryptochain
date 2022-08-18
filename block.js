const { GENESIS_DATA } = require('./config')
const cryptoHash = require('./crypto-hash')

//create Block class
class Block {
  //arguments wrapped in an object so we dont have to know the order later on
  constructor({ timestamp, lastHash, hash, data, nonce, difficulty }) {
    //set a property on an instance of the class
    this.timestamp = timestamp
    this.lastHash = lastHash
    this.hash = hash
    this.data = data
    this.nonce = nonce
    this.difficulty = difficulty
  }

  //first block - to get blockchain going
  static genesis() {
    return new this(GENESIS_DATA)
  }

  //new block
  static mineBlock({ lastBlock, data }) {
    let hash, timestamp
    const lastHash = lastBlock.hash
    //destructure difficulty value from lastBlock
    const { difficulty } = lastBlock
    let nonce = 0

    //while hash.substring does not have the correct difficulty criteria, increase nonce by one and run again
    do {
      nonce++
      timestamp = Date.now()
      hash = cryptoHash(timestamp, lastHash, data, nonce, difficulty)
    } while (hash.substring(0, difficulty) !== '0'.repeat(difficulty))

    return new this({
      timestamp,
      lastHash,
      data,
      difficulty,
      nonce,
      hash,
    })
  }
}

module.exports = Block
