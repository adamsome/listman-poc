import React from 'react';
import Helmet from 'react-helmet';
import getConfig from '../../../../config/get';

import BodyColumn from '../../Layout/BodyColumn'

const Home = () => (
  <BodyColumn>
    <Helmet title="Home" />

    <h2 className="title is-1">{getConfig('welcomeMessage')}</h2>

    <p className="subtitle is-5">
      Under Construction!
    </p>
  </BodyColumn>
)

export default Home;
