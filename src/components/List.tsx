import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectAllExpenses, selectExpensesForMonth } from '../store/features/selectors'
import { Add } from './Add';
import { Statistics } from './Statistic';
import { SingleArticle } from './SingleArticle';
import { Article, RootState } from '../store/features/articleSlice';


export const List = () => {

    const allExpenses = useSelector(selectAllExpenses);

    const [currentMonth, setCurrentMonth] = useState<number>();
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [windowMode, setWindowMode] = useState<string>('');
    const [currentExpense, setCurrentExpense] = useState<Article>();

    const selectedExpenses: Article[] | undefined = useSelector((state: RootState) => selectExpensesForMonth(state, currentMonth));        
       

    const openModal = (expense?: Article) => {
        if (!expense) {
            setWindowMode('add');
            setCurrentExpense(undefined);
        } else if (expense) {
            setWindowMode('edit');
            console.log(expense.id);
            setCurrentExpense(expense);
        }
        setIsOpen(true);        
        document.body.classList.add('modal-open');
    };
    
    const closeModal = () => {
        setIsOpen(false);
        setWindowMode('');
        document.body.classList.remove('modal-open');
    };
    
    const showMonthStats = (monthNumber: number) => {        
        setCurrentMonth(monthNumber)        
    }

    const articles = selectedExpenses ? selectedExpenses : allExpenses;

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
        <button 
            className={`btn ${isOpen ? 'modal-open hidden' : ''}`}
            onClick={()=>showMonthStats(4)}> 
            May 
        </button>
        <button 
            className={`btn ${isOpen ? 'modal-open hidden' : ''}`}
            onClick={()=>showMonthStats(5)}> 
            June 
        </button>
        <button 
            className={`btn ${isOpen ? 'modal-open hidden' : ''}`}
            onClick={()=>showMonthStats(6)}> 
            July 
        </button>
        <button 
            className={`btn ${isOpen ? 'modal-open hidden' : ''}`}
            onClick={()=>setCurrentMonth(undefined)}> 
            ALL 
        </button>
    </div>    
    {Table()}
    <Add 
        isOpen={isOpen}
        mode={windowMode}  
        onClose={closeModal} 
        expenseForEdit={currentExpense}
    />
    <Statistics expenses={articles} />
    </div>
    );
};