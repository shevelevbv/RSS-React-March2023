import React from 'react';
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
  country?: string;
  consent?: string;
  gender?: string;
}

class UserForm extends React.Component<IPropsType> {
  private readonly nameInput: React.RefObject<HTMLInputElement>;
  private readonly dateInput: React.RefObject<HTMLInputElement>;
  private readonly consentInput: React.RefObject<HTMLInputElement>;
  private readonly maleRadioInput: React.RefObject<HTMLInputElement>;
  private readonly femaleRadioInput: React.RefObject<HTMLInputElement>;
  private readonly otherRadioInput: React.RefObject<HTMLInputElement>;
  private readonly genderRadioInputs: Array<React.RefObject<HTMLInputElement>>;

  private readonly countrySelect: React.RefObject<HTMLSelectElement>;
  private errors: IErrors;
  state: IFormState;

  constructor(props: IPropsType) {
    super(props);
    this.nameInput = React.createRef();
    this.dateInput = React.createRef();
    this.countrySelect = React.createRef();
    this.consentInput = React.createRef();
    this.genderRadioInputs = [
      (this.maleRadioInput = React.createRef()),
      (this.femaleRadioInput = React.createRef()),
      (this.otherRadioInput = React.createRef()),
    ];
    this.errors = {};
    this.state = {
      errors: {},
    };
  }

  private validateNameInput = (): void => {
    const name: string = this.nameInput.current?.value as string;
    const startsWithUpperLetter = /^[A-Z]/.test(name);
    if (!startsWithUpperLetter) {
      this.errors.name = 'The name should start with an upper-case Latin letter';
    }
  };

  private validateDateInput = (): void => {
    if (!this.dateInput.current?.value) {
      this.errors.date = "The date shouldn't be empty";
    }
  };

  private validateCountrySelect = (): void => {
    if (!this.countrySelect.current?.value) {
      this.errors.country = 'Please choose your country';
    }
  };

  private validateConsentInput = (): void => {
    if (!this.consentInput.current?.checked) {
      this.errors.consent = 'You should agree to the terms';
    }
  };

  private validateGenderInput = (): void => {
    const nothingChecked = this.genderRadioInputs.every((input) => !input.current?.checked);
    if (nothingChecked) {
      this.errors.gender = 'Please select your gender';
    }
  };

  private handleSubmit = (event: React.SyntheticEvent): void => {
    event.preventDefault();
    this.validateNameInput();
    this.validateDateInput();
    this.validateCountrySelect();
    this.validateConsentInput();
    this.validateGenderInput();
    if (!Object.keys(this.errors).length) {
      const gender: string = this.genderRadioInputs
        .filter((input) => input.current?.checked)
        .join('');
      const userCard = {
        id: NaN,
        name: this.nameInput.current?.value as string,
        date: this.dateInput.current?.value as string,
        country: this.countrySelect.current?.value as string,
        consent: this.consentInput.current?.checked as boolean,
        gender: gender,
      };
      this.props.addUserCard(userCard);
    } else {
      this.setState({ errors: this.errors }, () => {
        this.errors = {};
      });
    }
  };

  render = (): JSX.Element => {
    return (
      <>
        <form onSubmit={this.handleSubmit}>
          <label>
            First name: <input type="text" ref={this.nameInput} />
          </label>
          {this.state.errors.name && <p>{this.state.errors.name}</p>}
          <label>
            Date of birth: <input type="date" ref={this.dateInput} />
          </label>
          {this.state.errors.date && <p>{this.state.errors.date}</p>}
          <label htmlFor="country-select">Select your country:</label>
          <select id="country-select" ref={this.countrySelect}>
            <option value="">Please choose an option</option>
            <option value="Belarus">Belarus</option>
            <option value="Georgia">Georgia</option>
            <option value="Kazakhstan">Kazakhstan</option>
            <option value="Russia">Russia</option>
            <option value="Ukraine">Ukraine</option>
          </select>
          {this.state.errors.country && <p>{this.state.errors.country}</p>}
          <input type="checkbox" id="consent" ref={this.consentInput} />
          <label htmlFor="consent">I hereby consent to the processing of my personal data</label>
          {this.state.errors.consent && <p>{this.state.errors.consent}</p>}
          <fieldset>
            <legend>Select your gender: </legend>
            <label>
              <input type="radio" name="gender" value="male" ref={this.maleRadioInput} />
              Male
            </label>
            <label>
              <input type="radio" name="gender" value="female" ref={this.femaleRadioInput} />
              Female
            </label>
            <label>
              <input type="radio" name="gender" value="other" ref={this.otherRadioInput} />
              Other
            </label>
          </fieldset>
          {this.state.errors.gender && <p>{this.state.errors.gender}</p>}
          <input type="submit" value="Submit" />
        </form>
      </>
    );
  };
}

export default UserForm;
