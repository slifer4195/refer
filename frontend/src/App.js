import React from 'react';
import AddEmail from './components/Email/AddEmail';
import EmailList from './components/Email/EmailList';

const App = () => {
  return (
    <div>
      <h1>Email Manager</h1>
      <AddEmail />
      <EmailList />
    </div>
  );
};

export default App;
