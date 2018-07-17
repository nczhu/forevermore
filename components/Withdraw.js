import React, { Component } from 'react';
import { Form, Button, Message } from 'semantic-ui-react';
import Marriage from '../ethereum/contracts/Marriage';
import web3 from '../ethereum/web3';

class Withdraw extends Component {
  state = {
    successMessage: '',
    errorMessage: '',
    loading: false
  }
  
  onWithdraw = async () => {
    event.preventDefault();
    this.setState({ loading: true, successMessage: '', errorMessage: '' });
    const marriage = Marriage(this.props.address);
    try {
      const accounts = await web3.eth.getAccounts();
      const transaction = await marriage.methods.collect().send({
        from: accounts[0]
      });
      this.setState({successMessage: "YAYA"});
      console.log(`Success: ${transaction}`);
    } catch (err) {
      console.log(err);
      this.setState({errorMessage: err});
    }
    this.setState({ loading: false });
  }

  render() {
    return (
      <div className='Withdraw-Div'>
        <h3 id='Withdraw-Text'>You have {this.props.balance} eth</h3>
        <Form onSubmit={this.onWithdraw} error={!!this.state.errorMessage} success={!!this.state.successMessage}> 
          <Message error header='oops!' content={ this.state.errorMessage } />
          <Message success header='yay!' content={ this.state.successMessage } />
          <Button primary loading={this.state.loading} >Withdraw</Button>
        </Form>
      </div>
    )
  };
}

export default Withdraw;