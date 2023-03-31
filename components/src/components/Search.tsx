import React, { ChangeEvent, Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import Magnifier from './Magnifier';

const Search = (): JSX.Element => {
  const [value, setValue]: [string, Dispatch<SetStateAction<string>>] = useState(
    localStorage.getItem('searchValue') || ''
  );

  const initialValueRef = useRef<string>('');

  useEffect(() => {
    initialValueRef.current = value;
  }, [value]);

  useEffect(() => {
    return () => {
      localStorage.setItem('searchValue', initialValueRef.current);
    };
  }, []);

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
