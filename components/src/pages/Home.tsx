import React from 'react';
import Card from '../components/Card';
import data from '../data';
import { ICard } from '../helpers/interfaces';

class Home extends React.Component {
  cards: Array<ICard> = data;
  render = (): JSX.Element => {
    return (
      <main>
        <ul className={'cards'}>
          {this.cards.map((card: ICard) => (
            <Card key={card.id} card={card} />
          ))}
        </ul>
      </main>
    );
  };
}

export default Home;
