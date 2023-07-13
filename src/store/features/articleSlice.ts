import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { stateExample } from "./stateExample";


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

interface ArticlesState {
    articles: Article[]
};

const initialState: ArticlesState = { 
    articles: stateExample
};

export const ArticleSlice = createSlice({
    name: "article",
    initialState,
    reducers : {
        addArticle: (state, action: PayloadAction<{ id: number, type: string, content: string, cost: number, date: Date }>) => {
           state.articles.push({
                id: action.payload.id,
                type: action.payload.type,
                content: action.payload.content,
                cost: action.payload.cost,
                date: action.payload.date
           }) 
        },
        removeArticle: (state, action: PayloadAction<{ id: number }>) => {
            let index = state.articles.findIndex(item => item.id === action.payload.id);
            state.articles.splice(index, 1)
        },
    },
});


export default ArticleSlice.reducer;

export const { addArticle, removeArticle } = ArticleSlice.actions;