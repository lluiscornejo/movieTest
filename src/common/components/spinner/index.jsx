import React from 'react';
import styles from './spinner.pcss';

const Spinner = () => {

    return (
        <div className={styles.root}>
            <div className={styles.ldsRing}>
                <div/>
                <div/>
                <div/>
                <div/>
            </div>
        </div>
    )
};

export default Spinner;
