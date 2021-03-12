import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { NavMenu } from './NavMenu';

export class Layout extends Component {
  render () {
    return (
      <div>
        <NavMenu />
            <span aria-hidden>&ensp;</span>
        <Container>
          {this.props.children}
        </Container>
      </div>
    );
  }
}
