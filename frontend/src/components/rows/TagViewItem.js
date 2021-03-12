import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Button } from 'reactstrap';
import { Confirm } from 'react-confirm-bootstrap';

export class TagViewItem extends Component {
    constructor(props) {
        super(props);
        this.state = { confirmVisible: false };

        this.handleClick = (e) => this.click();
        this.handleCloseModal = (e) => this.setState({ confirmVisible: false });
        this.handleConfirm = (e) => this.confirm();
    }

    confirm() {
        const url = 'api/tag/' + this.props.tag.id;
        const response = fetch(url, {
            method: 'DELETE'
        });
    }

    click() {
        console.log('Попытка удалить тег', this.props.canDelete);
        if (this.props.canDelete) {
            this.setState({ confirmVisible: true });
        }
    }

    renderButton() {
        const tag = this.props.tag;
        return (<Button outline color="danger" className='m-1'>{tag.name}</Button>)
    }

    render() {
        const tag = this.props.tag;
        return this.props.canDelete
            ? <Confirm
                onConfirm={this.handleConfirm}
                onClose={this.handleCloseModal}
                body="Вы уверены, что хотите этого? Точно-точно?"
                confirmText="Подтвердить"
                visible={this.state.confirmVisible}
                cancelText="Назад"
                title={"Удаление " + tag.name + "из списка тегов "}>{this.renderButton()}</Confirm>
            : this.renderButton();
        ;
    }
}
//<td><Button color="danger">Удалить</Button></td>