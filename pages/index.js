import React, { Component } from 'react';
import Layout from '../components/Layout';
import { Link } from '../routes'
import marriageRegistry from '../ethereum/contracts/MarriageRegistry';
import MarriageContract from '../ethereum/contracts/Marriage';
import { Card, Button } from 'semantic-ui-react';
import { epochToDate } from '../helper';
import { Blacklist } from '../blacklist';
import FAQs from '../components/FAQs';
import _ from 'lodash';

class MarriageIndex extends Component {

  static async getInitialProps() {
    const deployedMarriages = await marriageRegistry.methods.getDeployedMarriages().call();
    // Omits blacklisted contract addresses from list, to not be shown
    const displayMarriages = _.difference(deployedMarriages, Blacklist);

    // Now contracts are rendered in LIFO order - perfect
    const allMarriages = displayMarriages.reverse();
    const size = allMarriages.length;

    const marriageContracts = await Promise.all(
      Array(size).fill().map((item, index) => {
        return MarriageContract(allMarriages[index]);
      })
    );

    // marriageItems are the actual marriage details that will be rendered
    const marriageItems = await Promise.all(
      Array(size).fill().map((item, index) => {
        return marriageContracts[index].methods.getMarriageDetails().call();
      })
    )
    return { allMarriages, marriageItems };
  }

  renderItems() {
    const colors = ['red', 'orange', 'yellow', 'olive', 'green', 'teal', 'blue', 'violet', 'purple', 'pink', 'brown', 'grey'];

    const items = this.props.marriageItems.map((marriage, index) => {
      return {
        key: this.props.allMarriages[index],
        color: colors[index % colors.length],
        header: `${marriage[1]} and ${marriage[3]}`,
        meta: `Married on ${epochToDate(marriage[5])}`,
        description: (
          <Link route={`/vows/${this.props.allMarriages[index]}`}>
            <a className='vows-link'>{ `${marriage[2]}`}</a>
          </Link>
          ),
        fluid: true
      }
    })

    return <Card.Group items= { items } className='Index-Cards' itemsPerRow={4} stackable={true} doubling={true}/>
  }

  render() {
    return (
      <Layout>
        <FAQs />
        <h2 className='Vows-Title'>Vows</h2>
        { this.renderItems() }
      </Layout>
    )
  }
}

export default MarriageIndex;
