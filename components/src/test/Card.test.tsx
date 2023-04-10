import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import Card from '../components/Card';
import React from 'react';
import { ICard, ISelectedCardData } from '../helpers/interfaces';
import { vi } from 'vitest';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

const url = 'https://api.unsplash.com/photos/:id';
const mockAPIResponseObject: ISelectedCardData = {
  id: 'Dwu85P9SOIk',
  created_at: '2016-05-03T11:00:28-04:00',
  updated_at: '2016-07-10T11:00:01-05:00',
  width: 2448,
  height: 3264,
  color: '#6E633A',
  blur_hash: 'LFC$yHwc8^$yIAS$%M%00KxukYIp',
  downloads: 1345,
  likes: 24,
  liked_by_user: false,
  public_domain: false,
  description: 'A man drinking a coffee.',
  exif: {
    make: 'Canon',
    model: 'Canon EOS 40D',
    name: 'Canon, EOS 40D',
    exposure_time: '0.011111111111111112',
    aperture: '4.970854',
    focal_length: '37',
    iso: 100,
  },
  location: {
    city: 'Montreal',
    country: 'Canada',
    position: {
      latitude: 45.473298,
      longitude: -73.638488,
    },
  },
  tags: [{ title: 'man' }, { title: 'drinking' }, { title: 'coffee' }],
  current_user_collections: [
    {
      id: 206,
      title: 'Makers: Cat and Ben',
      published_at: '2016-01-12T18:16:09-05:00',
      last_collected_at: '2016-06-02T13:10:03-04:00',
      updated_at: '2016-07-10T11:00:01-05:00',
      cover_photo: null,
      user: null,
    },
  ],
  urls: {
    raw: 'https://images.unsplash.com/photo-1417325384643-aac51acc9e5d',
    full: 'https://images.unsplash.com/photo-1417325384643-aac51acc9e5d?q=75&fm=jpg',
    regular:
      'https://images.unsplash.com/photo-1417325384643-aac51acc9e5d?q=75&fm=jpg&w=1080&fit=max',
    small: 'https://images.unsplash.com/photo-1417325384643-aac51acc9e5d?q=75&fm=jpg&w=400&fit=max',
    thumb: 'https://images.unsplash.com/photo-1417325384643-aac51acc9e5d?q=75&fm=jpg&w=200&fit=max',
  },
  links: {
    self: 'https://api.unsplash.com/photos/Dwu85P9SOIk',
    html: 'https://unsplash.com/photos/Dwu85P9SOIk',
    download: 'https://unsplash.com/photos/Dwu85P9SOIk/download',
    download_location: 'https://api.unsplash.com/photos/Dwu85P9SOIk/download',
  },
  user: {
    id: 'QPxL2MGqfrw',
    updated_at: '2016-07-10T11:00:01-05:00',
    username: 'exampleuser',
    name: 'Joe Example',
    portfolio_url: 'https://example.com/',
    bio: 'Just an everyday Joe',
    location: 'Montreal',
    total_likes: 5,
    total_photos: 10,
    total_collections: 13,
    links: {
      self: 'https://api.unsplash.com/users/exampleuser',
      html: 'https://unsplash.com/exampleuser',
      photos: 'https://api.unsplash.com/users/exampleuser/photos',
      likes: 'https://api.unsplash.com/users/exampleuser/likes',
      portfolio: 'https://api.unsplash.com/users/exampleuser/portfolio',
    },
  },
};

const mockCard: ICard = {
  id: mockAPIResponseObject.id,
  img: mockAPIResponseObject.urls.regular,
  description: mockAPIResponseObject.description,
  likes: mockAPIResponseObject.likes,
  user: mockAPIResponseObject.user.name,
  instagram: 'johnsmith',
  twitter: 'johnsmith',
  profile_pic: 'https://example.com/profile.jpg',
  portfolio_url: mockAPIResponseObject.user.portfolio_url,
  date_created: mockAPIResponseObject.created_at,
  width: mockAPIResponseObject.width,
  height: mockAPIResponseObject.height,
};

const server = setupServer(
  rest.get(url, (req, res, ctx) => {
    return res(ctx.json(mockAPIResponseObject));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('Card', () => {
  it('renders the card correctly', () => {
    render(
      <Card card={mockCard} setShowModal={vi.fn()} showModal={false} setSelectedCard={vi.fn()} />
    );
    expect(screen.getByAltText(mockCard.description)).toBeInTheDocument();
    expect(screen.getByText(`By ${mockCard.user}`)).toBeInTheDocument();
    expect(screen.getByText(`Likes: ${mockCard.likes}`)).toBeInTheDocument();
  });

  it('displays the selected card data in a modal when clicked', async () => {
    const setShowModal = vi.fn();
    const setSelectedCard = vi.fn();
    render(
      <Card
        card={mockCard}
        setShowModal={setShowModal}
        showModal={false}
        setSelectedCard={setSelectedCard}
      />
    );
    fireEvent.click(screen.getByRole('card'));

    await waitFor(() => {
      expect(setShowModal).toHaveBeenCalledWith(true);
    });
  });

  it('shows an error message when failed to fetch data from Unsplash', async () => {
    server.use(
      rest.get('https://api.unsplash.com/photos/:id', (req, res, ctx) => {
        return res(ctx.status(404));
      })
    );
    const setShowModal = vi.fn();
    const setSelectedCard = vi.fn();
    render(
      <Card
        card={mockCard}
        setShowModal={setShowModal}
        showModal={false}
        setSelectedCard={setSelectedCard}
      />
    );
    fireEvent.click(screen.getByRole('card'));

    await waitFor(() => {
      expect(setSelectedCard).not.toHaveBeenCalled();
      expect(setShowModal).not.toHaveBeenCalled();
    });
  });
});
