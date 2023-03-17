import React from 'react';
import Card from '../components/Card';
import { ICard } from '../helpers/interfaces';
import data from '../data';
import '../styles/Home.scss';

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
