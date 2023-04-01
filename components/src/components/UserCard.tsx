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
      <div className="user-card">
        <h2>
          {this.props.userDetails.name} {this.props.userDetails.lastName}
        </h2>
        <div className="user-card__image">
          <img
            src={this.props.userDetails.file}
            alt={this.props.userDetails.name}
            width="100"
            height="100"
          />
        </div>
        <div className="user-card__info">
          <span>Date of birth:</span>
          <span>{this.props.userDetails.date}</span>
        </div>
        <div className="user-card__info">
          <span>Gender:</span>
          <span>{this.props.userDetails.gender}</span>
        </div>
        <div className="user-card__info">
          <span>Country:</span>
          <span>{this.props.userDetails.country}</span>
        </div>
      </div>
    );
  };
}

export default UserCard;
