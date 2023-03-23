import React, {SyntheticEvent} from 'react';
import { IUserDetails } from '../pages/UserDetails';

interface IPropsType {
  addUserCard: (userCard: IUserDetails) => void;
}

class UserForm extends React.Component<IPropsType> {
  textInput: React.RefObject<HTMLInputElement>;
  dateInput: React.RefObject<HTMLInputElement>;
  constructor(props: IPropsType) {
    super(props);
    this.textInput = React.createRef();
    this.dateInput = React.createRef();
  }

  validateData = (event: SyntheticEvent): void => {
    event.preventDefault();
    if (this.textInput.current && this.dateInput.current) {
      const userCard = {
        id: NaN,
        textInputValue: this.textInput.current.value,
        dateInputValue: this.dateInput.current.value,
      };
      this.props.addUserCard(userCard);
    }
  };
  render = () => {
    return (
      <>
        <form onSubmit={this.validateData}>
          <label>
            Username: <input type="text" ref={this.textInput} />
          </label>
          <label>
            Preferred date to deliver your order: <input type="date" ref={this.dateInput} />
          </label>
          <input type="submit" value="Submit" />
        </form>
      </>
    );
  };
}

export default UserForm;