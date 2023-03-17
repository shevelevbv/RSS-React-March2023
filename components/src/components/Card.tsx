import React from 'react';
import { ICard } from '../helpers/interfaces';

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
        <div className={'card__image_container'}>
          <img src={this.card.img} alt={this.card.title} width={200} height={200} />
        </div>
      </li>
    );
  };
}

export default Card;
