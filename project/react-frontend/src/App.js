
import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [text, setText] = useState('');

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      // Send text input to the backend using Axios
      await axios.post('http://localhost:3001/text-input', { text });
      alert('Text input sent to the backend successfully!');
    } catch (error) {
      console.error('Error sending text input:', error);
      alert('Error sending text input. Please try again.');
    }
  };

  return (
    <div>
      <h1>PWA Frontend</h1>
      <input type="text" value={text} onChange={handleChange} />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default App;
