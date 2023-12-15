import React, { useEffect, useState } from 'react';
import dataSource from './dataSource';
import { useNavigate, useParams } from 'react-router-dom';


const EditJournal = (props) => {

    const { journalId } = useParams();
    const navigate = useNavigate();

    const [journal, setJournal] = useState(null);
    const [isLoading, setIsLoading] = useState(true);


    const [location, setJournalLocation] = useState(null);
    const [date, setDate] = useState(null);
    const [description, setDescription] = useState(null);
    const [feedback, setFeedback] = useState(null);

    const parseJournal = (journal) => {
        if (journal.length === 0) {
            setIsLoading(false);
            return;
        }
        journal = journal[0]
        setJournalLocation(journal.location);
        setDate(journal.date);
        setDescription(journal.description);
        setFeedback(journal.feedback);
        setJournal(journal);
        setIsLoading(false);
    };

    useEffect(() => {
        getJournal();
    }, [setJournal, setIsLoading]);

    const getJournal = async () => {
        if (!journalId || !parseInt(journalId)) return;

        const journalRes = await dataSource.get(`/journals/1`);

        if (journalRes.status !== 200) {
            navigate('/');
            return;

        }

        const journal = journalRes.data.filter(j => j.journalId === parseInt(journalId));
        console.log(journal, journalRes.data);
        parseJournal(journal);

    }

    if (!journal || journal.length === 0) {
        if (isLoading) {
            return <p>IS LOADING.......</p>;
        }
        return <p>FAILED TO LOAD JOURNAL</p>;

    }






    // Assume New Journal by setting up an empty journal and setting the flag newJournalCreation
    // let journal = {
    //     location: '',
    //     date: '',
    //     description: '',
    //     feedback: '',
    //     userfk: 1,
    // };
    // let newJournalCreation = true;

    // if (props.journal) {
    //     journal = props.journal;
    //     newJournalCreation = false;
    // }


    const handleFormSubmit = (event) => {
        event.preventDefault();
        console.log("Submit");

        const editedJournal = {
            journalId: journal.journalId,
            location: location,
            date: date,
            description: description,
            feedback: feedback,
            userfk: 1,
        };

        console.log(editedJournal);
        saveJournal(editedJournal);
    };




    const saveJournal = async (journal) => {
        console.log('ANYTHING', journal);
        try {
            const response = await dataSource.put('/journals', journal);
            console.log(response);
            console.log(response.data);
            navigate("/");
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
                <h1>Edit Journal</h1>
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

export default EditJournal;