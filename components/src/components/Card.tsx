import React from 'react';
import { ICard } from '../helpers/interfaces';
import '../styles/Card.scss';

interface CardProps {
  card: ICard;
}

class Card extends React.Component<CardProps> {
  private card: ICard;
  constructor(props: CardProps) {
    super(props);
    this.card = props.card;
  }
  render = (): JSX.Element => {
    return (
      <li className={'card'}>
        <h2 className={'card__title'}>{this.card.title}</h2>
        <div className={'card__image_container'}>
          <img src={this.card.img} alt={this.card.title} width={200} height={200} />
        </div>
        <ul className={'card__items'}>
          <li className={'card__item_description'}>
            Season: {this.card.season} {this.card.year}
          </li>
          <li className={'card__item_description'}>In stock: {this.card.stock}</li>
          <li className={'card__item_description'}>Price (100g): ${this.card.price}</li>
        </ul>
      </li>
    );
  };
}

export default Card;
