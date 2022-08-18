const Blockchain = require('./blockchain')

const blockchain = new Blockchain()

blockchain.addBlock({ data: 'initial' })

let prevTimestamp, nextTimestamp, nextBlock, timeDiff, average

const times = []

for (let i = 0; i < 10000; i++) {
  prevTimestamp = blockchain.chain[blockchain.chain.length - 1].timestamp

  blockchain.addBlock({ data: `block ${i}` })
  nextBlock = blockchain.chain[blockchain.chain.length - 1]

  nextTimestamp = nextBlock.timestamp
  //how long it took to mine block
  timeDiff = nextTimestamp - prevTimestamp
  //push to times array
  times.push(timeDiff)

  //js reduce function: will add each num in the times array to one number
  //then divide by times.length to find average
  average = times.reduce((total, num) => total + num) / times.length

  console.log(
    `Time to mine block: ${timeDiff}ms. Difficulty: ${nextBlock.difficulty}. Average time: ${average}ms`
  )
}
