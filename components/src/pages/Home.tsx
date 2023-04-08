import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import Card from '../components/Card';
import Search from '../components/Search';
import { ICard, IUnsplashData, IUnsplashResult } from '../helpers/interfaces';
import '../styles/Home.scss';
import ModalWindow from '../components/ModalWindow';
import { createPortal } from 'react-dom';

type CardsStateHook = [Array<ICard>, Dispatch<SetStateAction<Array<ICard>>>];
type PendingStateHook = [boolean, Dispatch<SetStateAction<boolean>>];
type SelectedCardStateHook = [ICard, Dispatch<SetStateAction<ICard>>];

const PICTURES_PER_PAGE = 12;
const PUBLIC_KEY = 'b-CqOgQzXCyyXwpsGptvfHmsMPX985fGfUQgFqR0l78';
const headers = new Headers();
const url = 'https://api.unsplash.com/search/photos';
headers.append('Authorization', `Client-ID ${PUBLIC_KEY}`);

const Home: React.FC = () => {
  const [cards, setCards]: CardsStateHook = useState([] as Array<ICard>);
  const [isPending, setIsPending]: PendingStateHook = useState(true);
  const [selectedCard, setSelectedCard]: SelectedCardStateHook = useState({} as ICard);
  const [showModal, setShowModal]: PendingStateHook = useState(false);

  useEffect(() => {
    updateCards(localStorage.getItem('searchValue') || '').catch((err: Error) => {
      console.log(err);
    });
  }, []);

  const updateCards = async (searchResult: string): Promise<void> => {
    const response: Response = await fetch(
      `${url}?query=${searchResult}&per_page=${PICTURES_PER_PAGE}&orientation=portrait`,
      {
        method: 'GET',
        headers: headers,
      }
    );
    if (!response.ok) {
      throw Error('failed to fetch data from Unsplash');
    }
    const data: IUnsplashData = await response.json();
    const newCards: Array<ICard> = data.results.map((result: IUnsplashResult) => {
      return {
        id: result.id,
        img: result.urls.small,
        description: result.description,
        width: result.width,
        height: result.height,
        likes: result.likes,
        user: result.user.name,
        instagram: result.user.instagram_username,
        profile_pic: result.user.profile_image.small,
        portfolio_url: result.user.portfolio_url,
        date_created: result.created_at,
      };
    });
    setIsPending(false);
    setCards(newCards);
  };

  return (
    <main className="main-home">
      <Search formSubmitHandler={updateCards} setIsPending={setIsPending} />
      <ul role="cards-container" className="cards">
        {isPending && <p>Loading...</p>}
        {!!cards.length &&
          cards.map((card: ICard) => (
            <Card
              key={card.id}
              card={card}
              showModal={showModal}
              setShowModal={setShowModal}
              setSelectedCard={setSelectedCard}
            />
          ))}
      </ul>
      {showModal &&
        createPortal(
          <ModalWindow
            showModal={showModal}
            setShowModal={setShowModal}
            selectedCard={selectedCard}
          />,
          document.body
        )}
    </main>
  );
};

export default Home;
