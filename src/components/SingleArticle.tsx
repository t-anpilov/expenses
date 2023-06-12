import React, { useEffect } from 'react';
import { Article, removeArticle } from '../store/features/articleSlice';
import { useAppDispatch } from '../store/store';


export const SingleArticle = (props: Article) => {
    
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
                    onClick={()=>removeHandler(props.id)}>
                    Remove it
                </button>
            </td>
        </tr>
    );
};
