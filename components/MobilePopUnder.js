import React, { Component } from 'react';
import { Grid, Button, Header, Input, Image, Modal } from 'semantic-ui-react';

class MobilePopUnder extends Component {
   state = {
    isParentOpen: true
  }

  handleClick = () => {
    this.setState({
      isParentOpen: false
    });
  }

  render() {
    return (
      <div>
        <Modal
          id='Mobile-Show'
          dimmer={false}
          open={this.state.isParentOpen}
          size="large"
        >
        <Modal.Content image>
          <Grid>
            <Grid.Column width={3}>
              <Image id="Mobile-Pop-Img" wrapped size='big' src='../static/DesktopIcon.png' />
            </Grid.Column>
            <Grid.Column width={13}>
              <h2 id="Mobile-Pop-Header">Best Viewed on Desktop</h2>
              <p id="Mobile-Pop-Content">This page is optimized for desktop with Metamask</p>
              <Button id="Mobile-Pop-Button" basic size="medium" onClick={this.handleClick}>Close</Button>
            </Grid.Column>
          </Grid>
        </Modal.Content>
        </Modal>
      </div>
    )
  } 
}

export default MobilePopUnder;