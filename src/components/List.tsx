import React, { useState } from 'react';
import { useAppSelector } from '../store/store';
import { Add } from './Add';
import { Statistics } from './Statistic';
import { Table } from './Table';


export const List = () => {

    const articles = useAppSelector(state => state.article.articles);
    const [isOpen, setIsOpen] = useState(false);
    const [windowMode, setWindowMode] = useState('');

    const openModal = (id?: number) => {
        if (!id) {
            setWindowMode('add');
        } else {
            setWindowMode('edit')
        }
        setIsOpen(true);        
        document.body.classList.add('modal-open');
    };
    
    const closeModal = () => {
        setIsOpen(false);
        setWindowMode('');
        document.body.classList.remove('modal-open');
    };

    const showMonthStats = (month: number) => {
        const _monthExpenses = [];
        articles.map( item => {
            let itemMonth = item.date.getMonth();
            console.log(itemMonth);
            if (month === itemMonth) _monthExpenses.push(item)
        });
           
        
    }

    return (
    <div className='mainContainer'>
    <Add isOpen={isOpen} onClose={closeModal} mode={windowMode}></Add>
    <div className='listHeader'>
        <h3>List of expenses</h3>
        <button 
            className={`btn ${isOpen ? 'modal-open hidden' : ''}`} 
            onClick={(e)=> openModal()}> 
            ADD NEW 
        </button>        
    </div>
    <div className='dateNavigation'>
        <button onClick={()=>showMonthStats(4)}> May </button>
        <button onClick={()=>showMonthStats(5)}> June </button>
        <button onClick={()=>showMonthStats(6)}> July </button>
    </div>    
    <Table expenses={articles} visible={isOpen} openEditModal={openModal} />
    <Statistics expenses={articles} />
    </div>
    );
};