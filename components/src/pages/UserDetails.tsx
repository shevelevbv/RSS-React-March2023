import React, { Dispatch, SetStateAction, useState } from 'react';
import UserFormHooks from '../components/UserFormHooks';
import UserCard from '../components/UserCard';
import '../styles/UserDetails.scss';

export interface IUserDetails {
  id: number;
  name: string;
  lastName: string;
  date: string;
  country: string;
  gender: string;
  file: string;
}

type StateHookType = [
  userCards: Array<IUserDetails>,
  setUserCards: Dispatch<SetStateAction<Array<IUserDetails>>>
];

const UserDetails = (): JSX.Element => {
  const [userCards, setUserCards]: StateHookType = useState<Array<IUserDetails>>([]);

  const addUserCard = (userCard: IUserDetails): void => {
    const newUserCards = [...userCards];
    userCard.id = userCards.length + 1;
    newUserCards.push(userCard);
    setUserCards(newUserCards);
  };

  return (
    <main className="main-form">
      <UserFormHooks addUserCard={addUserCard} />
      <ul className="user-cards">
        {userCards.map((card) => (
          <li key={card.id}>
            <UserCard userDetails={card} />
          </li>
        ))}
      </ul>
    </main>
  );
};

export default UserDetails;
