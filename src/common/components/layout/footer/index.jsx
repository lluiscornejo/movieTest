import React, {Fragment} from 'react';

import {Container, Row, Col} from '@Common/components/grid';
import css from './footer.pcss';

const Footer = ({ children }) => (
    <Fragment>
        <header className={css.root}>
            <Container>
                <Row>
                    <Col medium={12}>
                        <p>2018</p>
                    </Col>
                </Row>
            </Container>
        </header>
    </Fragment>
);

export default Footer;