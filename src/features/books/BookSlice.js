import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from 'uuid';

const initialBooks = {
    book: [
        { id: uuidv4(), bookName: "Bangla", author: "Donal Trump", description: "Read Bangla Book" },
        { id: uuidv4(), bookName: "English", author: "APJ Abdul Kalam", description: "Read English Book" },
    ],
};

export const bookSlice = createSlice({
    name: "books",
    initialState: initialBooks,
    reducers: {
        showBooks: (state) => state,
        addBook: (state, { payload }) => {
            state.book.push(payload)
        },
        updateBook: (state, { payload }) => {
            const { id, bookName, author, description } = payload;
            const isBookExisist = state.book = state.book.filter((book) => book.id === id);
            if (isBookExisist) {
                isBookExisist[0].bookName = bookName;
                isBookExisist[0].author = author;
                isBookExisist[0].description = description;
            }
        },
        deleteBook: (state, { payload }) => {
            const id = payload;
            state.book = state.book.filter(book => book.id !== id);
        },

    },
});

export const { showBooks, addBook, deleteBook, updateBook } = bookSlice.actions;
export default bookSlice.reducer;