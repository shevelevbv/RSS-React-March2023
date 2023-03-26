import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import UserForm from '../components/UserForm';
import { IUserDetails } from '../pages/UserDetails';

const cards: Array<IUserDetails> = [];

const mockCard: IUserDetails = {
  id: 1,
  name: 'Mary',
  lastName: 'Gregory',
  country: 'Georgia',
  date: '2022-10-12',
  gender: 'female',
  file: 'test-image.jpg',
};

const addUserCard = (): void => {
  cards.push(mockCard);
};

test('renders the form', (): void => {
  const { container } = render(<UserForm addUserCard={addUserCard} />);
  expect(container.querySelector('form')).toBeInTheDocument();
});

test('name input behaves properly', () => {
  render(<UserForm addUserCard={addUserCard} />);
  const nameInputs = screen.getAllByRole('name-input');
  expect(nameInputs).toHaveLength(2);

  const nameInput = nameInputs[0];
  const lastNameInput = nameInputs[1];

  fireEvent.change(nameInput, { target: { value: '' } });
  fireEvent.change(lastNameInput, { target: { value: 'john' } });
  fireEvent.submit(screen.getByRole('submit'));

  expect(screen.getByText("The name shouldn't be empty")).toBeInTheDocument();
  expect(screen.getByText('The name must start with an upper-case letter')).toBeInTheDocument();

  fireEvent.change(nameInput, { target: { value: '1john' } });
  fireEvent.change(lastNameInput, { target: { value: 'Da' } });
  fireEvent.submit(screen.getByRole('submit'));

  expect(screen.getByText('The name must contain only Latin letters')).toBeInTheDocument();
  expect(screen.getByText('The name must be at least 3 letters long')).toBeInTheDocument();
  expect(cards).toHaveLength(0);
});

test('date input behaves properly', () => {
  render(<UserForm addUserCard={addUserCard} />);
  const dateInput = screen.getByRole('date-input');
  expect(dateInput).toBeInTheDocument();

  fireEvent.submit(screen.getByRole('submit'));
  expect(screen.getByText("The date shouldn't be empty")).toBeInTheDocument();
  expect(cards).toHaveLength(0);

  fireEvent.change(dateInput, { target: { value: '2024-10-12' } });
  fireEvent.submit(screen.getByRole('submit'));
  expect(screen.getByText("The date of birth can't be later than today")).toBeInTheDocument();
  expect(cards).toHaveLength(0);
});

test('country input behaves properly', () => {
  render(<UserForm addUserCard={addUserCard} />);
  const countryInput = screen.getByRole('country-input');
  expect(countryInput).toBeInTheDocument();

  fireEvent.submit(screen.getByRole('submit'));
  expect(screen.getByText('Please choose your country')).toBeInTheDocument();
  expect(cards).toHaveLength(0);
});

test('gender inputs behave properly', () => {
  render(<UserForm addUserCard={addUserCard} />);
  expect(screen.getByLabelText('Male')).toBeInTheDocument();
  expect(screen.getByLabelText('Female')).toBeInTheDocument();
  expect(screen.getByLabelText('Other')).toBeInTheDocument();

  fireEvent.submit(screen.getByRole('submit'));
  expect(screen.getByText('Please select your gender')).toBeInTheDocument();
  expect(cards).toHaveLength(0);
});

test('file input behaves properly', () => {
  render(<UserForm addUserCard={addUserCard} />);
  const fileInput: HTMLInputElement = screen.getByRole('file-input');
  expect(fileInput).toBeInTheDocument();
  expect(fileInput).toHaveAttribute('type', 'file');

  fireEvent.submit(screen.getByRole('submit'));
  expect(screen.getByText('Please choose your file')).toBeInTheDocument();
  expect(cards).toHaveLength(0);

  let testFile = new File(['(⌐□_□)'], mockCard.file, { type: 'text/plain' });

  fireEvent.change(fileInput, {
    target: { files: [testFile] },
  });
  fireEvent.submit(screen.getByRole('submit'));
  expect(screen.getByText('The file should be an image')).toBeInTheDocument();

  testFile = new File(['(⌐□_□)'], mockCard.file, { type: 'image/jpeg' });

  fireEvent.change(fileInput, {
    target: { files: [testFile] },
  });

  expect(fileInput.files?.[0]).toBe(testFile);
  expect(fileInput.files?.[0].type).toMatch(/^image\//);
});

test('consent input behaves properly', () => {
  render(<UserForm addUserCard={addUserCard} />);
  const checkboxInput = screen.getByRole('checkbox-input');
  expect(checkboxInput).toBeInTheDocument();

  fireEvent.submit(screen.getByRole('submit'));
  expect(screen.getByText('You should agree to the terms')).toBeInTheDocument();
  expect(cards).toHaveLength(0);
});
