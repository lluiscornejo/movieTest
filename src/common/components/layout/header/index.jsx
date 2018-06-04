import React, {Fragment} from 'react';
import {Link} from 'react-router-dom';

import {Container, Row, Col} from '@Common/components/grid';
import css from './header.pcss';
import logo from '@Common/assets/img/logo.png';

const Header = ({ children }) => (
    <Fragment>
        <header className={css.root}>
            <Container>
                <Row>
                    <Col medium={12}>
                        <Link to="/">
                            <h1>
                                <img src={logo} alt="Movie Test"/>
                                <span>Movie Test</span>
                            </h1>
                        </Link>
                    </Col>
                </Row>
            </Container>
        </header>
    </Fragment>
);

export default Header;