import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { ArticleTable } from '../tables/ArticleTable';
import ReactLoading from 'react-loading';

export class ArticlesPage extends Component {
    constructor(props) {
        super(props);
        this.state = { articles: [], loading: true};
    }

    componentDidMount() {
        this.populateData("");
    }

    search(value, event) {
        this.populateData(value);
    }

    render() {
        const isLoading = this.state.loading;
        if (isLoading)
            return (<ReactLoading type="cylon" color="black" height={667} width={375} />);
        else
            return (<ArticleTable articles={this.state.articles} />);
    }

    async populateData(value) {
        this.setState({ articles: [], loading: true});
        let url = 'api/articles';
        if (value)
            url = url + '?name=' + value;
        const response = await fetch(url);
        const data = await response.json();
        this.setState({ articles: data, loading: false});
    }
}
