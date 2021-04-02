import React, { useState } from 'react';
import axios from 'axios';

function Main() {
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
    <div>
      <h2>URL Shortener</h2>
      <form onSubmit={ handleSubmit }>
        <input type="text" onChange={ handleURLChange } value={URL}/>
        <button type="submit">minify</button>
      </form>
      {newURL && <h2>New Link: {newURL}</h2>}
    </div>
  )
}

export default Main;