const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());

const compiledMarriageRegistry = require('../ethereum/build/MarriageRegistry.json');
const compiledMarriage = require('../ethereum/build/Marriage.json');

let accounts;
let marriageRegistry;
let marriageAddress;
let marriageContract;

beforeEach(async () => {
  accounts = await web3.eth.getAccounts();

  marriageRegistry = await new web3.eth.Contract(JSON.parse(compiledMarriageRegistry.interface)) // Creates the idea of contract from ABI
    .deploy({ data: compiledMarriageRegistry.bytecode })       // Creates deployment package
    .send({ from: accounts[0], gas: '1000000'});

  await marriageRegistry.methods.createMarriage("Daniel", "I do", "Nicole", "I really do", 2018, 5, 19).send({
    from: accounts[0],
    gas: '1000000'
  });

  [marriageAddress] = await marriageRegistry.methods.getDeployedMarriages().call();
  marriageContract = await new web3.eth.Contract(
    JSON.parse(compiledMarriage.interface),
    marriageAddress
  )
})

describe('Marriage', () => {
  it('deploys a marriageRegistry and a marriageContract', () => {
    assert.ok(marriageRegistry.options.address);
    assert.ok(marriageContract.options.address);
  });

  it('marks caller as the marriageContract manager', async () => {
    const owner = await marriageContract.methods.owner().call();
    assert.equal(accounts[0], owner);
  })
})
