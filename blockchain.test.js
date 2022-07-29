const Blockchain = require('./blockchain');
const Block = require('./block');

describe('Blockchain', () => {
    const blockchain = new Blockchain();

    it('containts a chain array instance', () => {
        expect(blockchain.chain instanceof Array).toBe(true);
    });

    it('starts with the genesis block', () => {
        expect(blockchain.chain[0].toEqual(Block.genesis()));
    });

    it('adds a news block to the chain', () => {
        const newData = 'foo bar'; 
        blockchain.addBlock({ data: newData });
    });
});