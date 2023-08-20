import React, { ReactElement, useEffect, useRef } from 'react';
import { validateTypeInput, validateTextInput, validateNumberInput } from '../models/validate';
import { addExpense, removeExpense, Expense, expenseTypes, updateExpense } from '../store/features/expensesSlice';
import { useAppDispatch } from '../store/store';

interface AddProps {
    isOpen: boolean;
    mode: string;
    onClose: () => void;
    expenseForEdit?: Expense;
  }

export const Add: React.FC<AddProps> = ({isOpen, mode, onClose, expenseForEdit}) => {

    if (!isOpen) return null; 
      
    const newType = useRef<HTMLSelectElement>(null);
    const newContent = useRef<HTMLInputElement>(null);
    const newCost = useRef<HTMLInputElement>(null);   
    
    useEffect(()=> {
        if (expenseForEdit && newType.current && newContent.current && newCost.current) {
            newType.current.value = expenseForEdit.type;
            newContent.current.value = expenseForEdit.content;
            newCost.current.value = expenseForEdit.cost.toString();
        }
    }, []);
    
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

    const createNewExpense = () => {  

        if (newType.current && newContent.current && newCost.current) { 

            const _id = Math.round(Math.random()*100000);
            const _date = new Date();
            let _type, _content, _cost
            _type = validateTypeInput(newType.current.value, 'type');       
            if (_type) _content = validateTextInput(newContent.current.value, 'description', 3);
            if (_type && _content) _cost = validateNumberInput(Number(newCost.current.value), 100000);
            
            if (_type && _content && _cost && _date) {
                dispatch(addExpense({id: _id, type: _type, content: _content, cost: _cost, date: _date}));
                onClose();
            }; 
            
        };
    };

    
    const editExpense = () => {
        if(expenseForEdit && newType.current && newContent.current && newCost.current) {
            const _expense: Expense = {
                id: expenseForEdit.id,
                type: newType.current.value,
                content: newContent.current.value,
                cost: +newCost.current.value,
                date: expenseForEdit.date
            };            
            dispatch(updateExpense(_expense));
            onClose();
        } else {
            console.log('Item ID for editing is missing');
            onClose();
        } 
    }

    const removeExpenseHandler = () => {
        if (expenseForEdit) {
            dispatch(removeExpense({id: expenseForEdit.id}));
            onClose();
        } else {
            console.log('something went wrong, can find this item');
            onClose();
        } 
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
            {mode=='add' && 
            <button 
                className="btn tableBtn editBtn"
                onClick={createNewExpense}            
            >
                Add New
            </button> 
            }
            {mode=='edit' && 
            <button 
                className="btn tableBtn editBtn"
                onClick={editExpense}          
            >
                Save
            </button>             
            }
            {mode=='edit' && 
            <button 
                className="btn tableBtn deleteBtn"
                onClick={removeExpenseHandler}          
            >
                Delete
            </button>             
            }
            <button className="btn" onClick={onClose}>Close</button>
        </div>       
    </div>    
    );
};