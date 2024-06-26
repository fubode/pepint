import React, { useState } from 'react'

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearch = () => {
    onSearch(query);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className='col-7'>
          <input
            type="text"
            className="form-control"
            placeholder="Buscar..."
            value={query}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
          />
        </div>
        <div className='col-2'>
          <button
            className="btn btn-primary"
            type="button"
            onClick={handleSearch}
          >
            Buscar
          </button>
        </div>
        <div className='col-3'>
          <button
            className="btn btn-primary"
            type="button"
            onClick={handleSearch}
          >
            Todo
          </button>
        </div>
      </div>
    </div>
  )
}

SearchBar.propTypes = {}

export default SearchBar