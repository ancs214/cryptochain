//  https://github.com/indutny/elliptic
const EC = require('elliptic').ec
const cryptoHash = require('./crypto-hash')

//create new instance of EC with secp256k1 algorithm
const ec = new EC('secp256k1')

const verifySignature = ({ publicKey, data, signature }) => {
  //use elliptic npm to import public key and save to variable
  const keyFromPublic = ec.keyFromPublic(publicKey, 'hex')

  //return signature verification
  return keyFromPublic.verify(cryptoHash(data), signature)
}

module.exports = { ec, verifySignature, cryptoHash }
