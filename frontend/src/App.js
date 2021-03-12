import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { render } from "react-dom";
import { Home } from './components/Home';
import { ArticlesPage } from './components/pages/ArticlesPage';

export default class App extends React.Component {
  render() {
      return (
          <Layout>
              <Route exact path='/' component={Home} />
              <Route exact path='/articles' component={ArticlesPage} />
          </Layout>
      );
  }
}