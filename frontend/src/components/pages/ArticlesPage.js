import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { ArticleTable } from '../forms/ArticleTable';
import ReactLoading from 'react-loading';
import { ArticleSearchModal } from '../forms/ArticleSearchModal';

export class ArticlesPage extends Component {
    constructor(props) {
        super(props);
        this.state = { articles: [], loading: true };
        this.modal = React.createRef();

        this.handleModalSubmit = (e) => this.populateData(e)
    }

    componentDidMount() {
        this.populateData("");
    }

    search(value, event) {
        this.populateData(value);
    }

    render() {
        const contents = this.state.loading
            ? <ReactLoading type="cylon" color="black" height={667} width={375} />
            : <ArticleTable articles={this.state.articles} />;

        return (
            <div>
                <ArticleSearchModal ref={this.modal} />
                {contents}
            </div>
            );
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
