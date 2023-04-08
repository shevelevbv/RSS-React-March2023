import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Search from '../components/Search';

const formSubmitHandler = (searchInput: string) => {
  console.log('test);
};
test('renders search component', (): void => {
  render(<Search formSubmitHandler={formSubmitHandler}/>);
  const input: HTMLInputElement = screen.getByRole('search-input');
  const magnifier: HTMLOrSVGElement = screen.getByRole('magnifier-icon');
  expect(input).toBeInTheDocument();
  expect(input).toHaveAttribute('placeholder', 'Search');
  expect(input).toHaveValue('');
  expect(magnifier).toBeInTheDocument();
});

test('updates search value on input change', (): void => {
  render(<Search />);
  const input: HTMLInputElement = screen.getByRole('search-input');
  fireEvent.change(input, { target: { value: 'new search value' } });
  expect(input).toHaveValue('new search value');
});

test('gets search value from local storage on mount', (): void => {
  localStorage.setItem('searchValue', 'search value');
  render(<Search />);
  const input: HTMLInputElement = screen.getByRole('search-input');
  expect(input).toHaveValue('search value');
});

test('saves search value to local storage when unmounted', (): void => {
  const searchValue = 'test value';
  const { unmount } = render(<Search />);

  fireEvent.change(screen.getByRole('search-input'), { target: { value: searchValue } });
  unmount();

  expect(localStorage.getItem('searchValue')).toBe(searchValue);
});
