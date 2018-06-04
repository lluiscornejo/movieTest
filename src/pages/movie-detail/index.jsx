import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import { browserHistory } from 'react-router';
import * as FontAwesome from 'react-icons/lib/fa';

import css from './movie-detail.pcss';
import {Container, Row, Col} from '@Common/components/grid';
import {getMovie} from '../../application/store/actions';
import logo from '@Common/assets/img/logo.png';
import Spinner from '@Common/components/spinner';
import Tag from './components/tag';

class MovieDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            movie: null,
            id: props.match.params.id,
            searchText: props.location.search.replace('?search=', '')
        };
    }

    componentDidMount() {
        getMovie(this.state.id)
            .then((res) => {
                this.setState({
                    movie: res.data,
                });
            });
    }

    render() {
        if (!this.state.movie) {
            return (
                <Spinner/>
            )
        }
        return (
            <div className={css.root}>
                <section className={css.postHeader}>
                    <Container>
                        <Row>
                            <Col small={12}>
                                <Link to={this.state.searchText ? '/?search=' + this.state.searchText : '/'}>
                                    <span className={css.icon}><FontAwesome.FaAngleLeft/></span>
                                    <span>Back</span>
                                </Link>
                            </Col>
                        </Row>
                    </Container>
                </section>
                <Container>
                    <Row>
                        <Col small={12} medium={4}>
                            <img className={css.poster} src={this.state.movie['poster_path'] ? `https://image.tmdb.org/t/p/w300${this.state.movie['poster_path']}` : logo} alt=""/>
                        </Col>
                        <Col small={12} medium={8}>
                            <div className={css.description}>
                                <h1>
                                    <a href={this.state.movie['homepage']} title={`Go to: ${this.state.movie['title']}`} target="_blank">
                                        <span>{this.state.movie.title}</span>
                                        <span className={css.linkIcon}><FontAwesome.FaExternalLink/></span>
                                    </a>
                                </h1>
                                <p><em>Release date: <span>{this.state.movie['release_date']}</span></em></p>
                                <hr/>
                                <Row>
                                    <Col small={12} medium={4}>
                                        <p>Vote Average: <span>{this.state.movie['vote_average']}</span></p>
                                    </Col>
                                    <Col small={12} medium={4}>
                                        <p>Vote Count: <span>{this.state.movie['vote_count']}</span></p>
                                    </Col>
                                </Row>
                                <hr/>
                                <ul>
                                    {this.state.movie['genres'].map(Tag)}
                                </ul>
                                <h3>Overview</h3>
                                <p>{this.state.movie['overview']}</p>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

export default MovieDetail;