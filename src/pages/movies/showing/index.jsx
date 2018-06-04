import React, {Component} from 'react';

import css from './showing.pcss';
import {Container, Row, Col} from '@Common/components/grid';
import * as FontAwesome from 'react-icons/lib/fa';

const Showing = (props) => {
    return (
        <div className={css.guide}>
            <Container>
                <Row>
                    <Col small={12}>
                        <h4>
                            <span className={css.icon}><FontAwesome.FaStar/></span>
                            <span onClick={props.onClickShowing}>Show popular movies</span>
                        </h4>
                        <p>
                            <span className={css.icon}><FontAwesome.FaFilter/></span>
                            <span>{props.text}</span>
                        </p>
                    </Col>
                </Row>
            </Container>
        </div>
    )
};

export default Showing;
