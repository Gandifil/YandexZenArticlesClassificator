import React, { Component, createRef } from 'react';
import { Link } from "react-router-dom";
import { Button } from 'reactstrap';
import { Confirm } from 'react-confirm-bootstrap';
import { DeleteTagModal } from '../forms/DeleteTagModal';

export class TagViewItem extends Component {
    constructor(props) {
        super(props);
        this.state = { visible:true  };
        this.modal = React.createRef()

        this.handleClick = (e) => this.click();
        this.handleResult = (e) => this.confirm(e);
    }

    confirm(value) {
        if (value) {
            const url = 'api/article/'+this.props.id+'/tag/' + this.props.tag.id;
            fetch(url, {
                method: 'DELETE'
            });
            this.setState({ visible: false })
        }
    }

    click() {
        console.log('Попытка удалить тег', this.props.canDelete);
        if (this.props.canDelete)
            this.modal.current.show();
    }

    render() {
        const tag = this.props.tag;
        return this.state.visible ? (<Button outline color="danger" className='m-1' onClick={this.handleClick}>
            {tag.name}<DeleteTagModal ref={this.modal} onClick={this.handleResult}></DeleteTagModal>
            </Button>) : null;
    }
}
//<td><Button color="danger">Удалить</Button></td>