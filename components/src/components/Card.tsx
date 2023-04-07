import React from 'react';
import { ICard } from '../helpers/interfaces';
import '../styles/Card.scss';

interface ICardProps {
  card: ICard;
  setShowModal: (showModal: boolean) => void;
  showModal: boolean;
}

const Card: React.FC<ICardProps> = ({ card, setShowModal, showModal }) => (
  <li className="card" onClick={() => setShowModal(!showModal)}>
    <div className="card__image_container">
      <img src={card.img} alt={card.title} width="300" height="300" />
    </div>
    <ul className="card__items">
      <li className="card__item_description">By: {card.user}</li>
      <li className="card__item_description">Instagram: {card.instagram || 'none'}</li>
      <li className="card__item_description">Likes: {card.likes}</li>
    </ul>
  </li>
);
export default Card;
