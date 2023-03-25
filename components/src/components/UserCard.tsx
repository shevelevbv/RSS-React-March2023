import React from 'react';
import { IUserDetails } from '../pages/UserDetails';
import '../styles/UserCard.scss';

interface IPropsType {
  userDetails: IUserDetails;
}
class UserCard extends React.Component<IPropsType> {
  constructor(props: IPropsType) {
    super(props);
  }
  render = () => {
    return (
      <div>
        <h2>{this.props.userDetails.name} {this.props.userDetails.lastName}</h2>
        <div>
          <img
            src={this.props.userDetails.file}
            alt={this.props.userDetails.name}
            width="100"
            height="100"
          />
        </div>
        <p>Date of birth: {this.props.userDetails.date}</p>
        <p>Gender: {this.props.userDetails.gender}</p>
        <p>Country: {this.props.userDetails.country}</p>
        <p>Consent to process personal data received</p>
      </div>
    );
  };
}

export default UserCard;
