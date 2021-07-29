import React, { useState, useEffect } from 'react';

const SearchBar = ({searchData = [], placeholder = '', getSearchValue}) => {
  const [searchValue, setSearchValue] = useState('');
  const [dropdownData, setDropdownData] = useState(null);
  const [sortedSearchData, setSortedSearchData] = useState(searchData.sort((a,b) => a.display > b.display ? 1 : -1))
  const filterDropdownData = () => {
    const newData = sortedSearchData.filter(entry => entry.display.toLowerCase().includes(searchValue.toLowerCase()));
    setDropdownData(newData.slice(0,2500));
  }
  const handleChange = event => {
    setSearchValue(event.target.value);
  }
  const handleSubmit = event => {
    event.preventDefault();
    getSearchValue(sortedSearchData.find(entry => (entry.display.toLowerCase() === event.target.textContent.toLowerCase())).value);
  }
  const clickDropdown = event => {
    console.log(event.target.tagName)
    if(event.target.tagName === 'P'){
      getSearchValue(sortedSearchData.find(entry => (entry.display.toLowerCase() === event.target.textContent.toLowerCase())).value);
      setSearchValue('');
    }
  }
  useEffect(() => {
    
    filterDropdownData();
  }, [searchValue, setSearchValue])
  return (
    <div className="searchbar">
      <form onSubmit={handleSubmit} className="searchbar__form">
        <input type="text" value={searchValue} onChange={handleChange} 
        placeholder={placeholder} className="searchbar__input" />
        <div className="searchbar__dropdown" onClick={clickDropdown}>
          {dropdownData ? dropdownData.map(data => <p key={data.value}>{data.display}</p>):''}
        </div>
      </form>
    </div>
  )
}

export default SearchBar;