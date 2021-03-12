import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

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
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : <p><em>Loaded...</em></p>;

            ////    <SearchField
            //        placeholder='Имя'
            //        onEnter={this.search}
            //        onSearchClick={this.search}
            //        onBlur={this.search}
            //    />
            //    <CreateEquipment ref={this.modal} onHide={this.search} />
            //    <Button variant="outline-primary" onClick={() => this.openModal()}>Добавить</Button>
        return (
            <div>
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
