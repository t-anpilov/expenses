import React from 'react';
import { Expense, removeExpense } from '../store/features/expensesSlice';
import { useAppDispatch } from '../store/store';

interface shownExpense {
    expense: Expense;
    isHidden : boolean;
    edit: (expense: Expense) => void;    
}

export const SingleExpense: React.FC<shownExpense>  = ({expense, isHidden, edit}) => {
    
    const dispatch = useAppDispatch();

    const removeHandler = (id: number)=> {
        dispatch(removeExpense({id: id}))
    }

    const handleEditClick = () => {
        console.log(expense.id)        
        edit(expense);
    }
    
    const showDate = expense.date!.toLocaleDateString();
    
    return(    
        <tr>
            <td >{expense.type}</td>
            <td>{expense.content}</td>
            <td>{expense.cost}</td>
            <td>{showDate}</td>
            <td> 
                <div className='actionCell'>
                <button 
                    className={`${isHidden ? 'hiddenButton tableBtn' : 'tableBtn editBtn'}`} 
                    onClick={handleEditClick}
                    disabled = {isHidden ? true:false}>
                    EDIT
                </button>
                <button 
                    className={`${isHidden ? 'hiddenButton tableBtn' : 'tableBtn deleteBtn'}`} 
                    onClick={()=>removeHandler(expense.id)}
                    disabled = {isHidden ? true:false}>
                    DEL
                </button>
                </div>
            </td>            
        </tr>
    );
};
