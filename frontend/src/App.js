import React from 'react';
import AddEmail from './components/Email/AddEmail';
import EmailList from './components/Email/EmailList';
import Navbar from './components/Navbar/Navbar';

const App = () => {
  return (
    <>
      <Navbar />
      
      <h1>Email Managers</h1>
      <AddEmail />
      <EmailList />
    </>
  );
};

export default App;
