import React, { useState, useRef } from 'react';

function CopyTextField(props) {
  const [copySuccess, setCopySuccess] = useState('');
  const textAreaRef = useRef(null);
  const newURL = props.newURL;

  function copyToClipboard(e) {
    textAreaRef.current.select();
    document.execCommand('copy');
    // This is just personal preference.
    // I prefer to not show the whole text area selected.
    e.target.focus();
    setCopySuccess('Copied!');
  };

  return (
    <div className="newURLContainer">
      <div>
        <form>
          <input type="text" readOnly
            ref={textAreaRef}
            value={newURL}
          />
        </form>
      </div>
      {
        /* Logical shortcut for only displaying the
          button if the copy command exists */
        document.queryCommandSupported('copy') &&
        <div>
          <button onClick={copyToClipboard}>copy</button>
          {/* {copySuccess} */}
        </div>
      }
    </div>
  );
}

export default CopyTextField;