const bodyParser = require('body-parser')
const express = require('express')
const Blockchain = require('./blockchain')

const app = express()
const blockchain = new Blockchain()

//using body-parser npm for middleware to parse incoming request bodies to json
app.use(bodyParser.json())

app.get('/api/blocks', (req, res) => {
  res.json(blockchain.chain)
})

app.post('/api/mine', (req, res) => {
  const { data } = req.body

  blockchain.addBlock({ data })

  //show user the updated blocks after their post request
  res.redirect('/api/blocks')
})

const PORT = 3000
app.listen(PORT, () => console.log(`Listening at localhost: ${PORT}`))
