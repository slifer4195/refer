import React, { useEffect, useState } from 'react';
import axios from 'axios';

const EmailList = () => {
  const [emails, setEmails] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Replace with your Flask API URL
    axios.get('http://127.0.0.1:5000/emails')
      .then(response => {
        setEmails(response.data); // Assuming API returns a list of emails
      })
      .catch(error => {
        console.error('Error fetching emails:', error);
        setError(error.message);
      });
  }, []);

  return (
    <div>
      <h2>Email List</h2>
      {error ? (
        <p style={{ color: 'red' }}>Failed to load emails: {error}</p>
      ) : (
        <ul>
          {emails.map((email) => (
            <li key={email.id}>{email.email_address}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default EmailList;
