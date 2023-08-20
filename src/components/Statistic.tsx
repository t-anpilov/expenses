import React from 'react';
import { Expense } from '../store/features/expensesSlice';
import { expenseTypes } from '../store/features/expensesSlice';
import { Diagram } from './Diagram';

interface statisticsProps {
    expenses: Expense[]
};

export type segmentStats = {name: string, sum: number, colorScheme: string, percent: number};

export const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

export const Statistics = (props: statisticsProps) => {

    const expenses = props.expenses;

    const typeValues = Object.keys(expenseTypes).map(key => expenseTypes[key as keyof typeof expenseTypes]);    
    
    const segmentsStats: segmentStats[] = [];
   
    const expensesTotal =  expenses.reduce((total, item) => {
        return total + item.cost;
    }, 0); 

    const colors = ['#e74c3c', '#2ecc71', '#f39c12', '#9b59b6', '#3498db'];

    const getSegmentStats  = (type: expenseTypes, items: Expense[], color: string) : segmentStats => {
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
            colorScheme: color,
            percent: percentCalculated
        };
    };
    
    let colorOrder = 0;
    for (const type of typeValues) {        
        segmentsStats.push(getSegmentStats(type, expenses, colors[colorOrder]))
        colorOrder++
    };    

    const expenseByType = (stats: segmentStats) => {  
         
        const barLength = stats.percent*5
        
        return (
            <div key={stats.name} className="statisticLine">
                <div>
                    <span>{capitalize(stats.name)} </span>
                    
                    <span>({stats.percent}%) </span>
                </div>
                <svg width={barLength} height="16">
                    <rect width={barLength} height="16" fill={stats.colorScheme} />
                </svg>
            </div>
        )
    };

    const distributionByType = () => {
        let childNodes = [];
        if (segmentsStats.length) {
            for (let i=0; i<segmentsStats.length; i++) {
                childNodes.push(expenseByType(segmentsStats[i]))
            };
            return childNodes; 
        } else {
            return null
        }        
    };

    return (
        expenses.length ? 
        <div className='statsContainer'>
            <section>
                <h3>Total sum</h3>
                <div> {expensesTotal}  </div>
            </section> 
            <section>
                <h3>Distribution per expense type</h3>
                <div  className='bars'> 
                    { distributionByType() }
                </div>
            </section>
           
            <Diagram segments={segmentsStats} />
        </div> : null
    )
};