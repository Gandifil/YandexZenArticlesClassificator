import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Label, Input, FormGroup } from 'reactstrap';

export class DeleteTagModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            item: { title: "", author: "", tag: "" },
            visible: false,
        }

        this.handleYes = (e) => this.submit(true)
        this.handleNo = (e) => this.submit(false)
    }

    show() {
        this.state.visible = true;
        this.setState(this.state);
    }

    hide() {
        this.state.visible = false;
        this.setState(this.state);
    }

    submit(value) { 
        this.hide();
        console.log("Установлен фильтр", this.state.item);
        this.props.onClick(value);
    }

    render() {
        return (
<Modal isOpen={this.state.visible} >
    <ModalHeader>Подтверждение удаления тега</ModalHeader>
    <ModalBody>
        Вы попытались удалить тег со статьи. Подтвердите твердость своих намерений.
    </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={this.handleNo}>Отменить</Button>
                    <Button color="danger" onClick={this.handleYes}>Удалить</Button>
    </ModalFooter>
</Modal>
        );
    }
}