import React, { useRef } from 'react';
import { addArticle } from '../store/features/articleSlice';
import { useAppDispatch } from '../store/store';

export const Add = () => {
    const newTitle = useRef<string>("");
    const newContent = useRef<string>("");

    const dispatch = useAppDispatch();


    return(
        <div>
            <label htmlFor="articleName">Title</label>
            <input 
            id="articleName"
                type="text" 
                onChange={(e) => (newTitle.current = e.target.value)}
            />
            <label htmlFor="articleContent">Article</label>
            <input
                id="articleContent"
                type="text" 
                onChange={(e) => (newContent.current = e.target.value)}
            />
            <button
                onClick={() => {
                    dispatch(addArticle({title: newTitle.current, content: newContent.current}))
                }}            
            >
                Add New Article
            </button>

        </div>    
    );
};
