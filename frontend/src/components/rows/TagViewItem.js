import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Button } from 'reactstrap';

export class TagViewItem extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const tag = this.props.tag;
        return (<div><Button outline color="danger">{tag.name}</Button>{' '}</div>);
    }
}
//<td><Button color="danger">Удалить</Button></td>