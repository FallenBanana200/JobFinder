import React from 'react';
import Header from './Header';
import JobCards from './JobCards';
import SwipeButtons from './SwipeButtons';


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


