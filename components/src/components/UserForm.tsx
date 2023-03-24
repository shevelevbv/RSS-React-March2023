import React, {SyntheticEvent} from 'react';
import { IUserDetails } from '../pages/UserDetails';

interface IPropsType {
  addUserCard: (userCard: IUserDetails) => void;
}

interface IFormState {
  errors: IErrors;
}

interface IErrors {
  name?: string;
  date?: string;
}

class UserForm extends React.Component<IPropsType> {
  nameInput: React.RefObject<HTMLInputElement>;
  dateInput: React.RefObject<HTMLInputElement>;
  errors: IErrors;
  state: IFormState;

  constructor(props: IPropsType) {
    super(props);
    this.nameInput = React.createRef();
    this.dateInput = React.createRef();
    this.errors = {};
    this.state = {
      errors: {},
    };
  }

  private validateNameInput = () => {
    const name: string = this.nameInput.current?.value as string;
    const startsWithUpperLetter = /^[A-Z]/.test(name);
    if (!startsWithUpperLetter) {
      Object.defineProperty(this.errors, 'name', {
        value: 'The name should start with an upper-case Latin letter',
      });
    }
  };

  private validateDateInput = () => {
    if (!this.dateInput.current?.value) {
      Object.defineProperty(this.errors, 'date', {
        value: "The date shouldn't be empty",
      });
    }
  };

  private handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    this.validateNameInput();
    this.validateDateInput();
    if (!Object.keys(this.errors).length) {
      const userCard = {
        id: NaN,
        name: this.nameInput.current?.value as string,
        date: this.dateInput.current?.value as string,
      };
      this.props.addUserCard(userCard);
    }
    this.setState({ errors: this.errors });
  };

  render = () => {
    return (
      <>
        <form onSubmit={this.handleSubmit}>
          <label>
            First name: <input type="text" ref={this.nameInput} />
          </label>
          {this.state.errors.name && <p>{this.state.errors.name}</p>}
          <label>
            Preferred date to deliver your order: <input type="date" ref={this.dateInput} />
          </label>
          {this.state.errors.date && <p>{this.state.errors.date}</p>}
          <input type="submit" value="Submit" />
        </form>
      </>
    );
  };
}

export default UserForm;