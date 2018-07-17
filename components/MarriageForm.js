import React, { Component } from 'react';
import { Container, Form, Button, Icon, Input, Message } from 'semantic-ui-react';
import { DateInput } from 'semantic-ui-calendar-react';
import MarriageRegistry from '../ethereum/contracts/MarriageRegistry';
import Marriage from '../ethereum/contracts/Marriage';
import web3 from '../ethereum/web3';
import { Router } from '../routes';

// TODO: import helper.js
import { fieldsAreValid, dateToEpoch } from '../helper';

class MarriageForm extends Component {

  state = {
    leftName: '',
    rightName: '',
    leftVows: '',
    rightVows: '',
    date: '',
    loading: false,
    errorMessage: '',
    successMessage: '',
    txnHash: 0,
    marriageContractAddress: 0,
    blockWitnessed: 0,
  }

  // Date format: dd-mm-yyyy
  onDateChange = (event, {name, value}) => {
    if (this.state.hasOwnProperty(name)) {
      this.setState({ [name]: value });
    }
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    this.setState({ loading: true, errorMessage: '', successMessage: '' });

    // Form Validation: check date validity
    const fieldErrorMsg = fieldsAreValid(this.state);
    if (!fieldErrorMsg) {
      let { leftName, leftVows, rightName, rightVows } = this.state;
      const date = dateToEpoch(this.state.date);

      // Submitting form to the blockchain
      try {
        const accounts = await web3.eth.getAccounts();
        // (1) Create new marriage contract
        let transaction = await MarriageRegistry.methods
          .createMarriage(leftName, leftVows, rightName, rightVows, date)
          .send({ from: accounts[0] });
        // Update Web app
        this.setState({
          txnHash: transaction.transactionHash, blockWitnessed: transaction.blockNumber,
          successMessage: `Your marriage vows have been witnessed at block: ${transaction.blockNumber} and transaction hash: ${transaction.transactionHash} REDIRECTING NOW ...`
        })
        const contractAddress = transaction.events.ContractCreated.returnValues.contractAddress;
        Router.replaceRoute(`/vows/${contractAddress}`);

      } catch (err) {
        this.setState({ errorMessage: err.message });
      }
    } else {
      // If input fields have input errors:
      this.setState({ errorMessage: fieldErrorMsg });
    }
    this.setState({ loading: false });
  }

  render() {
    return (
      <Container className='Cert-Container'>
      <Form onSubmit={ this.handleSubmit } error={!!this.state.errorMessage} success={!!this.state.successMessage} >

        <div className='Form-Input-Label'>On This Date</div>
        <DateInput
          name='date'
          placeholder='Date'
          value={ this.state.date }
          iconPosition='left'
          onChange={ this.onDateChange }
        />
        <div className='Line-White-Space'/>

        <Form.Group widths='equal' className='Form-Group'>
            <Form.Input
              placeholder="Your Name"
              value = { this.state.leftName }
              onChange = { event => this.setState({leftName: event.target.value}) }
            />
            <span className='Form-Input-Label And-Separator'>and</span>
            <Form.Input
              placeholder="Your Name"
              value = { this.state.rightName }
              onChange = { event => this.setState({rightName: event.target.value}) }
            />
        </Form.Group>
        <div className='Line-White-Space'/>

        <div className='Form-Input-Label'>Were united in eternal matrimony</div>
        <div className='Form-Input-Label'>In accordance with the following vows</div>
        <div className='Line-White-Space'/>

        <Form.Group widths='equal' className='Form-Group'>
          <Form.TextArea
            placeholder='Your vows'
            value={ this.state.leftVows }
            onChange={ event => this.setState({leftVows: event.target.value}) }
          />
          <span>    </span>
          <Form.TextArea
            placeholder='Your vows'
            value={ this.state.rightVows }
            onChange={ event => this.setState({rightVows: event.target.value}) }
          />

        </Form.Group>

        <Message error header='oops!' content={ this.state.errorMessage } />
        <Message success header='yay!' content={ this.state.successMessage } />

        <Button loading={ this.state.loading } id='MarriageBtn' icon labelPosition='left'>
          <Icon name='heart' />
          Submit
        </Button>

      </Form>
      </Container>
    );
  }
};

export default MarriageForm;
