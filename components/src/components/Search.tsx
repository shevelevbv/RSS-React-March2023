import React, { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from 'react';
import Magnifier from './Magnifier';

const Search = (): JSX.Element => {
  const [value, setValue]: [string, Dispatch<SetStateAction<string>>] = useState('');

  useEffect(() => {
    const savedSearchValue: string | null = localStorage.getItem('searchValue');
    if (savedSearchValue) {
      setValue(savedSearchValue);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('searchValue', value);
  }, [value]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setValue(event.target.value);
  };

  return (
    <div className="search">
      <Magnifier />
      <input
        role="search-input"
        className="search__input"
        type="text"
        onChange={handleInputChange}
        value={value}
        placeholder="Search"
        spellCheck={false}
        autoFocus={true}
      />
    </div>
  );
};

export default Search;
