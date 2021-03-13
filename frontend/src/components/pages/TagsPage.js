import React, { Component } from 'react';
import { Spinner, SpinnerProps, Form, FormGroup, Label, Input, Col } from 'reactstrap';

export class TagsPage extends Component {
    constructor(props) {
        super(props);

        this.state = { tags: [], loading: true };
    }

    componentDidMount() {
        this.populateData();
    }

    renderTag(tag) {
        return (
            <tr key={tag.id}>
                <td>{tag.id}</td>
                <td>{tag.name}</td>
                <td>{tag.countTags}</td>
                <td>{tag.countClasskeys}</td>
            </tr>
        );
    }

    renderTable() {
        return (
            <table className='table table-striped' aria-labelledby="tabelLabel">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Текст</th>
                        <th>Количество статей с этим тегом</th>
                        <th>Количество статей с этим классом</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.tags.map(x => this.renderTag(x))}
                </tbody>
            </table>
        );
    }

    render() {
        if (this.state.loading)
            return (<div id="center" style={{ position: 'fixed', top: '50%', left: '50%' }}>
                <Spinner color="dark" style={{ width: '20rem', height: '20rem' }} />
            </div>);
        else
            return this.renderTable();
    }

    async populateData() {
        this.setState({ tags: null, loading: true });
        const url = 'api/tags';
        fetch(url)
            .then(response => response.json())
            .then(result => this.setState({ tags: result, loading: false }))
            .catch(e => {
                console.log(e);

                this.setState({ tags: null, loading: false, error: e });
           });
    }
}
