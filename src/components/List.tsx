import React, { useState } from 'react';
import { useAppSelector } from '../store/store';
import { Add } from './Add';
import { Statistics } from './Statistic';
import { SingleArticle } from './SingleArticle';
import { Article } from '../store/features/articleSlice';


export const List = () => {

    const articles = useAppSelector(state => state.article.articles);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [windowMode, setWindowMode] = useState<string>('');
    const [currentId, setCurrentId] = useState<number>()

    const openModal = (expense?: Article) => {
        if (!expense) {
            setWindowMode('add');
        } else if (expense) {
            setWindowMode('edit');
            console.log(expense.id);
            setCurrentId(expense.id);
        }
        setIsOpen(true);        
        document.body.classList.add('modal-open');
    };
    
    const closeModal = () => {
        setIsOpen(false);
        setWindowMode('');
        document.body.classList.remove('modal-open');
    };

    const Table = () => {

        const emptyListMessage = () => {
            return <tr><td colSpan={5}>No records yet</td> </tr>   
        };        

        return (                
                    <table className="expenseShown">
                    <thead>
                    <tr>
                        <th>Type</th>
                        <th>Notes</th>
                        <th>Price</th>
                        <th>Date</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {!articles.length ? emptyListMessage() : articles.map(expense => {                        
                        return (
                            <SingleArticle 
                                key = {expense.id}
                                expense = {expense}
                                isHidden = {isOpen}
                                edit = {()=>openModal(expense)}
                            />
                        )
                    })}
                    </tbody>                    
                </table>                
        );            
    }

    const showMonthStats = (month: number) => {
        const _monthExpenses = [];
        articles.map( item => {
            let itemMonth = item.date.getMonth();
            console.log(itemMonth);
            if (month === itemMonth) _monthExpenses.push(item)
        });
          
        // not readym maybe better to vreate sepatete slices ?
    }

    return (
    <div className='mainContainer'>    
    <div className='listHeader'>
        <h3>List of expenses</h3>
        <button 
            className={`btn ${isOpen ? 'modal-open hidden' : ''}`} 
            onClick={()=> openModal()}> 
            ADD NEW 
        </button>        
    </div>
    <div className='dateNavigation'>
        <button onClick={()=>showMonthStats(4)}> May </button>
        <button onClick={()=>showMonthStats(5)}> June </button>
        <button onClick={()=>showMonthStats(6)}> July </button>
    </div>    
    {Table()}
    <Add 
        isOpen={isOpen}
        mode={windowMode}  
        onClose={closeModal} 
        expenseId={currentId}
    />
    <Statistics expenses={articles} />
    </div>
    );
};