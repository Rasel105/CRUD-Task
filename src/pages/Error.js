import React from 'react';
import { Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

const Error = () => {

    return (
        <div>
            <h1>Error Page</h1>
            <Link to={("/")}>
                <Button variant="primary" size="lg">
                    Large button
                </Button>
            </Link>
        </div>
    );
};

export default Error;