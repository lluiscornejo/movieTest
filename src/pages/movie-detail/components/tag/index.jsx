import React from 'react';
import css from './tag.pcss';

const Tag = (genre) => {
    return(
        <li key={genre.id} className={css.tag}>
            {genre.name}
        </li>
    )
};

export default Tag;