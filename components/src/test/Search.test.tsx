import React from 'react';
import { render, screen,  fireEvent, waitFor } from '@testing-library/react';
import Search from '../components/Search';
import { vi } from 'vitest';

describe('Search component', () => {
  const searchResult = 'test';
  const mockFormSubmitHandler = vi.fn(() => Promise.resolve());
  const mockSetIsPending = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: vi.fn(() => searchResult),
        setItem: vi.fn(),
      },
      writable: true,
    });
  });

  test('should render without errors', () => {
    render(<Search formSubmitHandler={mockFormSubmitHandler} setIsPending={mockSetIsPending} />);
    expect(screen.getByRole('form')).toBeInTheDocument();
  });

  test('should set the initial input value from local storage', () => {
    render(<Search formSubmitHandler={mockFormSubmitHandler} setIsPending={mockSetIsPending} />);
    expect(screen.getByRole('search-input')).toHaveValue(searchResult);
  });

  test('should set isPending to true when form is submitted with invalid input', async () => {
    const formSubmitHandler = vi.fn().mockRejectedValue(new Error());
    const setIsPending = vi.fn();
    const { getByRole } = render(
      <Search formSubmitHandler={formSubmitHandler} setIsPending={setIsPending} />
    );

    const searchInput = getByRole('search-input');
    fireEvent.change(searchInput, { target: { value: 'invalid input' } });

    const form = getByRole('form');
    fireEvent.submit(form);

    await waitFor(() => {
      expect(formSubmitHandler).toHaveBeenCalledTimes(1);
      expect(setIsPending).toHaveBeenCalledWith(true);
    });
  });

  test('should update input value on user input', () => {
    render(<Search formSubmitHandler={mockFormSubmitHandler} setIsPending={mockSetIsPending} />);
    const searchInput = screen.getByRole('search-input');
    fireEvent.change(searchInput, { target: { value: 'new value' } });
    expect(searchInput).toHaveValue('new value');
  });

  test('should call formSubmitHandler with the correct value when form is submitted', async () => {
    render(<Search formSubmitHandler={mockFormSubmitHandler} setIsPending={mockSetIsPending} />);
    const searchInput = screen.getByRole('search-input');
    const form = screen.getByRole('form');
    fireEvent.change(searchInput, { target: { value: 'new value' } });
    fireEvent.submit(form);
    expect(mockFormSubmitHandler).toHaveBeenCalledWith('new value');
    expect(mockFormSubmitHandler).toHaveBeenCalledTimes(1);
  });
});
