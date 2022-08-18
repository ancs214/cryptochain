const Block = require('./block')

//create Blockchain class with Block class's genesis block
class Blockchain {
  constructor() {
    this.chain = [Block.genesis()]
  }

  //create function to add new block with Block.mineBlock with the last block defined
  addBlock({ data }) {
    const newBlock = Block.mineBlock({
      lastBlock: this.chain[this.chain.length - 1],
      data,
    })

    this.chain.push(newBlock)
  }
}

module.exports = Blockchain
