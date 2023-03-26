import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';

test('renders the Home page when the URL does not specify the path', () => {
  render(
    <MemoryRouter initialEntries={['/']}>
      <App />
    </MemoryRouter>
  );

  const homeInputElement = screen.getByRole('search-input');
  expect(homeInputElement).toBeInTheDocument();

  const homeListElement = screen.getByRole('cards-container');
  expect(homeListElement).toBeInTheDocument();

  const homeLinkElement = screen.getByRole('link', { name: 'About Us' });
  expect(homeLinkElement).toBeInTheDocument();
});

test('renders the About Us page when the path is /about', () => {
  render(
    <MemoryRouter initialEntries={['/about']}>
      <App />
    </MemoryRouter>
  );

  const headingElement = screen.getByRole('heading', { level: 1 });
  expect(headingElement).toBeInTheDocument();
});
test('renders the User Details page when the path is /user', () => {
  render(
    <MemoryRouter initialEntries={['/user']}>
      <App />
    </MemoryRouter>
  );

  const formElement = screen.getByRole('form');
  expect(formElement).toBeInTheDocument();
});

test('renders the Not Found page when URL does not match any routes', () => {
  render(
    <MemoryRouter initialEntries={['/non-existent-url']}>
      <App />
    </MemoryRouter>
  );

  const headingElement = screen.getByRole('heading', { level: 1 });
  expect(headingElement).toHaveTextContent('Oops! The page does not exist');

  const imageElement = screen.getByAltText('Not found');
  expect(imageElement).toBeInTheDocument();
  expect(imageElement).toHaveAttribute('alt');

  const link = screen.getByRole('link-home');
  fireEvent.click(link);
  expect(window.location.pathname).toBe('/');
});
