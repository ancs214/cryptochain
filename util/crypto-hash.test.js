const cryptoHash = require('./crypto-hash')

describe('cryptoHash()', () => {
  it('generates a SHA-256 hashed output', () => {
    expect(cryptoHash('foo')).toEqual(
      'b2213295d564916f89a6a42455567c87c3f480fcd7a1c15e220f17d7169a790b'
    )
  })

  it('produces the same hash with the same input args in any order', () => {
    expect(cryptoHash('one', 'two', 'three')).toEqual(
      cryptoHash('three', 'one', 'two')
    )
  })

  //added this to create a new hash for the signature whenever we update a transaction
  it('produces a unique hash when the properties have changed on an input', () => {
    //create object foo
    const foo = {}
    //run cryptoHash function with foo parameter and save to variable originalHash
    const originalHash = cryptoHash(foo)
    //change property of object foo
    foo['a'] = 'a'

    //expect a new and different hash of foo now that we have made a change
    expect(cryptoHash(foo)).not.toEqual(originalHash)
  })
})
