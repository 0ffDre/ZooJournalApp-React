import React from 'react';
import { Link } from 'react-router-dom';
import dataSource from './dataSource';
import { useNavigate } from 'react-router-dom';

const Journal = (props) => {
    const navigate = useNavigate();

    const handleDeleteClick = () => {
        dataSource.delete(`/journals/${props.journalId}`)
            .then(res => navigate("/"));
    };

    return (
        <div className="card">
            <div className="card-body">
                <h5 className="card-title">Location: {props.journalLocation}</h5>
                <h6 className="card-subtitle mb-2 text-muted">Description: {props.journalDescription}</h6>
                <p className="card-text">Feedback: {props.journalFeedback}</p>
                <p href="#" className="card-text">{props.journalDate}</p>

            </div>
            <Link
                to={`/edit/${props.journalId}`}
                className="btn btn-primary"
            >
                <span>Edit</span>
            </Link>
            <button
                onClick={() => handleDeleteClick()}
                className='btn btn-danger' // Use 'btn-danger' for a red button
            >
                Delete
            </button>

        </div>
    );

};


export default Journal;

