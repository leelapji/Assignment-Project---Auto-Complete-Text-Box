import React, { useState, useEffect } from 'react';
import countryData from '../resources/countryData.json';

const SearchBox = () => {
  const [input, setInput] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(true);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInput(value);
    if (value) {
      const filteredSuggestions = countryData.filter((country) =>
        country.name.toLowerCase().startsWith(value.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
    setShowSuggestions(true);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      setShowSuggestions(false);
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div>
      <input
        type="text"
        value={input}
        onChange={handleInputChange}
        placeholder="Search for a country..."
      />
      {showSuggestions && suggestions.length > 0 && (
        <ul>
          {suggestions.map((suggestion) => (
            <li key={suggestion.code}>{suggestion.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBox;
