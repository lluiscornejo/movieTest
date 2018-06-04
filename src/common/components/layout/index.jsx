import React, {Fragment} from 'react';

import Header from './header';
import Footer from './footer';
import css from './layout.pcss';

const Layout = ({ children }) => (
    <Fragment>
        <Header/>
        <main className={css.root}>
            {children}
        </main>
        <Footer/>
    </Fragment>
);

export default Layout;
