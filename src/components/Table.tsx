import React, { useState } from 'react';
import { Article } from '../store/features/articleSlice';
import { SingleArticle } from './SingleArticle';

interface tableProps {
    expenses: Article[];
    visible: boolean
};

export const Table = (props: tableProps) => {

    const expenses = props.expenses;

    const emptyListMessage = () => {
        return <tr><td colSpan={5}>No records yet</td> </tr>   
    };

    return(
    
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
        {!expenses.length ? emptyListMessage() : expenses.map(expense => {
            return (
                <SingleArticle 
                    key = {expense.id}
                    id = {expense.id}
                    type = {expense.type}
                    content = {expense.content}
                    cost = {expense.cost}
                    date = {expense.date}
                    isHidden = {props.visible}
                />
            )
        })}
        </tbody>
        
    </table>
    
        );
};
