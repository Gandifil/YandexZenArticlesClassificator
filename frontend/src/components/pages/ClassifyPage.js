import React, { Component } from 'react';
import { Spinner, SpinnerProps, Form, FormGroup, Label, Input, Button, InputGroup } from 'reactstrap';

export class ClassifyPage extends Component {
    constructor(props) {
        super(props);

        this.state = { text: "", class: "" };
        this.handleText = (e) => this.changeText(e.target.value);
        this.handleClick = (e) => this.populateData()
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
                    <Button color="primary" size="lg" onClick={ this.handleClick }>Классифицировать</Button>
                    <Input size="lg" value={ this.state.class } />
                </InputGroup>
            </div>
            
        );
    }

    setClass(value) {
        const s = value.substring(1, value.length - 3)
        this.setState({ text: this.state.text, class: s })
    }

    async populateData() {
        if (this.state.text)
            fetch('api/getclass?text=' + this.state.text)
                .then(response => response.text())
                .then(result => this.setClass(result))
                .catch(e => {
                    console.log(e);

                    this.setState({ text: "", class: "", error: e });
               });
    }
}
