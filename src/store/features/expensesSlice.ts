import { createSlice, combineReducers, PayloadAction } from "@reduxjs/toolkit";
import { stateExample } from "../stateExample";


export interface Expense {
    id: number;
    type: string;
    content: string;
    cost: number;
    date: Date;
};

export enum expenseTypes {
    Food = 'food',
    Clothes = 'clothes',
    Home = 'home',
    Deposit = 'deposit',
    Relax = 'relax'
}

export interface ExpensesState {
    expenses: Expense[]
};

const initialState: ExpensesState = { 
    expenses: stateExample
};

export const expensesSlice = createSlice({
    name: "expensesSlice",
    initialState,
    reducers : {
        addExpense: (state, action: PayloadAction<Expense>) => {
           state.expenses.push({
                id: action.payload.id,
                type: action.payload.type,
                content: action.payload.content,
                cost: action.payload.cost,
                date: action.payload.date
           }) 
        },
        updateExpense: (state, action: PayloadAction<Expense>) => {
            let index = state.expenses.findIndex(item => item.id === action.payload.id);
            state.expenses[index] = action.payload;
         },
        removeExpense: (state, action: PayloadAction<{ id: number }>) => {
            let index = state.expenses.findIndex(item => item.id === action.payload.id);
            state.expenses.splice(index, 1)
        },
    },
});

const rootReducer = combineReducers({
    slice: expensesSlice.reducer,
  });

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;

export const { addExpense, updateExpense, removeExpense } = expensesSlice.actions;