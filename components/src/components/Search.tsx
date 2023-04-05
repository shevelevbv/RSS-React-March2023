import React, { ChangeEvent, Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import Magnifier from './Magnifier';

const Search: React.FC = () => {
  const [value, setValue]: [string, Dispatch<SetStateAction<string>>] = useState(
    localStorage.getItem('searchValue') || ''
  );

  const initialValueRef: React.MutableRefObject<string> = useRef<string>('');

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
