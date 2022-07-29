const { GENESIS_DATA } = require("./config");
const cryptoHash = require("./crypto-hash");

//create Block class
class Block {
    //arguments wrapped in an object so we dont have to know the order later on
    constructor({ timestamp, lastHash, hash, data }) {
        //set a property on an instance of the class
        this.timestamp = timestamp;
        this.lastHash = lastHash;
        this.hash = hash;
        this.data = data;
    }

//first block - to get blockchain going
static genesis() {
    return new this(GENESIS_DATA);
    }

//new block
static mineBlock({ lastBlock, data }) {
    const timestamp = Date.now();
    const lastHash = lastBlock.hash;

    return new this({
        timestamp,
        lastHash,
        data,
        hash: cryptoHash(timestamp, lastHash, data)
    });
}
}

module.exports = Block;

