import React from 'react';
import Card from '../components/Card';
import Search from '../components/Search';
import { ICard } from '../helpers/interfaces';
import data from '../data';
import '../styles/Home.scss';

const Home: React.FC = () => {
  const cards: Array<ICard> = data;
  return (
    <main className="main-home">
      <Search />
      <ul role="cards-container" className="cards">
        {cards.map((card: ICard) => (
          <Card key={card.id} card={card} />
        ))}
      </ul>
    </main>
  );
};

export default Home;
