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

export const Add = () => {

    //const [newType, setNewType] = useState<string>('')
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
          <select ref = {newType}>
            { options }           
          </select>
        );
    };   

    const createNeArticle = () => {    
        if (newType.current && newContent.current && newCost.current) {
            const _type = newType.current.value;
            const _id = Math.round(Math.random()*100000);        
            const _content = validateTextInput(newContent.current.value, 'your text',5);
            const _cost = validateNumberInput(Number(newCost.current.value), 100000);
            const _date = new Date();
            if (_type && _content && _cost && _date) {
                dispatch(addArticle({id: _id, type: _type, content: _content, cost: _cost, date: _date}));
                newCost.current.value = '';
                newContent.current.value = '';
                newType.current.value = '';
            }; 
        };
    };


    return(
        <div className="addForm">            
            <div className="addItem">
                <label htmlFor="expenseType">Type:</label>
                {typeSelect()}
                
            </div>
            <div className="addItem">
                <label htmlFor="articleName">Price:</label>
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
    );
};