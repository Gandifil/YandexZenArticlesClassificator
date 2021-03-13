import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Label, Input, FormGroup } from 'reactstrap';
import { ReactAutocomplete } from 'react-autocomplete'

export class AddTagModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            index: -1,
            tags: [],
            visible: false,
            loading: true,
        }

        this.handleIndex = (e) => this.setIndex(e.target.value);
        this.handleNo = (e) => this.hide();
        this.handleYes = (e) => this.submit();
    }

    componentDidMount() {
        this.state.loading = true;
        this.setState(this.state);
        const url = 'api/tags';
        fetch(url)
            .then(response => response.json())
            .then(result => this.setState({ tags: result, loading: false, visible: this.state.visible }))
            .catch(e => {
                console.log(e);
                this.setState({ tags: [], loading: false, visible: his.state.visible, loading: false, error: e });
            });
    }


    setIndex(value) {
        this.state.index = value;
        this.setState(this.state);
    }

    show() {
        this.state.visible = true;
        this.setState(this.state);
    }

    hide() {
        this.state.visible = false;
        this.setState(this.state);
    }

    submit() { 
        if (this.state.index == -1)
            return;
        console.log("Установлен тег с ID", this.state.index);
        const name = this.state.tags.find(x => x.id == this.state.index).name
        this.props.onAddTag({ id: this.state.index, name: name });
        const url = 'api/article/' + this.props.id + '/tag/' + this.state.index;
        fetch(url, {
            method: 'POST'
        });
        this.hide();
    }

    renderTag(tag) {
        return (<option value={tag.id} >{ tag.name }</option>)
    }

    render() {
        return (
<Modal isOpen={this.state.visible} >
    <ModalHeader>Добавить тег</ModalHeader>
                <ModalBody>
                    <Input type="select" bsSize="lg" onChange={this.handleIndex}>
            <option selected>Выберете тег</option>
                        {this.state.tags.map(x => this.renderTag(x))}
            
            </Input>
    </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={this.handleNo}>Отмена</Button>
                    <Button color="primary" onClick={this.handleYes}>Добавить</Button>
    </ModalFooter>
</Modal>
        );
    }
}