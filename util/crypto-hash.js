//crypto module from node.js
const crypto = require('crypto')

//we dont know how many inputs we will have, so we use spread operator to gather all inputs and put into one array
const cryptoHash = (...inputs) => {
  //crypto.createHash will return a hash obj that can be used to generate hash digests
  const hash = crypto.createHash('sha256')

  //updates hash content with the input data; takes in a string so we can use join. also sort the inputs so it produces the same result no matter what order the inputs are in
  //map over all inputs and stringify - if we keep it an object, it will not create a new hash after changing properties
  hash.update(
    inputs
      .map((input) => JSON.stringify(input))
      .sort()
      .join(' ')
  )

  //return encoding of the returned hash value in binary form using hex-to-binary npm
  return hash.digest('hex')
}

module.exports = cryptoHash
