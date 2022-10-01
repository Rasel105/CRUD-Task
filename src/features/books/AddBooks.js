import React from 'react';
import { Formik, Form, Field, ErrorMessage } from "formik";
import { object, string } from "yup";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { addBook } from './BookSlice';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

const AddBooks = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleSubmit = async (values) => {
        const bookDetails = {
            id: uuidv4(),
            bookName: values.bookName,
            author: values.author,
            description: values.description,
        };
        try {
            dispatch(addBook(bookDetails));
            toast("Book added successfully");
            navigate('/show-books', { replace: true });
        } catch (error) {
            console.log(error)
        }
    };

    const BookDetailsSchema = object().shape({
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
            <h1>Add Book</h1>
            <Formik
                initialValues={{ bookName: "", author: "", description: "", }}
                validationSchema={BookDetailsSchema}
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
                                <Button variant="outline-primary" type="submit" size="lg">Add Book</Button>
                            </Col>
                        </Row>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default AddBooks;