import React, { useEffect } from 'react';
import { Article, removeArticle } from '../store/features/articleSlice';
import { useAppDispatch } from '../store/store';

interface shownExpense extends Article {
    isHidden : boolean
}


export const SingleArticle = (props: shownExpense) => {
    
    useEffect(() => console.log(props.id), [])

    const dispatch = useAppDispatch();

    const removeHandler = (id: number)=> {
        dispatch(removeArticle({id: id}))
    }
    
    const showDate = props.date!.toLocaleDateString()  

    return(    
        <tr>
            <td>{props.type}</td>
            <td>{props.content}</td>
            <td>{props.cost}</td>
            <td>{showDate}</td>
            <td>
                <button 
                    className={`${props.isHidden ? 'hiddenButton' : ''}`} 
                    onClick={()=>removeHandler(props.id)}>
                    Remove
                </button>
            </td>
        </tr>
    );
};
