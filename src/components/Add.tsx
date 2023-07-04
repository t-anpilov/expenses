import React, { ReactElement, useRef, useState } from 'react';
import { validateTextInput, validateNumberInput } from '../models/validate';
import { addArticle } from '../store/features/articleSlice';
import { useAppDispatch } from '../store/store';

export enum expenseTypes {
    Food = 'food',
    Clothes = 'clothes',
    Home = 'home',
    Deposit = 'deposit',
    Relax = 'relax'
}

interface AddProps {
    isOpen: boolean;
    onClose: () => void;
  }

export const Add: React.FC<AddProps> = ({isOpen, onClose}) => {

    if (!isOpen) return null;

    const newType = useRef<HTMLSelectElement>(null);
    const newContent = useRef<HTMLInputElement>(null);
    const newCost = useRef<HTMLInputElement>(null);

    const dispatch = useAppDispatch();

        
    const typeSelect = () => {

        const selectOption = (item: string):ReactElement=> {
            return (
                <option key={item} value={item}>{item}</option> 
            )
        };

        const options: Array<ReactElement> = [<option key="0"></option>];
        for (const value of Object.values(expenseTypes)) {
            options.push(selectOption(value))        
        };

        return (
          <select id="expenseType" ref = {newType}>
            { options }           
          </select>
        );
    };   

    const createNeArticle = () => {  

        if (newType.current && newContent.current && newCost.current) { 

            const _id = Math.round(Math.random()*100000);
            const _date = new Date();
            let _type, _content, _cost
            _type = validateTextInput(newType.current.value, 'type', 1);       
            if (_type) _content = validateTextInput(newContent.current.value, 'description', 5);
            if (_type && _content) _cost = validateNumberInput(Number(newCost.current.value), 100000);
            
            if (_type && _content && _cost && _date) {
                dispatch(addArticle({id: _id, type: _type, content: _content, cost: _cost, date: _date}));
                newCost.current.value = '';
                newContent.current.value = '';
                newType.current.value = '';
            }; 
            
        };
    };


    return(
    <div className={`addSection ${isOpen ? 'open' : ''}`}> 
        <header>Add your expense here</header> 
        <div className="addForm">          
            <div className="addItem">
                <label htmlFor="expenseType">Type:</label>
                {typeSelect()}
                
            </div>
            <div className="addItem">
                <label htmlFor="expensePrice">Price:</label>
                <input 
                    id="expensePrice"
                    type="number" 
                    ref = {newCost}
                    
                />  
            </div>
            <div className="addItem">
                <label htmlFor="expenseDetails">Comments:</label>
                <input
                    id="expenseDetails"
                    type="text"
                    ref = {newContent}
                />    
            </div>
                          
            <button 
                className="addItem addButton"
                onClick={createNeArticle}            
            >
                Add New
            </button>            
        </div>
        <button className="closeButton" onClick={onClose}>Close</button>
    </div>    
    );
};