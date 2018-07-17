import React, { Component } from 'react';
import Layout from '../../components/CertificateLayout'
import MarriageForm from '../../components/MarriageForm'
import { Link } from '../../routes'

class VowsNew extends Component {
	render () {
		return (
  		<Layout>
        <MarriageForm />
      </Layout>
    )
	}
}

export default VowsNew;