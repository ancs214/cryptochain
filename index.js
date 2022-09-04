const bodyParser = require('body-parser')
const express = require('express')
//using to sync chain on request
const request = require('request')
const Blockchain = require('./blockchain')
const PubSub = require('./app/pubsub')
const TransactionPool = require('./wallet/transaction-pool')
const Wallet = require('./wallet')

const app = express()
const blockchain = new Blockchain()
const transactionPool = new TransactionPool()
const wallet = new Wallet()
const pubsub = new PubSub({ blockchain })

//for use with 'request' to sync chain
const DEFAULT_PORT = 3000
const ROOT_NODE_ADDRESS = `http://localhost:${DEFAULT_PORT}`

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

app.post('/api/transact', (req, res) => {
  //user specifies amount and recipient in request body
  const { amount, recipient } = req.body

  let transaction = transactionPool.existingTransaction({
    inputAddress: wallet.publicKey,
  })

  try {
    //if transaction already exists, run update function
    if (transaction) {
      transaction.update({ senderWallet: wallet, recipient, amount })
    } else {
      //else create new transaction
      transaction = wallet.createTransaction({ recipient, amount })
    }
  } catch (error) {
    return res.status(400).json({ type: 'error', message: error.message })
  }

  //set transaction to transactionPool
  transactionPool.setTransaction(transaction)

  console.log('transactionPool', transactionPool)

  //respond with json object of transaction
  res.json({ type: 'success', transaction })
})

//use 'request' to sync chains
const syncChains = () => {
  request(
    { url: `${ROOT_NODE_ADDRESS}/api/blocks` },
    (error, response, body) => {
      if (!error && response.statusCode === 200) {
        const rootChain = JSON.parse(body)

        console.log('replace chain on a sync with', rootChain)
        blockchain.replaceChain(rootChain)
      }
    }
  )
}

let PEER_PORT

//if process env running, define PEER_PORT as below
if (process.env.GENERATE_PEER_PORT === 'true') {
  PEER_PORT = DEFAULT_PORT + Math.ceil(Math.random() * 1000)
}

//if PEER_PORT defined, PORT=PEER PORT, else PORT=DEFAULT PORT
const PORT = PEER_PORT || DEFAULT_PORT
app.listen(PORT, () => {
  console.log(`Listening at localhost: ${PORT}`)

  if (PORT !== DEFAULT_PORT) {
    syncChains()
  }
})
