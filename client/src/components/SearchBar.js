import React, { useState, useEffect } from 'react';

const SearchBar = ({searchData = [], placeholder = '', getSearchValue}) => {
  const [searchValue, setSearchValue] = useState('');
  const [dropdownData, setDropdownData] = useState(null);
  const filterDropdownData = () => {
    const newData = searchData.filter(entry => entry.includes(searchValue));
    console.log(searchValue, searchData[0],searchData[0].includes(searchValue))
    console.log(newData);
    setDropdownData(newData.slice(0,5));
  }
  const handleChange = event => {
    setSearchValue(event.target.value);
  }
  const handleSubmit = event => {
    event.preventDefault();
    getSearchValue(event.target.value);
  }
  const clickDropdown = event => {
    setSearchValue(event.target.textContent);
  }
  useEffect(() => {
    filterDropdownData();
  }, [searchValue, setSearchValue])
  return (
    <div className="searchbar">
      <form onSubmit={handleSubmit} className="searchbar__form">
        <input type="text" value={searchValue} onChange={handleChange} 
        placeholder={placeholder} className="searchbar__input"/>
        <div className="searchbar__dropdown" onClick={clickDropdown}>
          {dropdownData ? dropdownData.map(data => <p>{data}</p>):''}
        </div>
      </form>
    </div>
  )
}

export default SearchBar;