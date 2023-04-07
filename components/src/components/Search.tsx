import React, {
  ChangeEvent,
  Dispatch,
  FormEvent,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react';
import Magnifier from './Magnifier';

interface IPropsType {
  formSubmitHandler: (searchResult: string) => Promise<void>;
  setIsPending: Dispatch<SetStateAction<boolean>>;
}

const Search: React.FC<IPropsType> = ({ formSubmitHandler, setIsPending }) => {
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

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    formSubmitHandler(value).catch((err: Error) => {
      console.log(err);
      setIsPending(true);
    });
  };

  return (
    <form className="search" onSubmit={handleSubmit}>
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
    </form>
  );
};

export default Search;
