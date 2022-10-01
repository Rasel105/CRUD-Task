import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from "formik";
import { object, string } from "yup";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { updateBook } from './BookSlice';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const EditBook = () => {
    const { state } = useLocation();

    const [id, setId] = useState(state.id);
    const [bookName, setBookName] = useState(state.bookName);
    const [author, setAuthor] = useState(state.author);
    const [description, setDescription] = useState(state.description);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (values) => {
        const bookDetails = {
            id: id,
            bookName: values.bookName,
            author: values.author,
            description: values.description,
        };
        // console.log(bookDetails);
        try {
            dispatch(updateBook(bookDetails));
            toast("Book Updated!");
            navigate('/show-books')
        } catch (error) {
            console.log(error)
        }
    };

    const EditBookDetailsSchema = object().shape({
        bookName: string()
            .min(6, "Minimum 6 characters required")
            .required("Book Name required"),
        author: string()
            .min(6, "Minimum 6 characters required")
            .required("Author name required"),
        description: string()
            .min(6, "Minimum 6 characters required")
            .required("Description required"),
    });

    return (
        <div>
            <h1>Edit books</h1>
            <Formik
                initialValues={{ bookName: "", author: "", description: "", }}
                validationSchema={EditBookDetailsSchema}
                onSubmit={(values, { setSubmitting }) => {
                    setSubmitting(false);
                    handleSubmit(values);
                }}
            >
                {({ touched, errors }) => (
                    <Form className='container w-50'>
                        <Row className='mb-2'>
                            <Col>
                                <div className="form-group">
                                    <Field
                                        type="text"
                                        name="bookName"
                                        placeholder="Enter Book Name"
                                        className={`form-control ${touched.bookName && errors.bookName
                                            ? "is-invalid"
                                            : ""
                                            }`}
                                    />
                                    <ErrorMessage
                                        component="div"
                                        name="bookName"
                                        className="invalid-feedback"
                                    />
                                </div>
                            </Col>
                        </Row>
                        <Row className='mb-2'>
                            <Col>
                                <div className="form-group">
                                    <Field
                                        type="text"
                                        name="author"
                                        placeholder="Enter Author Name"
                                        className={`form-control ${touched.author && errors.author
                                            ? "is-invalid"
                                            : ""
                                            }`}
                                    />
                                    <ErrorMessage
                                        component="div"
                                        name="author"
                                        className="invalid-feedback"
                                    />
                                </div>
                            </Col>
                        </Row>
                        <Row className='mb-2'>
                            <Col >
                                <div className="form-group">
                                    <Field
                                        type="text"
                                        name="description"
                                        placeholder="Enter Description"
                                        className={`form-control ${touched.description && errors.description
                                            ? "is-invalid"
                                            : ""
                                            }`}
                                    />
                                    <ErrorMessage
                                        component="div"
                                        name="description"
                                        className="invalid-feedback"
                                    />
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Button variant="outline-primary" type="submit" size="lg">Update Book</Button>
                            </Col>
                        </Row>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default EditBook;