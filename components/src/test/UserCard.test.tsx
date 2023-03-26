import React from 'react';
import { render, screen } from '@testing-library/react';
import UserCard from '../components/UserCard';
import { IUserDetails } from '../pages/UserDetails';

const mockCard: IUserDetails = {
  id: 1,
  name: 'Mary',
  lastName: 'Gregory',
  country: 'USA',
  date: '2022-10-12',
  gender: 'female',
  file: 'image.png',
};

test('renders card elements', (): void => {
  render(<UserCard userDetails={mockCard} />);
  const title = screen.getByRole('heading', { level: 2 });
  expect(title).toHaveTextContent(`${mockCard.name} ${mockCard.lastName}`);
  const userName = screen.getByAltText(mockCard.name);
  expect(userName).toBeInTheDocument();
  const date = screen.getByText(mockCard.date);
  expect(date).toBeInTheDocument();
  const gender = screen.getByText(mockCard.gender);
  expect(gender).toBeInTheDocument();
});
