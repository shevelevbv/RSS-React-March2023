import React from 'react';
import { ICard } from '../helpers/interfaces';
import '../styles/Card.scss';

interface ICardProps {
  card: ICard;
}

const Card: React.FC<ICardProps> = ({ card }) => (
  <li className="card">
    <h2 className="card__title">{card.title}</h2>
    <div className="card__image_container">
      <img src={card.img} alt={card.title} width="200" height="200" />
    </div>
    <ul className="card__items">
      <li className="card__item_description">
        Season: {card.season} {card.year}
      </li>
      <li className="card__item_description">In stock: {card.stock}</li>
      <li className="card__item_description">Price (100g): ${card.price}</li>
    </ul>
  </li>
);
export default Card;
