import React, { Component } from 'react';
import { ArticleRow } from '../rows/ArticleRow';

export class ArticleTable extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
                <table className='table table-striped' aria-labelledby="tabelLabel">
                    <thead>
                        <tr>
                            <th>Наименование статьи</th>
                            <th>Автор</th>
                            <th>Класс</th>
                            <th>Действие</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.articles.map(x => <ArticleRow article={x} />)}
                    </tbody>
                </table>
        );
    }
}