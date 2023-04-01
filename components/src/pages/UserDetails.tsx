import React from 'react';
import UserFormHooks from '../components/UserFormHooks';
import UserCard from '../components/UserCard';
import '../styles/UserDetails.scss';

export interface IUserDetails {
  id: number;
  name: string;
  lastName: string;
  // date: string;
  // country: string;
  // gender: string;
  // file: string;
}

interface IDetailsState {
  userCards: Array<IUserDetails>;
}

class UserDetails extends React.Component {
  state: IDetailsState = {
    userCards: [],
  };

  addUserCard = (userCard: IUserDetails): void => {
    const userCards = [...this.state.userCards];
    userCard.id = userCards.length + 1;
    userCards.push(userCard);
    this.setState({
      userCards: userCards,
    });
  };
  render = (): JSX.Element => {
    return (
      <main className="main-form">
        <UserFormHooks addUserCard={this.addUserCard} />
        <ul className="user-cards">
          {this.state.userCards.map((card) => (
            <li key={card.id}>
              <UserCard userDetails={card} />
            </li>
          ))}
        </ul>
      </main>
    );
  };
}

export default UserDetails;
