// Search.js
import React, { useState } from "react";
import { IoIosSearch } from "react-icons/io";
import "./Search.css";

const Search = ({ data }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    if (event.target.value.length > 0) {
      const filteredResults = data.filter((item) =>
        item.toLowerCase().includes(event.target.value.toLowerCase())
      );
      setResults(filteredResults);
    } else {
      setResults([]);
    }
  };

  const toggleSearch = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`search-container ${isOpen ? "open" : ""}`}>
      <div className="search-icon" onClick={toggleSearch}>
        <IoIosSearch size={24} style={{ color: "black" }} />
      </div>
      {isOpen && (
        <div className="search-popup">
          <div className="search-popup-content">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={handleSearch}
              className="search-input"
            />
            <button className="search-button" onClick={handleSearch}>
              Search
            </button>
            <ul className="search-results">
              {results.map((result, index) => (
                <li key={index}>{result}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
