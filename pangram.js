const SHA256 = require('crypto-js/sha256');

class CryptoBlock {
  constructor(index, timestamp, data, precedingHash = ' ') {
    this.index = index;
    this.timestamp = timestamp;
    this.data = data;
    this.precedingHash = precedingHash;
    this.hash = this.computeHash();
  }
  computeHash() {
    return SHA256(
      this.index +
        this.precedingHash +
        this.timestamp +
        JSON.stringify(this.data)
    ).toString();
  }
}

class CryptoBlockchain {
  constructor() {
    this.blockchain = [this.startGenesisBlock()];
  }
  startGenesisBlock() {
    return new CryptoBlock(0, '01/01/2021', 'Initial Block in the Chain', '0');
  }
  obtainLatestBlock() {
    return this.blockchain[this.blockchain.length - 1];
  }
  addNewBlock(newBlock) {
    newBlock.precedingHash = this.obtainLatestBlock().hash;
    newBlock.hash = newBlock.computeHash();
    this.blockchain.push(newBlock);
  }
}

let pangramCoin = new CryptoBlockchain();
pangramCoin.addNewBlock(
  new CryptoBlock(1, '01/06/2021', {
    sender: 'Iris Ljesnjanin',
    recipient: 'Cosima Mielke',
    quantity: 50,
  })
);
pangramCoin.addNewBlock(
  new CryptoBlock(2, '01/07/2021', {
    sender: 'Vitaly Friedman',
    recipient: 'Ricardo Gimenes',
    quantity: 100,
  })
);
console.log(JSON.stringify(pangramCoin, null, 4));
