import React from 'react';
import * as FontAwesome from 'react-icons/lib/fa';
import css from './button.pcss';

const Button = ({text, onClick, loading}) => (
    <div className={css.root}>
        <button onClick={onClick}>
            <span>{text}</span>
        </button>
        {loading && <div className={css.spinner}><span><FontAwesome.FaSpinner/></span></div>}
    </div>
);

export default Button;