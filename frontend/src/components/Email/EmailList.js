import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { io } from 'socket.io-client'; // Import Socket.IO client
import './EmailList.css'; // Import the CSS file

const EmailList = () => {
  const [emails, setEmails] = useState([]);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState('');
  const [clickedEmail, setClickedEmail] = useState(null); // Track clicked email
  const socket = io('http://127.0.0.1:5000'); // Connect to your WebSocket server

  useEffect(() => {
    // Fetch emails initially
    axios.get('http://127.0.0.1:5000/emails')
      .then(response => {
        setEmails(response.data);
      })
      .catch(error => {
        console.error('Error fetching emails:', error);
        setError(error.message);
      });

    // Listen for real-time updates
    socket.on('email_update', (newEmail) => {
      setEmails((prevEmails) => [...prevEmails, newEmail]); // Add new email to the list
    });

    socket.on('email_delete', (deletedId) => {
      setEmails((prevEmails) => prevEmails.filter(email => email.id !== deletedId)); // Remove email
    });

    return () => {
      socket.disconnect(); // Clean up the socket connection when the component unmounts
    };
  }, [socket]);

  const handleEmailClick = async (email) => {
    try {
      setClickedEmail(email); // Mark this email as clicked
      const response = await axios.get(`http://127.0.0.1:5000/send_email?email=${email}`);
      setMessage(response.data);
    } catch (error) {
      console.error('Error sending email:', error);
      setMessage('Failed to send email.');
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://127.0.0.1:5000/emails/${id}`);
      setMessage(response.data.message);
      // No need to manually update state; WebSocket handles it
    } catch (error) {
      console.error('Error deleting email:', error);
      setMessage('Failed to delete email.');
    }
  };

  return (
    <div>
      <h2>Email List</h2>
      {error ? (
        <p style={{ color: 'red' }}>Failed to load emails: {error}</p>
      ) : (
        <ul>
          {emails.map((email) => (
            <li key={email.id}>
              {email.email_address}
              <button
                onClick={() => handleEmailClick(email.email_address)}
                className={`email-item ${clickedEmail === email.email_address ? 'clicked' : ''}`}
              >
                Send Email
              </button>
              <button
                onClick={() => handleDelete(email.id)}
                className="dltBtn"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
      {message && <p>{message}</p>}
    </div>
  );
};

export default EmailList;
