import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Label, Input, FormGroup } from 'reactstrap';

export class ArticleSearchModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            item: { title: "", author: "", tag: "" },
            visible: false,
        }

        this.handleClick = (e) => this.submit();
        this.handleTitle = (e) => this.setTitle(e.target.value);
        this.handleAuthor = (e) => this.setAuthor(e.target.value);
        this.handleTag = (e) => this.setTag(e.target.value);
    }

    setTitle(value) {
        this.state.item.title = value;
        this.setState(this.state);
    }

    setAuthor(value) {
        this.state.item.author = value;
        this.setState(this.state);
    }

    setTag(value) {
        this.state.item.tag = value;
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
        this.props.onSubmit(this);
    }

    render() {
        return (
<Modal isOpen={this.state.visible} >
    <ModalHeader>Настройка фильтра</ModalHeader>
    <ModalBody>
        <FormGroup>
                        <Label>Название статьи</Label>
                        <Input name="title" value={this.state.item.title} onChange={this.handleTitle} />
        </FormGroup>
        <FormGroup>
                        <Label>Автор</Label>
                        <Input name="author" value={this.state.item.author} onChange={this.handleAuthor} />
        </FormGroup>
        <FormGroup>
            <Label>Тег</Label>
                        <Input name="tag" value={this.state.item.tag} onChange={this.handleTag} />
        </FormGroup>
    </ModalBody>
                <ModalFooter>
                    <Button variant="primary" onClick={this.handleClick}>Искать</Button>
    </ModalFooter>
</Modal>
        );
    }
}