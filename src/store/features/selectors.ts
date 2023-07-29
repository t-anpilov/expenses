import { createSelector } from 'reselect';
import { RootState } from './articleSlice';


export const selectAllExpenses = (state: RootState) => state.slice.articles;

export const selectExpensesForMonth = createSelector(
    selectAllExpenses,
    (expenses) => {      
      const selectedExpenses = expenses.filter(item => 6===item.date.getMonth());
        return selectedExpenses;
    }
  );