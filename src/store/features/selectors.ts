import { createSelector } from 'reselect';
import { Article, RootState } from './articleSlice';


export const selectAllExpenses = (state: RootState) : Article[] => state.slice.articles;

export const selectExpensesForMonth = (state: RootState, monthNumber: number | null) => {
    const expenses = selectAllExpenses(state);
    const selectedExpenses = monthNumber ? expenses.filter(item => monthNumber===item.date.getMonth()) : null;
    return selectedExpenses;    
};