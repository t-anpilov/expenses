import { createSelector } from 'reselect';
import { Article, RootState } from './articleSlice';


export const selectAllExpenses = (state: RootState) : Article[] => state.slice.articles;

export const selectExpensesForMonth = (state: RootState, monthNumber: number) => {
    const expenses = selectAllExpenses(state);
    const selectedExpenses = expenses.filter(item => monthNumber===item.date.getMonth());
    return selectedExpenses;    
};