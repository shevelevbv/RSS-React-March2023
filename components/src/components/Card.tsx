import React from 'react';
import { ICard, ISelectedCardData } from '../helpers/interfaces';
import '../styles/Card.scss';

interface ICardProps {
  card: ICard;
  setShowModal: (showModal: boolean) => void;
  setIsModalPending: (showModal: boolean) => void;
  setSelectedCard: (selectedCard: ICard) => void;
  showModal: boolean;
}

const PUBLIC_KEY = 'b-CqOgQzXCyyXwpsGptvfHmsMPX985fGfUQgFqR0l78';
const url = 'https://api.unsplash.com/photos';
const headers = new Headers();
headers.append('Authorization', `Client-ID ${PUBLIC_KEY}`);

const Card: React.FC<ICardProps> = ({
  card,
  setShowModal,
  showModal,
  setSelectedCard,
  setIsModalPending,
}) => {
  const getMoreData = async (): Promise<ICard> => {
    const response: Response = await fetch(`${url}/${card.id}`, {
      method: 'GET',
      headers: headers,
    });
    if (!response.ok) {
      throw Error('failed to fetch data from Unsplash');
    }
    const data: ISelectedCardData = await response.json();
    return {
      id: data.id,
      img: data.urls.small,
      description: data.description,
      width: data.width,
      height: data.height,
      likes: data.likes,
      user: data.user.name,
      instagram: card.instagram,
      twitter: card.twitter,
      profile_pic: card.profile_pic,
      portfolio_url: data.user.links.portfolio,
      date_created: data.created_at,
    };
  };
  const handleClick = async () => {
    try {
      setSelectedCard(await getMoreData());
      setShowModal(!showModal);
      setIsModalPending(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <li className="card" onClick={handleClick} role="card">
      <div className="card__image_container">
        <img src={card.img} alt={card.description} width="300" height="300" />
      </div>
      <ul className="card__items">
        <li className="card__item_description">By {card.user}</li>
        <li className="card__item_description">Likes: {card.likes}</li>
      </ul>
    </li>
  );
};

export default Card;
