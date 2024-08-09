import React from 'react';
import Header from './components/Header';
import JobCards from './components/JobCards';
import SwipeButtons from './components/SwipeButtons';


function App() {
  return (
    <>
      <Header backButton={null}/>
      <JobCards />
      <SwipeButtons />
    </>
  )
}

export default App;


