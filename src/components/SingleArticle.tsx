import React from 'react';
import { Article, removeArticle } from '../store/features/articleSlice';
import { useAppDispatch } from '../store/store';

interface shownExpense {
    expense: Article;
    isHidden : boolean;
    edit: (expense: Article) => void;    
}

export const SingleArticle: React.FC<shownExpense>  = ({expense, isHidden, edit}) => {
    
    const dispatch = useAppDispatch();

    const removeHandler = (id: number)=> {
        dispatch(removeArticle({id: id}))
    }

    const handleEditClick = () => {
        console.log(expense.id)        
        edit(expense);
    }
    
    const showDate = expense.date!.toLocaleDateString()  

    return(    
        <tr>
            <td>{expense.type}</td>
            <td>{expense.content}</td>
            <td>{expense.cost}</td>
            <td>{showDate}</td>
            <td>
                <button 
                    className={`${isHidden ? 'hiddenButton' : ''}`} 
                    onClick={()=>removeHandler(expense.id)}
                    disabled = {isHidden ? true:false}>
                    Remove
                </button>
                <button 
                    className={`${isHidden ? 'hiddenButton' : ''}`} 
                    onClick={handleEditClick}
                    disabled = {isHidden ? true:false}>
                    Edit
                </button>
            </td>            
        </tr>
    );
};
