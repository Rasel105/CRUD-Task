import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Table from 'react-bootstrap/Table';
import { Button, Modal } from 'react-bootstrap';
import { deleteBook } from './BookSlice';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { AiOutlineEdit } from 'react-icons/ai';

const BooksView = () => {
    const books = useSelector((store) => store.booksReducer.book);
    const dispatch = useDispatch();
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [show2, setShow2] = useState(false);
    const handleClose2 = () => setShow2(false);
    const handleShow2 = () => setShow2(true);

    const handleDeleteBook = id => {
        try {
            dispatch(deleteBook(id));
            toast("Book deleted successfully");
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='container'>
            <h2>List of Books</h2>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        {/* <th>ID</th> */}
                        <th>Book Name</th>
                        <th>Author</th>
                        <th>Description</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        books && books.map((book) => {
                            const { id, bookName, author, description } = book;
                            return <tr key={id}>
                                {/* <td>{id}</td> */}
                                <td>{bookName}</td>
                                <td>{author}</td>
                                <td>{description}</td>
                                <td className='d-flex justify-content-evenly'>
                                    {/* <Link to="/edit-book" state={{ id, bookName, author, description }}>
                                        <Button variant="outline-success">Edit</Button>
                                    </Link> */}
                                    <Button onClick={handleShow2} variant="outline-success"><AiOutlineEdit /></Button>

                                    <Modal show={show2} onHide={handleClose2} animation={true}>
                                        <Modal.Header closeButton>
                                            <Modal.Title>{bookName}</Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>Are you sure? You want to Update?</Modal.Body>
                                        <Modal.Footer>
                                            <Button variant="secondary" onClick={handleClose2}>
                                                Close
                                            </Button>
                                            <Link to="/edit-book" state={{ id, bookName, author, description }}>
                                                <Button variant="outline-success">Update</Button>
                                            </Link>
                                        </Modal.Footer>
                                    </Modal>

                                    {/* <Button onClick={() => handleDeleteBook(id)} variant="outline-danger">Delete</Button> */}
                                    <Button onClick={handleShow} variant="outline-danger"><RiDeleteBin6Line /></Button>
                                    <Modal show={show} onHide={handleClose} animation={true}>
                                        <Modal.Header closeButton>
                                            <Modal.Title>{bookName}</Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>Are you sure? You want to delete?</Modal.Body>
                                        <Modal.Footer>
                                            <Button variant="secondary" onClick={handleClose}>
                                                Close
                                            </Button>
                                            <Button variant="danger" onClick={() => handleDeleteBook(id)}>
                                                Delete
                                            </Button>
                                        </Modal.Footer>
                                    </Modal>
                                </td>
                            </tr>
                        })
                    }
                </tbody>
            </Table>
        </div>
    );
};

export default BooksView;