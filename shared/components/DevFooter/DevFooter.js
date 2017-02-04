import React from 'react'
import { Link } from 'react-router'

import Footer from '../Layout/Footer'
import BodyColumn from '../Layout/BodyColumn'
import Columns from '../Layout/Columns'
import Column from '../Layout/Columns/Column'

const DevFooter = () => (
  <Footer>
    <BodyColumn>
      {/* Temp dev tools */}
      <h4 className="title is-4">Dev tools</h4>
      <Columns multiline>
        <Column>
          <strong>Temp</strong>
          <br />
          <Link to='/'>/[home]</Link>
          <br />
          <Link to='/posts'>/posts</Link>
        </Column>
        <Column>
          <strong>User links</strong>
          <br />
          <Link to='/adamsome'>/adamsome</Link>
          <br />
          <Link to='/other-user'>/other-user</Link>
          <br />
          <Link to='/long-maximum-length-user-name-32'>
            /long-maximum-length-user-name-32
          </Link>
          <br />
          <Link to='/not-a-user'>/not-a-user</Link>
        </Column>
      </Columns>
    </BodyColumn>
  </Footer>
)

export default DevFooter
