const bodyParser = require('body-parser')
const express = require('express')
const Blockchain = require('./blockchain')
const PubSub = require('./pubsub')

const app = express()
const blockchain = new Blockchain()
const pubsub = new PubSub({ blockchain })

setTimeout(() => pubsub.broadcastChain(), 1000)

//using body-parser npm for middleware to parse incoming request bodies to json
app.use(bodyParser.json())

app.get('/api/blocks', (req, res) => {
  res.json(blockchain.chain)
})

app.post('/api/mine', (req, res) => {
  const { data } = req.body

  //add block to chain
  blockchain.addBlock({ data })

  //broadcast post through pubsub
  pubsub.broadcastChain()

  //show user the updated blocks after their post request
  res.redirect('/api/blocks')
})

const DEFAULT_PORT = 3000
let PEER_PORT

//if process env running, define PEER_PORT as below
if (process.env.GENERATE_PEER_PORT === 'true') {
  PEER_PORT = DEFAULT_PORT + Math.ceil(Math.random() * 1000)
}

//if PEER_PORT defined, PORT=PEER PORT, else PORT=DEFAULT PORT
const PORT = PEER_PORT || DEFAULT_PORT
app.listen(PORT, () => console.log(`Listening at localhost: ${PORT}`))
