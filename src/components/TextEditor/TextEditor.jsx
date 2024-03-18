/* eslint-disable react/prop-types */
import { useRef } from 'react';
import './TextEditor.css'; // Import your CSS file for component styling

function TextEditor({ text }) {
  const textAreaRef = useRef(null);

  const copyText = () => {
    textAreaRef.current.select();
    document.execCommand('copy');
  };

  return (
    <div className="text-editor-container">
      <textarea ref={textAreaRef} className="text-editor" defaultValue={text} onFocus={(e) => e.target.select()} />
      <button className="copy-button" onClick={copyText}>
        Copy All
      </button>
    </div>
  );
}

export default TextEditor;
