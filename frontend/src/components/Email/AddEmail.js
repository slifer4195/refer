import React, { useState } from 'react';
import axios from 'axios';

const AddEmail = ({ onEmailAdded }) => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    try {
      const response = await axios.post('http://127.0.0.1:5000/emails', {
        email_address: email, // Use the state value
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // On success, set a success message and clear the input
      setMessage('Email added successfully!');
      setEmail('');

      // Call the parent callback to update the email list in the parent component
      onEmailAdded();
    } catch (error) {
      // Display the error message from the API response, if available
      if (error.response && error.response.data) {
        setMessage(error.response.data.error || 'Failed to add email.');
      } else {
        setMessage('Error: Unable to connect to the server.');
      }
    }
  };

  return (
    <div>
      <h2>Add Email</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ marginRight: '10px' }}
        />
        <button type="submit">Add Email</button>
      </form>
      {message && <p>{message}</p>}
    </div> 
  );
};

export default AddEmail;
