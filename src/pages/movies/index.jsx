import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import * as FontAwesome from 'react-icons/lib/fa';

import css from './movies.pcss';
import {Container, Row, Col} from '@Common/components/grid';
import {getList, getSearch} from '../../application/store/actions';
import Search from './search';
import logo from '@Common/assets/img/logo.png';
import Spinner from '@Common/components/spinner';
import Showing from './showing';

class Movies extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: 'movies',
            listMovies: [],
            isSearching: false,
            showing: 'Popular movies',
            searchText: props.location.search.replace('?search=', '')
        };
        this.handleVideoList = this.videoList.bind(this);
    }

    componentDidMount() {
        this.callList();
    }

    callList = (fromShowPopularMovies) => {
        if(fromShowPopularMovies || !this.state.searchText){
            this.props.history.push('');
            getList()
                .then((res) => {
                    this.setState({
                        listMovies: res.data.results,
                        showing: 'Popular movies',
                        term: '',
                        searchText: ''
                    });
                });
        } else {
            return new Promise(resolve => {
                if (this.state.searchText.trim()) {
                    this.setState({isSearching: false});
                    getSearch(this.state.searchText)
                        .then(res => {
                            this.setState({
                                listMovies: res.data.results,
                                isSearching: true,
                                showing: `Search results for "${this.state.searchText}"`
                            });
                            resolve(res);
                        })
                }
            })
        }

    };

    videoList(movie) {
        if (this.state.listMovies.length > 0) {
            return (
                <Col small={12} medium={4} large={3} key={movie.id}>
                    <Link to={this.state.searchText ? `/movie/${movie.id}?search=${this.state.searchText}` : `/movie/${movie.id}`}>
                        <div className={css.movie}>
                            <div className={css.posterContainer}>
                                <img className={css.poster}
                                     src={movie['poster_path'] ? `https://image.tmdb.org/t/p/w300${movie['poster_path']}` : logo}
                                     alt=""/>
                            </div>
                            <div className={css.description}>
                                <h3>{movie['title']}</h3>
                                <p>Vote Average: <span>{movie['vote_average']}</span></p>
                                <p>Vote Count: <span>{movie['vote_count']}</span></p>
                            </div>
                        </div>

                    </Link>
                </Col>
            )
        }
    }

    movieSearch = (term) => {
        this.setState({term, searchText: term});
        return new Promise(resolve => {
            if (term.trim()) {
                this.props.history.push(`?search=${term}`);
                this.setState({isSearching: false});
                getSearch(term)
                    .then(res => {
                        this.setState({
                            listMovies: res.data.results,
                            isSearching: true,
                            showing: `Search results for "${term}"`
                        });
                        resolve(res);
                    })
            }
        })
    };

    render() {
        if (this.state.listMovies.length === 0) {
            if (!this.state.isSearching) {
                return <Spinner/>;
            } else {
                return (
                    <div className={css.root}>
                        <Search onSearch={this.movieSearch}/>
                        <Showing text={this.state.showing} onClickShowing={this.callList.bind(this, true)} />
                        <Container>
                            <Row>
                                <Col small={12}>
                                    <div className={css.noResults}>
                                        <p>
                                            <span className={css.icon}><FontAwesome.FaTimesCircleO/></span>
                                            <span>0 results</span>
                                        </p>
                                    </div>
                                </Col>
                            </Row>
                        </Container>
                    </div>
                );
            }
        }

        return (
            <div className={css.root}>
                <Search onSearch={this.movieSearch}/>
                <Showing text={this.state.showing} onClickShowing={this.callList.bind(this, true)}/>
                <Container>
                    <Row>{this.state.listMovies.map(this.handleVideoList)}</Row>
                </Container>
            </div>
        );
    }
}

export default Movies;
