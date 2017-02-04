import React from 'react';
import { Link, Match } from 'react-router';
import Helmet from 'react-helmet';

import BodyColumn from '../../Layout/BodyColumn'
import Post from './Post';

const Posts = () => (
  <BodyColumn>
    <Helmet title="Posts" />

    <h1 className="title is-1">Posts</h1>

    <ul>
      <li><Link to="/posts/1">Post 1</Link></li>
      <li><Link to="/posts/2">Post 2</Link></li>
    </ul>

    <Match pattern="/posts/:id" component={Post} />
  </BodyColumn>
)

export default Posts;
