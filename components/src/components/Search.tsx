import React, {ChangeEvent, Dispatch, SetStateAction, useEffect, useRef, useState} from 'react';
import Magnifier from './Magnifier';

const Search = (): JSX.Element => {
  const [value, setValue]: [string, Dispatch<SetStateAction<string>>] = useState('');

  const initialValueRef = useRef<string>('');

  useEffect(() => {
    initialValueRef.current = localStorage.getItem('searchValue') || '';
    if (initialValueRef.current) {
      setValue(initialValueRef.current);
    }
  }, []);

  useEffect(() => {
    return () => {
      if (initialValueRef.current !== value) {
        localStorage.setItem('searchValue', value);
      }
    };
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
