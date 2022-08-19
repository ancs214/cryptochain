const redis = require('redis')

const CHANNELS = {
  TEST: 'TEST',
  BLOCKCHAIN: 'BLOCKCHAIN',
}

class PubSub {
  //pass in a blockchain so every PubSub instance will have a local blockchain
  constructor({ blockchain }) {
    this.blockchain = blockchain

    this.publisher = redis.createClient()
    this.subscriber = redis.createClient()

    this.subscribeToChannels()

    this.subscriber.on('message', (channel, message) =>
      this.handleMessage(channel, message)
    )
  }

  //log message to console
  handleMessage(channel, message) {
    console.log(`Message received. Channel: ${channel}. Message: ${message}.`)

    const parsedMessage = JSON.parse(message)

    if (channel === CHANNELS.BLOCKCHAIN) {
      //replaceChain from blockchain.js function
      this.blockchain.replaceChain(parsedMessage)
    }
  }

  //automatically subscribes to all channels
  subscribeToChannels() {
    //get an array of all channel values
    Object.values(CHANNELS).forEach((channel) => {
      this.subscriber.subscribe(channel)
    })
  }

  publish({ channel, message }) {
    this.publisher.publish(channel, message)
  }

  broadcastChain() {
    this.publish({
      channel: CHANNELS.BLOCKCHAIN,
      //must stringify because this.blockchain.chain is an array
      message: JSON.stringify(this.blockchain.chain),
    })
  }
}

module.exports = PubSub
