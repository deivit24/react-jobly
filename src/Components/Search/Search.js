import React, { useState } from 'react';
import '../../Static/css/Search.css';
const Search = ({ searchFor }) => {
  const [search, setSearch] = useState('');

  const handleSubmit = (evt) => {
    evt.preventDefault();
    searchFor(search);
  };

  const handleChange = (evt) => {
    setSearch(evt.target.value);
  };

  return (
    <div className="Search mb-4">
      <form className="form-inline" onSubmit={handleSubmit}>
        <input
          className="form-control form-control-lg flex-grow-1"
          name="search"
          placeholder="Enter search term.."
          value={search}
          onChange={handleChange}
        />
        <button type="submit" className="btn btn-lg btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Search;
