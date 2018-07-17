import React, { Component } from 'react';
import { Container, Grid, Button, Icon } from 'semantic-ui-react';
import Marriage from '../../ethereum/contracts/Marriage';
import Layout from '../../components/CertificateLayout';
import WitnessedByFooter from '../../components/WitnessedByFooter';
import Bell from '../../components/Bell';
import Withdraw from '../../components/Withdraw';
import web3 from '../../ethereum/web3';
import Head from 'next/head'

class VowsShow extends Component {
  state = {
    WithdrawVisible: false
  }
	// Retrieve the marriage contract instance to show the details
	static async getInitialProps(props) {
		const address = props.query.address;
    const marriage = Marriage(address);
		const marriageDetails = await marriage.methods.getMarriageDetails().call();
    const owner = marriageDetails[0];
    const leftName = marriageDetails[1];
    const leftVows = marriageDetails[2];
    const rightName = marriageDetails[3];
    const rightVows = marriageDetails[4];
    const date = marriageDetails[5];
    const bellCounter = marriageDetails[6];

    const weiBalance = await marriage.methods.getBalance().call();
    const balance = await web3.utils.fromWei(weiBalance, 'ether');

    return {
      address, owner, leftName, leftVows, rightName, rightVows, date, bellCounter, balance
    };
	}

  async componentDidMount() {
    const viewerAddress = await web3.eth.getAccounts();
    if (this.props.owner == viewerAddress[0]) {
      this.setState({WithdrawVisible: true});
    }
  }

  epochToDate(numString) {
    const date = new Date(parseInt(numString));
    const month = date.getMonth();
    const day = date.getDate();
    const year = date.getFullYear();
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const dateString = `${months[month]} ${day}, ${year}`;
    return dateString;
  }

  trunc(text){
    return (text.length > 300) ? `${text.substr(0, 300)} ...` : text;
  }

	render() {
		return (
		  <Layout>
        <Head>
          <meta property="og:title" content={this.props.leftName + ' & ' + this.props.rightName}/>
          <meta property="og:type" content="website"/>
          <meta property="og:url" content={'http://forevermore.io' + this.props.url.asPath}/>
          <meta property="og:image" content="http://forevermore.io/static/OGFormImg.png"/>
          <meta property="og:site_name" content="Forevermore.io"/>
          <meta property="og:description"
                content={'See ' + this.props.leftName + "'s and " + this.props.rightName + "'s wedding vows on the blockchain"}/>
        </Head>
        {(this.state.WithdrawVisible) && <Withdraw address={this.props.address} balance={this.props.balance}/> }
        <Container className='Cert-Container'>

          <div className='Large-Cursive'>On {this.epochToDate(this.props.date)}</div>
          <Grid id='Vows-Grid' stackable={true} columns='equal'>
            <Grid.Column className='Large-Serif'>{ this.props.leftName }</Grid.Column>
            <Grid.Column className= 'Form-Input-Label' width={2}>and</Grid.Column>
            <Grid.Column className='Large-Serif'>{ this.props.rightName }</Grid.Column>
          </Grid>

          <div className='Form-Input-Label'>Were united in eternal matrimony</div>
          <div className='Form-Input-Label'>In accordance with the following vows</div>

          <Grid id='Vows-Grid' stackable={true} columns='equal'>
            <Grid.Column className='Vows-Text'>{ this.trunc(this.props.leftVows) }</Grid.Column>
            <Grid.Column width={1}> </Grid.Column>
            <Grid.Column className='Vows-Text'>{ this.trunc(this.props.rightVows) }</Grid.Column>
          </Grid>

          <div className='Large-Cursive'>Ring the Bell</div>
          <Bell address={this.props.address}/>

          <WitnessedByFooter address={this.props.address}/>
        </Container>
		  </Layout>
		)
	}
}

export default VowsShow;
