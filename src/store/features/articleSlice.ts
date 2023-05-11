import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Article {
    id: number;
    title: string;
    content: string;
    image?: string
};

interface ArticlesState {
    articles: Article[]
};

const initialState: ArticlesState = { articles: [] };

const newId = () => Math.round(Math.random()*100000)

export const ArticleSlice = createSlice({
    name: "article",
    initialState,
    reducers : {
        addArticle: (state, action: PayloadAction<{ title: string, content: string }>) => {
           state.articles.push({
                id: newId(),
                title: action.payload.title,
                content: action.payload.content,
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