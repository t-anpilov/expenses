import React from 'react';
import { useAppSelector } from '../store/store';
import { SingleArticle } from './SingleArticle';
import { Statistics } from './Statistic';


export const List = () => {

    const articles = useAppSelector(state => state.article.articles)

    const emptyListMessage = () => {
        return (
            <tr>
                <td colSpan={5}>No records yet</td>
            </tr>
        )
    }

    return (
    <div>
    <h3>List of expenses:</h3>
    <table className="expenseShown">
        <thead>
        <tr>
            <th>Type</th>
            <th>Notes</th>
            <th>Price</th>
            <th>Date</th>
            <th></th>
        </tr>
        </thead>
        <tbody>
        {!articles.length ? emptyListMessage() : articles.map(article => {
            return (
                <SingleArticle 
                    key = {article.id}
                    id = {article.id}
                    type = {article.type}
                    content = {article.content}
                    cost = {article.cost}
                    date = {article.date}
                />
            )
        })}
        </tbody>
        
    </table>
    <Statistics/>
    </div>
    );
};