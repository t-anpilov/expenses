import React from 'react';
import { Article } from '../store/features/articleSlice';
import { expenseTypes } from '../store/features/articleSlice';

interface statisticsProps {
    expenses: Article[]
}

export const Statistics = (props: statisticsProps) => {

    const expenses = props.expenses;

    const typeValues = Object.keys(expenseTypes).map(key => expenseTypes[key as keyof typeof expenseTypes]);
    
    type segmentStats = {name: string, sum: number, percent: number};
   
    const expensesTotal =  expenses.reduce((total, item) => {
        return total + item.cost;
    }, 0);    
    
    const segmentsStats: segmentStats[] = [];

    const getSegmentStats  = (type: expenseTypes, items: Article[]) : segmentStats => {
        let sum: number = 0;
        sum = items.reduce((total, item) => {
                if (type === item.type) {
                    return total + item.cost;
                } else {
                    return total
                }                
            }, 0);
        const percentCalculated = Math.round((sum/expensesTotal)*100);
        
        return {
            name: type, 
            sum: sum, 
            percent: percentCalculated
        };
    };

    for (const type of typeValues) {
        segmentsStats.push(getSegmentStats(type, expenses))
    };    

    const expenseByType = (stats: segmentStats) => {        
        return (
            <div key={stats.name}>
                <span>Total for {stats.name}: </span>
                <span> {stats.sum} </span>
                <span>({stats.percent}%) </span>
            </div>
        )
    };

    const distributionByType = () => {
        let childNodes = [];
        if (segmentsStats.length) {
            for (let i=0; i<segmentsStats.length; i++) {
                childNodes.push(expenseByType(segmentsStats[i]))
            };
            console.log(segmentsStats.length)
            return childNodes; 
        } else {
            return null
        }        
    };

    const segment = (item: segmentStats) => {
        return (
            <div className="segment" data-percent={item.percent}>
                <span className="label">{`${item.name}: ${item.percent}%`}</span>
            </div>
    )};

    /*const diagram = (expenses: Article[]) => {
        return (
            <div className="circle-diagram">
                {
                   expenses.map() 
                }
            </div>
        )
    }*/
    
    return (
        expenses.length ? 
        <div>
            <section>
                <h3>Total sum</h3>
                <div> {expensesTotal}  </div>
            </section> 
            <section>
                <h3>Distribution per expense type</h3>
                <div> 
                    { distributionByType() }
                </div>
            </section>
        </div> : null
    )
};