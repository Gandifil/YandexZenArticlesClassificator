import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
    Nav, Navbar,
    NavbarBrand,
    NavbarText, NavItem,
    NavLink
} from 'reactstrap';

export class NavMenu extends Component {
    constructor(props) {
        super(props);

        this.toggleNavbar = this.toggleNavbar.bind(this);
        this.state = {
            collapsed: true
        };
    }

    toggleNavbar() {
        this.setState({
            collapsed: !this.state.collapsed
        });
    }

    render() {
        return (
            <header>
                <Navbar color="dark" light expand="md">
                            <NavbarBrand tag={Link} className="text-light" to="/">Yandex Zen Классификатор статей</NavbarBrand>
                    <Nav className="me-auto" navbar>
                    <NavItem >
                                    <NavLink tag={Link} className="text-light" to="/articles">Статьи</NavLink>
                    </NavItem>
                    <NavItem>
                                    <NavLink tag={Link} className="text-light" to="/tags">Тэги</NavLink>
                    </NavItem>
                    <NavItem>
                                    <NavLink tag={Link} className="text-light" to="/classing/">Классификация</NavLink>
                    </NavItem>
                    </Nav>
                    <NavbarText>0.0.1</NavbarText>
                </Navbar>
            </header>
        );
    }
}
