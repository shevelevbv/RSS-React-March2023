import React from 'react';
import Card from '../components/Card';
import Search from '../components/Search';
import { ICard } from '../helpers/interfaces';
import data from '../data';
import '../styles/Home.scss';

class Home extends React.Component {
  cards: Array<ICard> = data;
  render = (): JSX.Element => {
    return (
      <main className="main_home">
        <Search />
        <ul role="cards-container" className="cards">
          {this.cards.map((card: ICard) => (
            <Card key={card.id} card={card} />
          ))}
        </ul>
      </main>
    );
  };
}

export default Home;
