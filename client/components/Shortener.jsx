import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CopyTextField from './CopyTextField.jsx';

function Shortener() {
  const [URL, setURL] = useState('');
  const [newURL, setNewURL] = useState('');
  const [customKey, setCustomKey] = useState('');
  const [customURL, setCustomURL] = useState(false);
  const [enableSubmit, setEnableSubmit] = useState(false);

  useEffect(() => {
    if (!customURL) {
      setEnableSubmit(URL !== '' ? true : false);
    } else {
      setEnableSubmit(URL !== '' && customKey !== '' ? true : false);
    }
  }, [URL, customURL, customKey]);

  const handleButtonClick = (e, button) => {
    e.preventDefault();
    switch (button) {
      case 'shortenURL':
        if (URL !== '' && customURL === false || URL !== '' && customKey !== '' && customURL === true) {
          axios({ method: 'post', url: '/', data: { url: URL, custom: customURL, key: customKey } })
          .then(result => {
            setNewURL(result.data);
          })
          .catch(err => {
            console.error(err);
          })
        }
        break;

      case 'swapURLType':
        setCustomURL(!customURL);
        setNewURL('');
        break;

      default:
        console.error('handleButtonClick invoked without valid button argument');
        break;
    }
  }

  const handleTextFieldChange = (e, fieldName) => {
    switch (fieldName) {
      case 'url':
        setURL(e.target.value);
        setNewURL('');
        break;

      case 'key':
        setCustomKey(e.target.value);
        setNewURL('');
        // TODO: Check whether new key is available for use
        break;

      default:
        console.error('handleTextFieldChange invoked without valid fieldName argument');
        break;
    }
  }

  return (
    <div className="urlShortenerContainer">
      {!customURL && <div className="customURLButtonsContainer">
        <div className="urlTypeButton Selected">Generate Link</div>
        <div className="urlTypeButton" onClick={ (e) => {handleButtonClick(e, 'swapURLType')} }>Custom Link</div>
      </div>}
      {customURL && <div className="customURLButtonsContainer">
        <div className="urlTypeButton" onClick={ (e) => {handleButtonClick(e, 'swapURLType')} }>Generate Link</div>
        <div className="urlTypeButton Selected">Custom Link</div>
      </div>}

      <form onSubmit={ (e) => {handleButtonClick(e, 'shortenURL')} }>
        <p className="inputDesc">Target URL</p>
        <input type="text" placeholder="http://..." onChange={ (e) => {handleTextFieldChange(e, 'url')} } value={ URL }/>
        {enableSubmit && <button type="submit">shorten</button>}
        {!enableSubmit && <button disabled type="submit">shorten</button>}
      </form>

      {customURL && <div className="customKeyContainer">
        <p className="inputDesc">Custom Path</p>
        <input className="keyField" type="text" onChange={ (e) => {handleTextFieldChange(e, 'key')} } value={ customKey }/>
        <p className="customPathExample">{window.location.host}/custom_path</p>
      </div>}

      {newURL && <CopyTextField newURL={ newURL } />}
    </div>
  )
}

export default Shortener;