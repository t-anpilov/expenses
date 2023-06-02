import React, { useEffect } from 'react';
import { Article, removeArticle } from '../store/features/articleSlice';
import { useAppDispatch } from '../store/store';


export const SingleArticle = (props: Article) => {
    
    useEffect(() => console.log(props.id), [])

    const dispatch = useAppDispatch();

    const removeHandler = (id: number)=> {
        dispatch(removeArticle({id: id}))
    }

    return(    
        <article>
            <header>{props.title}</header>
            <p>{props.content}</p>
            <button 
                onClick={()=>removeHandler(props.id)}>
                Remove it
            </button>
        </article>
    );
};
