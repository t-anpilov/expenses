import { createSlice, combineReducers, PayloadAction } from "@reduxjs/toolkit";
import { stateExample } from "../stateExample";


export interface Article {
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

export interface ArticlesState {
    articles: Article[]
};

const initialState: ArticlesState = { 
    articles: stateExample
};

export const expensesSlice = createSlice({
    name: "expensesSlice",
    initialState,
    reducers : {
        addArticle: (state, action: PayloadAction<Article>) => {
           state.articles.push({
                id: action.payload.id,
                type: action.payload.type,
                content: action.payload.content,
                cost: action.payload.cost,
                date: action.payload.date
           }) 
        },
        updateArticle: (state, action: PayloadAction<Article>) => {
            let index = state.articles.findIndex(item => item.id === action.payload.id);
            state.articles[index] = action.payload;
         },
        removeArticle: (state, action: PayloadAction<{ id: number }>) => {
            let index = state.articles.findIndex(item => item.id === action.payload.id);
            state.articles.splice(index, 1)
        },
    },
});

const rootReducer = combineReducers({
    slice: expensesSlice.reducer,
  });

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;

export const { addArticle, updateArticle, removeArticle } = expensesSlice.actions;