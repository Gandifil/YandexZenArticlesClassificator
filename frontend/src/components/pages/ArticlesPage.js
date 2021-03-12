import React, { Component } from 'react';
import { Button } from 'reactstrap';
import { ArticleTable } from '../forms/ArticleTable';
import ReactLoading from 'react-loading';
import { ArticleSearchModal } from '../forms/ArticleSearchModal';

export class ArticlesPage extends Component {
    constructor(props) {
        super(props);
        this.state = { articles: [], loading: true };
        this.modal = React.createRef();

        this.handleClick = (e) => this.modal.current.show();
        this.handleModalSubmit = (e) => this.populateData();
    }

    componentDidMount() {
        this.populateData();
    }

    render() {
        const contents = this.state.loading
            ? <ReactLoading type="cylon" color="black" height={667} width={375} />
            : <ArticleTable articles={this.state.articles} />;

        return (
            <div>
                <Button color="primary" size="lg" block onClick={this.handleClick}>Фильтрация</Button>
                <ArticleSearchModal ref={this.modal} onSubmit={ this.handleModalSubmit } />
                {contents}
            </div>
            );
    }

    async populateData() {
        this.setState({ articles: [], loading: true });
        const filter = this.modal.current.state.item;

        const url = 'api/articles?title=' + filter.title + '&author=' + filter.author + '&tag=' + filter.tag;
        const response = await fetch(url);
        const data = await response.json();
        this.setState({ articles: data, loading: false});
    }
}
