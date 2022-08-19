const hexToBinary = require('hex-to-binary')
const { GENESIS_DATA, MINE_RATE } = require('../config')
const cryptoHash = require('../util/crypto-hash')

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
    let { difficulty } = lastBlock
    let nonce = 0

    //while hash.substring does not have the correct difficulty criteria, increase nonce by one, adjust difficulty, and run again`
    //add in hexToBinary before adjusting difficulty
    do {
      nonce++
      timestamp = Date.now()
      //adjust difficulty relevant to the timestamp of last block
      difficulty = Block.adjustDifficulty({
        originalBlock: lastBlock,
        timestamp,
      })
      hash = cryptoHash(timestamp, lastHash, data, nonce, difficulty)
    } while (
      hexToBinary(hash).substring(0, difficulty) !== '0'.repeat(difficulty)
    )

    return new this({
      timestamp,
      lastHash,
      data,
      difficulty,
      nonce,
      hash,
    })
  }

  static adjustDifficulty({ originalBlock, timestamp }) {
    const { difficulty } = originalBlock

    //do not allow difficulty to go into negatives
    if (difficulty < 1) return 1

    if (timestamp - originalBlock.timestamp > MINE_RATE) return difficulty - 1

    return difficulty + 1
  }
}

module.exports = Block
