import React from 'react';
import { IUserDetails } from '../pages/UserDetails';

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
        <h2>{`${this.props.userDetails.name}'s Details`}</h2>
        <p>Date of birth: {this.props.userDetails.date}</p>
        <p>Gender: {this.props.userDetails.gender}</p>
        <p>Country: {this.props.userDetails.country}</p>
        <p>Image file name: {this.props.userDetails.file}</p>
        <p>Consent to process personal data received</p>
      </div>
    );
  };
}

export default UserCard;
