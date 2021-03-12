import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Button } from 'reactstrap';

export class ArticleRow extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const article = this.props.article;
        return (
            <tr key={article.id}>
                <td>{article.title}</td>
                <td>{article.author}</td>
                <td>{article.classkey}</td>
                <td><Link to={'/articles/' + article.id} className="btn btn-primary">Открыть</Link></td>
            </tr>
        );
    }
}
//<td><Button color="danger">Удалить</Button></td>