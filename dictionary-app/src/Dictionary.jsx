import React, { useState } from 'react';
import './Dictionary.css';

function Dictionary() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [audioSource, setAudioSource] = useState('');

  const apiUrl = 'https://api.dictionaryapi.dev/api/v2/entries/en/';

  const handleSearch = async (e) => {
    e.preventDefault();

    if (searchTerm.trim() === '') {
      alert('Sökfältet kan inte vara tomt');
      return;
    }

    try {
      const response = await fetch(`${apiUrl}${searchTerm}`);
      if (!response.ok) {
        throw new Error('Något gick fel vid hämtning');
      }
      const data = await response.json();
      setSearchResults(data);
      setAudioSource(data[0]?.phonetics[0]?.audio || ''); // Set the audio source
    } catch (error) {
      console.error('Fel vid sökning:', error);
      // Handle error messages here
    }
  };

  const playSound = () => {
    if (audioSource) {
      const audio = new Audio(audioSource);
      audio.play();
    }
  };

  return (
    <div className="container">
      <div className="search-box">
        <form onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Sök efter ord..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit">Sök</button>
        </form>
      </div>
      <div className="result">
        {/* Display search results */}
        {searchResults.map((result, index) => (
          <div className="result-word" key={index}>
            <h3>{result.word}</h3>
            {/* Display all definitions */}
            {result.meanings.slice(0, 2).map((meaning, meaningIndex) => (
              <div className="result-definition" key={meaningIndex}>
                <p className="part-of-speech">{meaning.partOfSpeech}</p>
                <ul>
                  {meaning.definitions.slice(0, 2).map((definition, definitionIndex) => (
                    <li className="definition" key={definitionIndex}>
                      <p>Definition: {definition.definition}</p>
                      {definition.example && (
                        <p className="example">Exempel: {definition.example}</p>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ))}
      </div>
      {audioSource && (
        <button className="sound-button" onClick={playSound}>
          play
        </button>
      )}
    </div>
  );
}

export default Dictionary;
