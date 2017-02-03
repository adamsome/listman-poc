import React from 'react';
import { Match, Miss } from 'react-router';

import './globals.css';

import AsyncHome from './AsyncHome';
import AsyncPosts from './AsyncPosts';
import AsyncAbout from './AsyncAbout';
import Error404 from './Error404';
import Header from './Header';

function DemoApp() {
  return (
    <div style={{ padding: '10px' }}>
      <Header />

      <Match exactly pattern="/" component={AsyncHome} />
      <Match pattern="/posts" component={AsyncPosts} />
      <Match pattern="/about" component={AsyncAbout} />
      <Miss component={Error404} />
    </div>
  );
}

export default DemoApp;
