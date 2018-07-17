import React, { Component} from 'react';
import { Container, Grid, Image } from 'semantic-ui-react';
import Head from 'next/head';
import NavBar from '../components/NavBar';
import "../style.css";
import BaseLayout from '../components/BaseLayout';
import FAQs from '../components/FAQs';

class About extends Component {

  render() {
    return (
      <BaseLayout>
        <NavBar />
        <div className="hero">
         <Container>
          <div className="hero-text">
            <h1 id='Hero-Title'>FAQs</h1>
          </div>
          </Container>
        <img className='hero-image' src='../../static/Hero-Image.png'/>
      </div>

      <Container id="About-Container">
        <Head>
          <link rel="stylesheet" href="/_next/static/style.css" />
          <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.12/semantic.min.css" />
          <link href="https://fonts.googleapis.com/css?family=Libre+Baskerville:400,700|Pinyon+Script" rel="stylesheet" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
   
        <FAQs/>
      </Container>
      </BaseLayout>
    )
  }
}

export default About;
