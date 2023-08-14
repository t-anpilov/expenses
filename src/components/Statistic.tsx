import React from 'react';
import { Article } from '../store/features/articleSlice';
import { expenseTypes } from '../store/features/articleSlice';
import { Diagram } from './Diagram';

interface statisticsProps {
    expenses: Article[]
};

export type segmentStats = {name: string, sum: number, colorScheme: string, percent: number};

export const Statistics = (props: statisticsProps) => {

    const expenses = props.expenses;

    const typeValues = Object.keys(expenseTypes).map(key => expenseTypes[key as keyof typeof expenseTypes]);    
    
    const segmentsStats: segmentStats[] = [];
   
    const expensesTotal =  expenses.reduce((total, item) => {
        return total + item.cost;
    }, 0);    

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
            colorScheme: `${type}-color`,
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
            return childNodes; 
        } else {
            return null
        }        
    };

    /*const createSegment = (item: segmentStats) => {

        const angle = (item.percent / 100) * 360;
        const largeArcFlag = angle <= 180 ? 0 : 1;

  const x1 = 50 + 50 * Math.cos((-90 * Math.PI) / 180);
  const y1 = 50 + 50 * Math.sin((-90 * Math.PI) / 180);

  const x2 = 50 + 50 * Math.cos((angle - 90) * (Math.PI / 180));
  const y2 = 50 + 50 * Math.sin((angle - 90) * (Math.PI / 180));

  const pathData = `M ${x1} ${y1} A 50 50 0 ${largeArcFlag} 1 ${x2} ${y2} L 50 50 Z`;

       
        return (
            <div key={item.name} className="segment">
                <svg viewBox="0 0 100 100">
                    <path d={pathData} />
                 </svg>
                <span className="label">{item.name}</span>
            </div>
    )};

    const diagram = () => {
        return (
            <div className="circle-diagram">
                {
                   segmentsStats.map(statsItem => createSegment(statsItem)) 
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
           
            <Diagram segments={segmentsStats} />
        </div> : null
    )
};