import React, { useState } from 'react';
import { useAppSelector } from '../store/store';
import { SingleArticle } from './SingleArticle';
//import { Statistics } from './Statistic';
import { Add } from './Add';


export const List = () => {

    const articles = useAppSelector(state => state.article.articles);
    const [isOpen, setIsOpen] = useState(false);

    const emptyListMessage = () => {
        return (
            <tr>
                <td colSpan={5}>No records yet</td>
            </tr>
        )
    };

    const openModal = () => {
        setIsOpen(true);
        document.body.classList.add('modal-open');
    };
    
    const closeModal = () => {
        setIsOpen(false);
        document.body.classList.remove('modal-open');
    };

    return (
    <div className='mainContainer'>
    <Add isOpen={isOpen} onClose={closeModal}></Add>
    <div className='listHeader'>
        <h3>List of expenses</h3>
        <button 
            className={`btn ${isOpen ? 'modal-open hidden' : ''}`} 
            onClick={openModal}> 
            ADD NEW 
        </button>        
    </div>
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
        {!articles.length ? emptyListMessage() : articles.map(article => {
            return (
                <SingleArticle 
                    key = {article.id}
                    id = {article.id}
                    type = {article.type}
                    content = {article.content}
                    cost = {article.cost}
                    date = {article.date}
                    isHidden = {isOpen}
                />
            )
        })}
        </tbody>
        
    </table>
    
    </div>
    );
};