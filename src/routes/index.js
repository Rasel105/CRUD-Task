import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Error from '../pages/Error';
import Home from '../pages/Home';
import Menu from '../layouts/Menu';
import BooksView from '../features/books/BooksView';
import AddBooks from '../features/books/AddBooks';
import EditBook from '../features/books/EditBook';

const Index = () => {
    return (
        <BrowserRouter>
            <Menu />
            <main>
                <Routes>
                    <Route path='/' element={<Home />}></Route>
                    <Route path='/show-books' element={<BooksView />}></Route>
                    <Route path='/add-books' element={<AddBooks />}></Route>
                    <Route path='/edit-book' element={<EditBook />}></Route>
                    <Route path='*' element={<Error />}></Route>
                </Routes>
            </main>
        </BrowserRouter>
    );
};

export default Index