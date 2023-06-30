import React from 'react';
import './Nav.css';

export const Nav = () => {
       
    const menuItem = (key: string, name: string, source?: string) => { 
        return (
            <li key={key}><a href={source}>{name}</a></li>
        )
    };

    const menuItems = [
        {name: 'Main', source:''}, 
        {name: 'Statistics', source:''}, 
        {name: 'Statistics 1', source:''}, 
        {name: 'Analyze', source:''}
    ]

    return (
        <div className="navbar">
        <ul> {

            menuItems.map((item)=> {
                const newKey = Math.round(Math.random()*100000).toString();
                return  menuItem(newKey, item.name, item.source)
            })

            } 
        </ul>
        </div>
    )
};