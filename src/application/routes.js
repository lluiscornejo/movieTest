import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Layout from '@Common/components/layout';

// Scenes
import Movies from '../pages/movies';
import MovieDetail from '../pages/movie-detail';
import NotFound from '@Common/components/404';

const Routes = () => (
    <BrowserRouter>
        <Layout>
            <Switch>
                <Route exact path="/" component={Movies}/>
                <Route exact path="/movie/:id" component={MovieDetail}/>
                <Route component={NotFound}/>
            </Switch>
        </Layout>
    </BrowserRouter>
);

export default Routes;
