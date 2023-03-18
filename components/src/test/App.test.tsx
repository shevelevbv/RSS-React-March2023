import { render, screen } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';

test('renders App component with correct routes', () => {
  render(
    <MemoryRouter initialEntries={['/']}>
      <App />
    </MemoryRouter>
  );

  // Check that Home component is rendered on initial route and
  // 1) it has an input bar for searching
  const homeInputElement = screen.getByRole('search-input');
  expect(homeInputElement).toBeInTheDocument();
  // 2) it has a list of items (cards)
  const homeListElement = screen.getByRole('cards-container');
  expect(homeListElement).toBeInTheDocument();
  // 3) it has a link to the About Us page
  const homeLinkElement = screen.getByRole('link', { name: 'About Us' });
  expect(homeLinkElement).toBeInTheDocument();
});
