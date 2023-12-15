import React from 'react';
import Journal from './Journal';
import { useNavigate } from 'react-router-dom';

const JournalList = (props) => {

    props.loadJournals();


    const handleSelectionOne = (journalId) => {
        console.log('Select ID is ' + journalId);
        props.onClick(journalId, navigator);
    };

    console.log('props journalList', props);
    const navigator = useNavigate();
    const journals = props.journalList.map((journal) => {
        return (
            <Journal
                key={journal.journalId}
                journalId={journal.journalId}
                journalLocation={journal.location}
                journalDate={journal.date}
                journalDescription={journal.description}
                journalFeedback={journal.feedback}

                onClick={handleSelectionOne}
            />
        );
    });
    return (

        <div className='container d-flex flex-column align-items-center'>
            <img className='img-fluid' style={{ maxWidth: '250px' }} src='./zooJournalLogo.png' alt='Logo' />

            <div className='d-flex flex-wrap justify-content-center'>
                {journals.map((journal, index) => (
                    <React.Fragment key={index}>
                        <div className='m-2'>{journal}</div>
                        {(index + 1) % 2 === 0 && <div className='w-100'></div>}
                    </React.Fragment>
                ))}
            </div>
        </div>
    );





};

export default JournalList;