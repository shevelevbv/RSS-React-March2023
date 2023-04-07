import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import Card from '../components/Card';
import Search from '../components/Search';
import { ICard, IUnsplashData, IUnsplashResult } from '../helpers/interfaces';
import '../styles/Home.scss';

type CardsStateHook = [Array<ICard>, Dispatch<SetStateAction<Array<ICard>>>];

const PICTURES_PER_PAGE = 12;
const PUBLIC_KEY = 'b-CqOgQzXCyyXwpsGptvfHmsMPX985fGfUQgFqR0l78';
const headers = new Headers();
const url = 'https://api.unsplash.com/search/photos';
headers.append('Authorization', `Client-ID ${PUBLIC_KEY}`);

const Home: React.FC = () => {
  const [cards, setCards]: CardsStateHook = useState([] as Array<ICard>);

  useEffect(() => {
    updateCards(localStorage.getItem('searchValue') || '');
  }, []);

  const updateCards = async (searchResult: string): Promise<void> => {
    const response: Response = await fetch(
      `${url}?query=${searchResult}&per_page=${PICTURES_PER_PAGE}`,
      {
        method: 'GET',
        headers: headers,
      }
    );
    const data: IUnsplashData = await response.json();
    const newCards: Array<ICard> = data.results.map((result: IUnsplashResult) => {
      return {
        id: result.id,
        img: result.urls.small,
        title: result.description,
        width: result.width,
        height: result.height,
        likes: result.likes,
        user: result.user.name,
        instagram: result.user.instagram_username,
      };
    });
    setCards(newCards);
  };

  return (
    <main className="main-home">
      <Search formSubmitHandler={updateCards} />
      <ul role="cards-container" className="cards">
        {cards.map((card: ICard) => (
          <Card key={card.id} card={card} />
        ))}
      </ul>
    </main>
  );
};

export default Home;
