import React from 'react'

const Layout = ({ children }) => {
  return (
    <div>
      <section className="section">
        {children}
      </section>
      <footer className="footer">
        <div className="container has-text-centered">
          v0.1: No Functionality (
          <a href="http://github.com/adamsome/listman">
            github.com/adamsome/listman
          </a>
          )
        </div>
      </footer>
    </div>
  )
}

export default Layout
