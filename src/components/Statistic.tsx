import React from 'react';
import { Article } from '../store/features/articleSlice';
import { expenseTypes } from '../store/features/articleSlice';

interface statisticsProps {
    expenses: Article[]
}

export const Statistics = (props: statisticsProps) => {

    const expenses = props.expenses;

    const typeValues = Object.keys(expenseTypes).map(key => expenseTypes[key as keyof typeof expenseTypes]);
   
    const expensesTotal = () => {         
        let sum: number = 0;
        if (expenses) {
            sum = expenses.reduce((total, item) => {
                return total + item.cost;
            }, 0);
        }
        return sum;
    };    

    const expenseByType = (type: expenseTypes) => {
        let sum: number = 0;
        if (expenses) {
            sum =expenses.reduce((total, item) => {
                if (type === item.type) {
                    return total + item.cost;
                } else {
                    return total
                }                
            }, 0);
        }
        return (
            <div key={type}>
                <span>Total for {type}: </span>
                <span> {sum} </span>
            </div>
        )
    };

    const distributeByType = () => {
        let childNodes = [];
        for (const type of typeValues) {
            childNodes.push(expenseByType(type))
        };
        return childNodes;
    };

    return (
        <div>
            <section>
                <h3>Total sum</h3>
                <div> {expensesTotal()}  </div>
            </section> 
            <section>
                <h3>Distribution per expense type</h3>
                <div> 
                    { distributeByType() }
                </div>
            </section>
        </div>
    )
};