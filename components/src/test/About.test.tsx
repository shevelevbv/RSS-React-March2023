import React from 'react';
import { render, screen } from '@testing-library/react';
import About from '../pages/About';

test('renders title', (): void => {
  render(<About />);
  expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
});
