import React, { useState } from 'react';
import axios from 'axios';
import CopyTextField from './CopyTextField.jsx';

function Shortener() {
  const [URL, setURL] = useState('');
  const [newURL, setNewURL] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    axios({ method: 'post', url: '/', data: { url: URL } })
    .then(result => {
      setNewURL(result.data);
    })
    .catch(err => {
      console.error(err);
    })

  }

  const handleURLChange = (e) => {
    setURL(e.target.value);
  }
  return (
    <div className="urlShortenerContainer">
      <p>Enter URL:</p>
      <form onSubmit={ handleSubmit }>
        <input type="text" onChange={ handleURLChange } value={URL}/>
        <button type="submit">shorten</button>
      </form>
      {newURL && <CopyTextField newURL={newURL} />}
    </div>
  )
}

export default Shortener;