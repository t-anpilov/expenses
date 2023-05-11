import React from 'react';
import { useAppSelector } from '../store/store';
import { SingleArticle } from './SingleArticle';


export const List = () => {
    const articles = useAppSelector(state => state.article.articles)

    return (
    <div>
        <p>List of articles:</p>
        {articles.map(article => {
            return (
                <SingleArticle 
                    key = {article.id}
                    id = {article.id}
                    title = {article.title}
                    content = {article.content}
                />
            )
        })}
    </div>
    );
};