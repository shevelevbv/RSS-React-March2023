import { render, screen } from '@testing-library/react';
import Card from '../components/Card';
import React from 'react';
import { ICard } from '../helpers/interfaces';

const sampleCard: ICard = {
  title: 'Title',
  img: 'img.jpg',
  season: 'Summer',
  year: 2023,
  stock: 10,
  price: 10,
  country: 'USA',
  variety: 'orange',
  favorite: 'yes',
  id: 100,
};

test('renders card title', (): void => {
  render(<Card card={sampleCard} />);
  const titleElement = screen.getByText(sampleCard.title);
  expect(titleElement).toBeInTheDocument();
});

test('renders card image', (): void => {
  render(<Card card={sampleCard} />);
  const imgElement = screen.getByAltText(sampleCard.title);
  expect(imgElement).toBeInTheDocument();
  expect(imgElement).toHaveAttribute('src', sampleCard.img);
  expect(imgElement).toHaveAttribute('alt', sampleCard.title);
  expect(imgElement).toHaveAttribute('width', '200');
  expect(imgElement).toHaveAttribute('height', '200');
});

test('renders card details', (): void => {
  render(<Card card={sampleCard} />);
  const seasonYearElement = screen.getByText(`Season: ${sampleCard.season} ${sampleCard.year}`);
  expect(seasonYearElement).toBeInTheDocument();
  const stockElement = screen.getByText(`In stock: ${sampleCard.stock}`);
  expect(stockElement).toBeInTheDocument();
  const priceElement = screen.getByText(`Price (100g): $${sampleCard.price}`);
  expect(priceElement).toBeInTheDocument();
});
