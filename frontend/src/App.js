import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { ArticlesPage } from './components/pages/ArticlesPage';
import { ArticleViewPage } from './components/pages/ArticleViewPage';
import { withRouter } from "react-router-dom";
import { TagsPage } from './components/pages/TagsPage';
import { ClassifyPage } from './components/pages/ClassifyPage';

export default class App extends React.Component {
  render() {
      return (
          <Layout>
              <Route exact path='/' component={Home} />
              <Route exact path='/articles' component={ArticlesPage} />
              <Route exact path='/tags' component={TagsPage} />
              <Route exact path='/classify' component={ClassifyPage} />
              <Route exact path="/article/:id" component={ArticleViewPage} />
          </Layout>
      );
  }
}