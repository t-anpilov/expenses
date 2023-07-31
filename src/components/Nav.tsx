import React from 'react';
import './Nav.css';

interface NavProps {
    onClickHandler: (month: number | null) => void;
}

export const Nav: React.FC<NavProps> = ({onClickHandler}) => {
       
    const menuItem = (key: string, name: string, monthNumber: number | null) => { 
        return (
            <li key={key} onClick={()=>onClickHandler(monthNumber)}>
                <a>{name}</a>
            </li>
        )
    };

    const menuMonthItems = [
        {name: 'May', monthNumber:4}, 
        {name: 'June', monthNumber:5}, 
        {name: 'July', monthNumber:6}, 
        {name: 'August', monthNumber:7}
    ]

    const keyGen = ()=> Math.round(Math.random()*100000).toString();

    return (
        <div className="navbar">
        <ul> {

            menuMonthItems.map((item)=> {
                const newKey = keyGen()
                return  menuItem(newKey, item.name, item.monthNumber)
            })

            }
            <li
                key = {keyGen()}
                onClick={()=>onClickHandler(null)}
            >
                <a>ALL</a>
            </li> 
        </ul>
        </div>
    )
};