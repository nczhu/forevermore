import web3 from '../web3';
import Marriage from '../build/Marriage.json';

export default (address) => {
  return new web3.eth.Contract(
    JSON.parse(Marriage.interface),
    address
  )
}
