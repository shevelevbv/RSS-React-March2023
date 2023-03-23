import React from 'react';
import UserForm from '../components/UserForm';

export interface IUserDetails {
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
    console.log(this);
    this.setState({
      userCards: this.state.userCards.concat(userCard),
    });
  };
  render = (): JSX.Element => {
    console.log(this.state.userCards);
    return (
      <div>
        <UserForm addUserCard={this.addUserCard} />
        <ul>
          {this.state.userCards.map((card) => (
            <li key={card.textInputValue}>{card.textInputValue}</li>
          ))}
        </ul>
      </div>
    );
  };
}

export default UserDetails;
