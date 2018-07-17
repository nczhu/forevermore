import React, { Component} from 'react';
import { Container, Accordion, Icon, List } from 'semantic-ui-react';
import "../style.css";

class FAQs extends Component {
  state = { activeIndex: 0 }
  handleClick = (e, titleProps) => {
    const { index } = titleProps
    const { activeIndex } = this.state
    const newIndex = activeIndex === index ? -1 : index

    this.setState({ activeIndex: newIndex })
  }

  render() {
    return (
      <Accordion fluid styled className='FAQ-Accordion'>
        <Accordion.Title active={true} index={0} onClick={this.handleClick}>
          <Icon name='dropdown' />
          What is Forevermore?
        </Accordion.Title>
        <Accordion.Content id='Accordion-Content' active={true}>
          <p>Forevermore is a decentralized app that allows you to write your vows to a marriage ‘smart contract’ on the blockchain. Once written, the vows are replicated to every node on the Ethereum network, and are immutably committed to the blockchain. No one can edit or delete them.</p>
          <p>The marriage 'smart contract’ is like your wedding certificate. It’s forever, and unchangeable, its immutability secured by a global network of nodes. It's also publicly viewable by friends and family, and verifiable by anyone. </p>
          <p>There’s also a neat trick that allows friends and family to send ether into your marriage contract by ringing the wedding bell. You’ll be able to later withdraw the ether to the wallet you used to create the contract.</p>
        </Accordion.Content>

        <Accordion.Title active={true} index={1} onClick={this.handleClick}>
          <Icon name='dropdown' />
          How much does it cost?
        </Accordion.Title>
        <Accordion.Content id='Accordion-Content' active={true}>
          <p>Forevermore is free to use. The creators do not profit from this project.</p>
          <p>However, you have to pay a transaction fee to store data to the Ethereum network, paid in gas. You’ll need to make sure you have enough in your Metamask wallet!</p>
          <p>For our example, we paid:</p>
          <List bulleted>
            <List.Item>Creating marriage contract: 0.015 ETH (<a>https://etherscan.io/tx/0xf56db1dc97a53f6986923bcf3c511cab653febaf0f690219066875ddd55d1cab</a>)</List.Item>
            <List.Item>Ringing our wedding bell: 0.001 ETH (<a>https://etherscan.io/tx/0x1b0a1a168ef3a657f4531b400c2a8cd568761820c5a128619600a61e991de5ee</a>)</List.Item>
          </List>
        </Accordion.Content>

        <Accordion.Title active={true} index={2} onClick={this.handleClick}>
          <Icon name='dropdown' />
          Who owns the marriage contract?
        </Accordion.Title>
        <Accordion.Content id='Accordion-Content' active={true}>
          <p>Your marriage contract is 100% owned by you. It was created through your ethereum account through Metamask, and cannot be taken away or destroyed.</p>
        </Accordion.Content>

        <Accordion.Title active={true} index={3} onClick={this.handleClick}>
          <Icon name='dropdown' />
          How much do you guys make from this?
        </Accordion.Title>
        <Accordion.Content id='Accordion-Content' active={true}>
          <p>Nothing. We didn’t even launch an ICO.</p>
          <p>You’re welcome to ring our wedding bell, though!</p>
        </Accordion.Content>

        <Accordion.Title active={true} index={4} onClick={this.handleClick}>
          <Icon name='dropdown' />
          How do I install Metamask to use Forevermore?
        </Accordion.Title>
        <Accordion.Content id='Accordion-Content' active={true}>
          <p>Please look at the <a href="https://www.cryptokitties.co/faq#Installing-MetaMask-your-digital-wallet">Cryptokitties FAQ</a> because we’re too lazy to write our own.</p>
        </Accordion.Content>

        <Accordion.Title active={true} index={5} onClick={this.handleClick}>
          <Icon name='dropdown' />
          Is this Marriage Contract legally binding?
        </Accordion.Title>
        <Accordion.Content id='Accordion-Content' active={true}>
          <p>We don’t know, you should ask your partner.</p>
        </Accordion.Content>
      </Accordion>
    )
  }
}

export default FAQs;