import React, { useRef } from 'react';
import { validateTextInput } from '../models/validate';
import { addArticle } from '../store/features/articleSlice';
import { useAppDispatch } from '../store/store';

export const Add = () => {
    const newTitle = useRef<string>("");
    const newContent = useRef<string>("");

    const dispatch = useAppDispatch();

    const createNeArticle = (title: string, content: string) => {
        let _title = validateTextInput(title, 'your title',5)
        let _content = validateTextInput(content, 'your text',10)
        if (_title && _content) {
            dispatch(addArticle({title: title, content: content}))
        }
        
    }


    return(
        <div>
            <label htmlFor="articleName">Title</label>
            <input 
            id="articleName"
                type="text" 
                onChange={(e) => (newTitle.current = e.target.value)}
            />
            <label htmlFor="articleContent">Article</label>
            <textarea
                id="articleContent"
                onChange={(e) => (newContent.current = e.target.value)}
            />
            <button
                onClick={()=>createNeArticle(newTitle.current, newContent.current)}            
            >
                Add New Article
            </button>

        </div>    
    );
};