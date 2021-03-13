import React, { Component } from 'react';
import { Spinner, SpinnerProps, Form, FormGroup, Label, Input, Button, InputGroup } from 'reactstrap';

export class ClassifyPage extends Component {
    constructor(props) {
        super(props);

        this.state = { text: "", class: "" };
        this.handleText = (e) => this.changeText(e.target.value);
    }

    changeText(value) {
        this.state.text = value;
        this.setState(this.state);
    }

    render() {
        return (
            <div>
                <textarea value={this.state.text} onChange={this.handleText} rows="20" cols="130" />

                <InputGroup>
                    <Button color="primary" size="lg">Классифицировать</Button>
                    <Input size="lg" value={this.state.class} />
                </InputGroup>
            </div>
            
        );//value={article.text} onChange={this.handleText}
    }

    async populateData() {
        this.setState({ tags: null, loading: true });
        const url = 'api/tags/stat';
        fetch(url)
            .then(response => response.json())
            .then(result => this.setState({ tags: result, loading: false }))
            .catch(e => {
                console.log(e);

                this.setState({ tags: null, loading: false, error: e });
           });
    }
}
