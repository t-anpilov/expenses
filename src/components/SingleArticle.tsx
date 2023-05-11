import React, { useEffect } from 'react';
import { Article } from '../store/features/articleSlice';


export const SingleArticle = (props: Article) => {
    
    useEffect(() => console.log(props.id), [])

    return(    
        <article>
            <header>{props.title}</header>
            <p>{props.content}</p>
        </article>
    );
};
