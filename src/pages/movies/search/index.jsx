import React, {Component} from 'react';

import css from './search.pcss';
import {Container, Row, Col} from '@Common/components/grid';
import Button from './components/button';

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            term: '',
            searchResult: [],
            searchStatus: false
        };
    }

    onInputChange = (e) => {
        this.setState({term: e.target.value});

    };

    search = () => {
        this.state.term.trim() && this.setState({searchStatus: true});
        this.props.onSearch(this.state.term)
            .then(res => {
                this.setState({searchStatus: false, term: ''});
            })
    };

    render() {
        return (
            <div className={css.root}>
                <Container>
                    <Row>
                        <Col small={12}>
                            <div className={css.input}>
                                <div className={css.inputContainer}>
                                    <input
                                        type="text"
                                        placeholder="Search a movie"
                                        value={this.state.term}
                                        onChange={this.onInputChange}
                                    />
                                </div>
                                <Button
                                    text="Search"
                                    onClick={this.search}
                                    loading={this.state.searchStatus}
                                />
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

export default Search;
