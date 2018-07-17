const path = require('path');
const solc = require('solc');
const fs = require('fs-extra');

// Deletes current build folder
const buildPath = path.resolve(__dirname,'build');
fs.removeSync(buildPath);

// Compile solidity contracts
const campaignPath = path.resolve(__dirname,'contracts','Marriage.sol');
const source = fs.readFileSync(campaignPath,'utf8');
const output = solc.compile(source,1).contracts;

console.log(output);
fs.ensureDirSync(buildPath);
for (contract in output) {
  fs.outputJsonSync(
    path.resolve(buildPath, contract.replace(":", "") + '.json'), output[contract]
  );
}
