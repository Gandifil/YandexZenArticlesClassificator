import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Label, Input, FormGroup } from 'reactstrap';

export class AddTagModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
             title: "",
            visible: false,
        }

        this.handleTitle = (e) => this.setTitle(e.target.value);
        this.handleNo = (e) => this.hide();
        this.handleYes = (e) => submit();
    }

    setTitle(value) {
        this.state.title = value;
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
        this.hide();
        console.log("Установлен фильтр", this.state.item);
    }

    render() {
        return (
<Modal isOpen={this.state.visible} >
    <ModalHeader>Добавить тег</ModalHeader>
    <ModalBody>
        <FormGroup>
                        <Label>Текст</Label>
                        <Input name="title" value={this.state.title} onChange={this.handleTitle} />
        </FormGroup>
    </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={this.handleNo}>Отмена</Button>
                    <Button color="primary" onClick={this.handleYes}>Добавить</Button>
    </ModalFooter>
</Modal>
        );
    }
}