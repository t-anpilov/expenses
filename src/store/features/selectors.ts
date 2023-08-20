import { Expense, RootState } from './expensesSlice';


export const selectAllExpenses = (state: RootState) : Expense[] => state.slice.expenses;

export const selectExpensesForMonth = (state: RootState, monthNumber: number | null) => {
    const expenses = selectAllExpenses(state);
    const selectedExpenses = monthNumber ? expenses.filter(item => monthNumber===item.date.getMonth()) : null;
    return selectedExpenses;    
};