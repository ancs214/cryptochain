const { GENESIS_DATA } = require("./config");

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

static genesis() {
    return new this(GENESIS_DATA);
    }

static mineBlock({ lastBlock, data }) {
    return new this({
        timestamp: Date.now(),
        lastHash: lastBlock.hash,
        data
    })
}
}

module.exports = Block;

