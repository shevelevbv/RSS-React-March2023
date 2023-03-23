import React from 'react';
import UserForm from '../components/UserForm';

export interface IUserDetails {
  id: number;
  textInputValue: string;
  dateInputValue: string;
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
      <div>
        <UserForm addUserCard={this.addUserCard} />
        <ul>
          {this.state.userCards.map((card) => (
            <li key={card.id}>{card.textInputValue}</li>
          ))}
        </ul>
      </div>
    );
  };
}

export default UserDetails;
