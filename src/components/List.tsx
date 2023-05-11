import React from 'react';
import { useAppSelector } from '../store/store';


export const List = () => {
    const articles = useAppSelector(state => state.article.articles)

    return (
    <div>
        <p>List of articles:</p>
        {articles.map(article => {
            return (
                <article key={article.id}>
                    <header>{article.title}</header>
                    <p>{article.content}</p>
                </article>
            )
        })}
    </div>
    );
};