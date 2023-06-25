import React, { useState } from 'react';
import './App.css';

function App() {
  const [urls, setUrls] = useState([]);
  const [urlInput, setUrlInput] = useState('');
  const [numbers, setNumbers] = useState([]);

  const handleAddUrl = (e) => {
    e.preventDefault();
    if (urlInput) {
      setUrls([...urls, urlInput]);
      setUrlInput('');
    }
  };

  const handleGetNumbers = async () => {
    setNumbers([]);

    try {
      const urlParams = urls.map((url) => 'url=' + encodeURIComponent(url)).join('&');
      const apiUrl = '/numbers?' + urlParams;
      const response = await fetch(apiUrl);
      const data = await response.json();
      setNumbers(data.numbers);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="App">
      <h1>Number Management Service</h1>
      <form onSubmit={handleAddUrl}>
        <label htmlFor="urlInput">URL:</label>
        <input
          type="text"
          id="urlInput"
          value={urlInput}
          onChange={(e) => setUrlInput(e.target.value)}
        />
        <button type="submit">Add URL</button>
      </form>
      <ul>
        {urls.map((url, index) => (
          <li key={index}>{url}</li>
        ))}
      </ul>
      <button onClick={handleGetNumbers}>Get Numbers</button>
      <ul>
        {numbers.map((number, index) => (
          <li key={index}>{number}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
