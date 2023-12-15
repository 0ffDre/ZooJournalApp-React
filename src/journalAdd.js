import React, { useState } from 'react';
import dataSource from './dataSource';
import { useNavigate } from 'react-router-dom';


const NewJournal = (props) => {

    const [location, setJournalLocation] = useState('');
    const [date, setDate] = useState('');
    const [description, setDescription] = useState('');
    const [feedback, setFeedback] = useState('');
    const navigate = useNavigate();


    const handleFormSubmit = (event) => {
        event.preventDefault();
        console.log("Submit");

        const journal = {
            location: location,
            date: date,
            description: description,
            feedback: feedback,
            userfk: 1,
        };

        console.log(journal);
        saveJournal(journal);
    };

    const saveJournal = async (journal) => {
        try {
            const response = await dataSource.post('/journals', journal);
            console.log(response);
            console.log(response.data);
            props.onNewJournal(navigate);

        } catch (error) {
            console.error("Error saving journal:", error);
        }
    };

    const handleCancel = () => {
        navigate("/");
    };

    const updateLocation = (event) => {
        setJournalLocation(event.target.value);
    };

    const updateDate = (event) => {
        setDate(event.target.value);
    };

    const updateDescription = (event) => {
        setDescription(event.target.value);
    };

    const updateFeedback = (event) => {
        setFeedback(event.target.value);
    };


    return (
        <div className="container">
            <form onSubmit={handleFormSubmit}>
                <h1>Create Journal</h1>
                <div className="form-group">
                    <label htmlFor="journalLocation">Journal Location</label>
                    <input
                        type="text"
                        className="form-control"
                        id="journalLocation"
                        placeholder="Enter Journal Location"
                        value={location}
                        onChange={updateLocation}
                    />
                    <label htmlFor="journalDate">Date</label>
                    <input
                        type="text"
                        className="form-control"
                        id="journalLocation"
                        placeholder="Enter Journal Date"
                        value={date}
                        onChange={updateDate}
                    />
                    <label htmlFor="journalDescription">Description</label>
                    <textarea
                        type="text"
                        className="form-control"
                        id="journalDescription"
                        placeholder="Enter Journal Description"
                        value={description}
                        onChange={updateDescription}
                    />
                    <label htmlFor="journalFeedback">Feedback</label>
                    <input
                        type="text"
                        className="form-control"
                        id="journalFeedback"
                        placeholder="Enter Journal Feedback"
                        value={feedback}
                        onChange={updateFeedback}
                    />
                </div>
                <div align="center">
                    <button type="button" className="btn btn-light" onClick={handleCancel}>
                        Cancel
                    </button>
                    <button type="submit" className="btn btn-primary">
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );

};

export default NewJournal;