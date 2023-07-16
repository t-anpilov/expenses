import React, { ReactElement, useRef, useState } from 'react';
import { validateTypeInput, validateTextInput, validateNumberInput } from '../models/validate';
import { addArticle, expenseTypes } from '../store/features/articleSlice';
import { useAppDispatch } from '../store/store';

interface AddProps {
    isOpen: boolean;
    mode: string;
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

    const createNewArticle = () => {  

        if (newType.current && newContent.current && newCost.current) { 

            const _id = Math.round(Math.random()*100000);
            const _date = new Date();
            let _type, _content, _cost
            _type = validateTypeInput(newType.current.value, 'type');       
            if (_type) _content = validateTextInput(newContent.current.value, 'description', 3);
            if (_type && _content) _cost = validateNumberInput(Number(newCost.current.value), 100000);
            
            if (_type && _content && _cost && _date) {
                dispatch(addArticle({id: _id, type: _type, content: _content, cost: _cost, date: _date}));
                onClose();
            }; 
            
        };
    };


    return(
    <div className={`addWindow ${isOpen ? 'open' : ''}`}> 
        <header>Add your expense here:</header> 
        <div className="flexContainer">          
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
                       
        </div>
        <div className ="flexContainer addActions">
            <button 
                className="btn"
                onClick={createNewArticle}            
            >
                Add New
            </button> 
            <button className="btn" onClick={onClose}>Close</button>
        </div>        
    </div>    
    );
};