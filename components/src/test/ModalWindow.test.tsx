import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ModalWindow from '../components/ModalWindow';
import { ICard } from '../helpers/interfaces';

const mockCard: ICard = {
  id: '1',
  portfolio_url: 'https://example.com/portfolio',
  img: 'test-image.jpg',
  description: 'Test description',
  date_created: '2022-04-08T20:00:00Z',
  likes: 10,
  user: 'Test User',
  profile_pic: 'test-profile-pic.jpg',
  instagram: 'test_instagram',
  twitter: 'test_twitter',
  width: 300,
  height: 300,
};

describe('ModalWindow', () => {
  it('renders the ModalWindow component with default props', () => {
    render(<ModalWindow showModal={false} setShowModal={() => {}} selectedCard={mockCard} />);
    expect(screen.getByRole('section')).toBeInTheDocument();
  });

  it('renders the image with correct alt text', () => {
    render(<ModalWindow showModal={false} setShowModal={() => {}} selectedCard={mockCard} />);
    const image = screen.getByAltText('Test description');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'test-image.jpg');
  });

  it('renders the description with default text if none is provided', () => {
    render(<ModalWindow showModal={false} setShowModal={() => {}} selectedCard={{ ...mockCard, description: '' }} />);
    expect(screen.getByText('No description for this card')).toBeInTheDocument();
  });

  it('renders the date created in the correct format', () => {
    render(<ModalWindow showModal={false} setShowModal={() => {}} selectedCard={mockCard} />);
    expect(screen.getByText('April 8, 2022')).toBeInTheDocument();
  });

  it('renders the number of likes', () => {
    render(<ModalWindow showModal={false} setShowModal={() => {}} selectedCard={mockCard} />);
    expect(screen.getByText('10')).toBeInTheDocument();
  });

  it('renders the user details', () => {
    render(<ModalWindow showModal={false} setShowModal={() => {}} selectedCard={mockCard} />);
    expect(screen.getByText('Test User')).toBeInTheDocument();
    expect(screen.getByAltText('Test User')).toBeInTheDocument();
    expect(screen.getByAltText('Instagram logo')).toBeInTheDocument();
    expect(screen.getByAltText('Twitter logo')).toBeInTheDocument();
    expect(screen.getByText('view portfolio')).toBeInTheDocument();
  });

  it('renders the portfolio url if it exists', () => {
    render(
      <ModalWindow
        showModal={false}
        setShowModal={() => {}}
        selectedCard={{ ...mockCard, portfolio_url: 'https://test.com' }}
      />
    );
    expect(screen.getByRole('portfolio-link')).toHaveAttribute('href', 'https://test.com');
  });

  it('calls setShowModal when the close button is clicked', () => {
    const setShowModalMock = vi.fn();
    render(
      <ModalWindow showModal={true} setShowModal={setShowModalMock} selectedCard={mockCard} />
    );
    fireEvent.click(screen.getByRole('button-close'));
    expect(setShowModalMock).toHaveBeenCalledTimes(1);
  });
});
