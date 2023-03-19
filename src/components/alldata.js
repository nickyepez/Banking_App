import React, { useState } from 'react';

export function AllData(){
  const [submissions, setSubmissions] = useState([]);
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newSubmission = {
      name: formData.get('name'),
      email: formData.get('email'),
      password: formData.get('password'),
      balance: formData.get('balance'),
    };
    setSubmissions([...submissions, newSubmission]);
    e.target.reset();
  };

  return (
      <div className="container">
        <h1>All Data</h1>
        <form onSubmit={handleFormSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input type="text" className="form-control" id="name" name="name" />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input type="email" className="form-control" id="email" name="email" />
          </div>
          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea className="form-control" id="message" name="message" rows="3"></textarea>
          </div>
        </form>
      </div>
  );
}