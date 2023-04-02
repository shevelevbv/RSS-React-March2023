import React from 'react';
import { IUserDetails } from '../pages/UserDetails';
import '../styles/UserCard.scss';

interface IPropsType {
  userDetails: IUserDetails;
}
const UserCard = ({ userDetails }: IPropsType): JSX.Element => (
  <div className="user-card">
    <h2>
      {userDetails.name} {userDetails.lastName}
    </h2>
    <div className="user-card__image">
      <img src={userDetails.file} alt={userDetails.name} width="100" height="100" />
    </div>
    <div className="user-card__info">
      <span>Date of birth:</span>
      <span>{userDetails.date}</span>
    </div>
    <div className="user-card__info">
      <span>Gender:</span>
      <span>{userDetails.gender}</span>
    </div>
    <div className="user-card__info">
      <span>Country:</span>
      <span>{userDetails.country}</span>
    </div>
  </div>
);

export default UserCard;
