import React from 'react';
import { Container, Button } from 'semantic-ui-react';
import "../style.css";
import { Link } from '../routes';
import BaseLayout from './BaseLayout'

// This is a Head Component, from next!!
import Head from 'next/head';
// My own NavBar component
import NavBar from './NavBar';

// Popunder modal for mobile viewers
import MobilePopUnder from './MobilePopUnder';


// TODO put image in a grid so its somewhat responsive
export default props => {
  return (
    <BaseLayout>
      <NavBar />
      <div className="hero">
         <Container>
          <div className="hero-text">
            <h1 id='Hero-Title'>Your Wedding Vows</h1>
            <h2 id='Hero-Subtitle'>Committed to the blockchain</h2>
            <Link route={`/vows/new`}><Button id='Hero-Button' primary size='big'>Write Vows</Button></Link>
          </div>
          </Container>
        <img className='hero-image' src='../../static/Hero-Image.png'/>
      </div>

      <Container>
        {props.children}
      </Container>

      <MobilePopUnder/>
    </BaseLayout>
  );
};
