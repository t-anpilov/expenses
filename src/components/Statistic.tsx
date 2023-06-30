import React from 'react';
import { useAppSelector } from '../store/store';

export const Statistics = () => {

    const articles = useAppSelector(state => state.article.articles);

    const expensesTotal = () => {         
        let sum: number = 0;
        if (articles) {
            sum = articles.reduce((total, item) => {
                return total + item.cost;
            }, 0);
        }
        return sum;
    };

    return (
        <div> {expensesTotal() } </div>
    )
};