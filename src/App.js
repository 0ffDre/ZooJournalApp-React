import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NavBar from './NavBar';
import React, { useState, useEffect } from 'react'; import './App.css';
import dataSource from './dataSource';
import JournalList from './journalList';
import JournalAdd from './journalAdd';
import EditJournal from './journalEdit';


const App = () => {
  const [journalList, setJournalList] = useState([]);
  const [currentlySelectedJournalId, setCurrentlySelectedJournalId] = useState(0);

  let refresh = false;


  //Setup initialization callback
  useEffect(() => {
    //update the albumlist
    loadJournals();
  }, [refresh]);

  const loadJournals = async () => {
    try {
      const response = await dataSource.get('/journals/1');
      console.log('Fetched data:', response.data);

      setJournalList(response.data);
    } catch (error) {
      console.error('Error fetching journals:', error);
    }
  };


  const updateSingleJournal = (id, navigate, uri) => {
    console.log('Update Single Journal = ', id);
    console.log('Update Single Journal = ', navigate);
    var indexNumber = 0;
    for (var i = 0; i < journalList.length; ++i) {
      if (journalList[i].id === id) indexNumber = i;
    }
    setCurrentlySelectedJournalId(indexNumber);
    let path = uri + indexNumber;
    console.log('path', path);
    navigate(path);
  };

  const onNewJournal = (navigate) => {
    loadJournals();
    navigate("/")
  }

  // const onEditJournal = (navigate) => {
  //   loadJournals();
  //   navigate("/");
  // }





  return (
    <>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route
            exact
            path='/'
            element={
              <JournalList
                journalList={journalList}
                loadJournals={loadJournals}
                updateSingleAlbum={updateSingleJournal}
              />
            }
          />
          <Route exact path='/new' element={<JournalAdd onNewJournal={onNewJournal} />} />
          <Route exact path='/edit/:journalId' element={<EditJournal />} />

        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;