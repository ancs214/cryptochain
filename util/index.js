const EC = require('elliptic').ec

//create new instance of EC with secp256k1 algorithm
const ec = new EC('secp256k1')

module.exports = { ec }
