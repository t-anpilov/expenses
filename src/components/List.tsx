import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectAllExpenses, selectExpensesForMonth } from '../store/features/selectors'
import { Add } from './Add';
import { Statistics } from './Statistic';
import { SingleExpense } from './SingleExpense';
import { Expense, RootState } from '../store/features/expensesSlice';
import { Nav } from './Nav';


export const List = () => {

    const allExpenses = useSelector(selectAllExpenses);

    const calculatedMonth = (new Date()).getMonth();

    const [currentMonth, setCurrentMonth] = useState<number | null>(calculatedMonth);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [windowMode, setWindowMode] = useState<string>('');
    const [currentExpense, setCurrentExpense] = useState<Expense>();

    const selectedExpenses: Expense[] | null = useSelector((state: RootState) => selectExpensesForMonth(state, currentMonth));        
       

    const openModal = (expense?: Expense) => {
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
    
    const showMonthStats = (monthNumber: number | null) => {        
        setCurrentMonth(monthNumber)        
    }

    const expensesToShow = selectedExpenses ? selectedExpenses : allExpenses;

    const Table = () => {

        const emptyListMessage = () => {
            return <tr><td colSpan={5}>No records yet</td></tr>   
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
                    {!expensesToShow.length ? emptyListMessage() : expensesToShow.map(expense => {                        
                        return (
                            <SingleExpense 
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
    <Nav onClickHandler={showMonthStats}/>   
    <div className='listHeader'>
        <h3>List of expenses</h3>
        <button 
            className={`btn ${isOpen ? 'modal-open hidden' : ''}`} 
            onClick={()=> openModal()}> 
            ADD NEW 
        </button>        
    </div>
    <div className='dateNavigation'>
        {currentMonth ? `${currentMonth+1}/2023` : `All expenses`}
    </div>    
    {Table()}
    <Add  
        isOpen={isOpen}
        mode={windowMode}  
        onClose={closeModal} 
        expenseForEdit={currentExpense}
    />
    <Statistics expenses={expensesToShow} />
    </div>
    );
};