import React from 'react'
import { Link } from 'react-router';

import './Layout.css'

const Layout = ({ children }) => {

  const linkProps = {
    className: 'layout__nav-link',
    activeClassName: 'layout__nav-link--selected',
  }

  return (
    <div className="layout layout--main">
      <nav className="layout__nav">
        <span className="layout__nav-header">Listman</span>
        <Link to='/' { ...linkProps }>Home</Link>
        <Link to='/lists/' { ...linkProps }>Lists</Link>
      </nav>
      <div className="layout__content">
        { children }
      </div>
      <footer className="layout__footer">
        v0.1: No Functionality (
        <a href="http://github.com/adamsome/listman">
          github.com/adamsome/listman
        </a>
        )
      </footer>
    </div>
  )
}

export default Layout
