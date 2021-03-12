import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Button } from 'reactstrap';

export class TagViewItem extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const tag = this.props.tag;
        return (<Button outline color="danger" className='m-1'>{tag.name}</Button>);
    }
}
//<td><Button color="danger">Удалить</Button></td>