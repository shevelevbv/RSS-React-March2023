import { fireEvent, render } from '@testing-library/react';
import Card from '../components/Card';
import React from 'react';
import { ICard } from '../helpers/interfaces';
import { vi } from 'vitest';

const mockCard: ICard = {
  id: '1',
  img: 'https://example.com/image.jpg',
  description: 'A beautiful picture',
  likes: 10,
  user: 'John Smith',
  instagram: 'johnsmith',
  twitter: 'johnsmith',
  profile_pic: 'https://example.com/profile.jpg',
  portfolio_url: 'https://example.com/portfolio',
  date_created: '2022-01-01',
  width: 300,
  height: 300,
};

const setShowModal = vi.fn();
const setSelectedCard = vi.fn();

const showModal = false;

describe('Card component', () => {
  it('renders the card image and details', () => {
    const { getByAltText, getByText } = render(
      <Card
        card={mockCard}
        setShowModal={setShowModal}
        showModal={showModal}
        setSelectedCard={setSelectedCard}
      />
    );
    expect(getByAltText(mockCard.description)).toBeInTheDocument();
    expect(getByText(`By: ${mockCard.user}`)).toBeInTheDocument();
    expect(getByText(`Instagram: ${mockCard.instagram}`)).toBeInTheDocument();
    expect(getByText(`Likes: ${mockCard.likes}`)).toBeInTheDocument();
  });

  it('calls the setShowModal and setSelectedCard functions on click', () => {
    const { getByRole } = render(
      <Card
        card={mockCard}
        setShowModal={setShowModal}
        setSelectedCard={setSelectedCard}
        showModal={showModal}
      />
    );
    fireEvent.click(getByRole('card'));
    expect(setSelectedCard).toHaveBeenCalledWith(mockCard);
    expect(setShowModal).toHaveBeenCalledWith(true);
  });
});
