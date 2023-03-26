import React from 'react';
import { IUserDetails } from '../pages/UserDetails';
import NameInput from './form-components/NameInput';
import DateInput from './form-components/DateInput';
import CountrySelect from './form-components/CountrySelect';
import GenderRadioInputs from './form-components/GenderRadioInputs';
import FileInput from './form-components/FileInput';
import ConsentInput from './form-components/ConsentInput';
import ErrorText from './form-components/ErrorText';

interface IPropsType {
  addUserCard: (userCard: IUserDetails) => void;
}

interface IFormState {
  submitted: boolean;
  errors: IErrors;
}

interface IErrors {
  name?: string;
  lastName?: string;
  date?: string;
  country?: string;
  consent?: string;
  gender?: string;
  file?: string;
}

class UserForm extends React.Component<IPropsType> {
  private readonly form: React.RefObject<HTMLFormElement>;
  private readonly nameInput: React.RefObject<HTMLInputElement>;
  private readonly lastNameInput: React.RefObject<HTMLInputElement>;
  private readonly dateInput: React.RefObject<HTMLInputElement>;
  private readonly consentInput: React.RefObject<HTMLInputElement>;
  private readonly fileInput: React.RefObject<HTMLInputElement>;
  private readonly maleRadioInput: React.RefObject<HTMLInputElement>;
  private readonly femaleRadioInput: React.RefObject<HTMLInputElement>;
  private readonly otherRadioInput: React.RefObject<HTMLInputElement>;
  private readonly genderRadioInputs: Array<React.RefObject<HTMLInputElement>>;
  private readonly countrySelect: React.RefObject<HTMLSelectElement>;
  state: IFormState;

  constructor(props: IPropsType) {
    super(props);
    this.form = React.createRef();
    this.nameInput = React.createRef();
    this.lastNameInput = React.createRef();
    this.dateInput = React.createRef();
    this.countrySelect = React.createRef();
    this.consentInput = React.createRef();
    this.fileInput = React.createRef();
    this.genderRadioInputs = [
      (this.maleRadioInput = React.createRef()),
      (this.femaleRadioInput = React.createRef()),
      (this.otherRadioInput = React.createRef()),
    ];
    this.state = {
      submitted: false,
      errors: {},
    };
  }

  private validateNameInput = (
    nameRefObject: React.RefObject<HTMLInputElement>,
    refName: string
  ): IErrors => {
    const errors: IErrors = {};
    let name: string | undefined = nameRefObject.current?.value;
    if (!name) {
      errors[refName as keyof IErrors] = "The name shouldn't be empty";
    } else {
      name = name.trim();
      const startsWithUpperLetter: boolean = /^[A-Z]/.test(name);
      if (!startsWithUpperLetter) {
        errors[refName as keyof IErrors] = 'The name must start with an upper-case letter';
      }
      const onlyLettersInName = /^[A-Za-z]+$/.test(name);
      if (!onlyLettersInName) {
        errors[refName as keyof IErrors] = 'The name must contain only Latin letters';
      }
      const nameLength = name.length;
      if (nameLength < 3) {
        errors[refName as keyof IErrors] = 'The name must be at least 3 letters long';
      }
    }
    return errors;
  };

  private validateDateInput = (): IErrors => {
    const errors: IErrors = {};
    const dateIsEmpty = !this.dateInput.current?.value;
    if (dateIsEmpty) {
      errors.date = "The date shouldn't be empty";
    } else {
      const dateValue = this.dateInput.current?.value as string;
      const currentDate = new Date();
      const inputDate = new Date(dateValue);
      if (inputDate > currentDate) {
        errors.date = "The date of birth can't be later than today";
      }
    }
    return errors;
  };

  private validateCountrySelect = (): IErrors => {
    const errors: IErrors = {};
    const nothingSelected = !this.countrySelect.current?.value;
    if (nothingSelected) {
      errors.country = 'Please choose your country';
    }
    return errors;
  };

  private validateConsentInput = (): IErrors => {
    const errors: IErrors = {};
    const noConsent = !this.consentInput.current?.checked;
    if (noConsent) {
      errors.consent = 'You should agree to the terms';
    }
    return errors;
  };

  private validateFileInput = (): IErrors => {
    const errors: IErrors = {};
    const noFilesChosen = !this.fileInput.current?.files?.length;
    if (noFilesChosen) {
      errors.file = 'Please choose your file';
    } else {
      const file = this.fileInput.current?.files?.[0];
      const notImage = !file?.type.startsWith('image/');
      if (notImage) {
        errors.file = 'The file should be an image';
      }
    }
    return errors;
  };

  private validateGenderInput = (): IErrors => {
    const errors: IErrors = {};
    const nothingChecked = this.genderRadioInputs.every(
      (input: React.RefObject<HTMLInputElement>): boolean => !input.current?.checked
    );
    if (nothingChecked) {
      errors.gender = 'Please select your gender';
    }
    return errors;
  };

  private validateData = () => {
    return {
      ...this.validateNameInput(this.nameInput, 'name'),
      ...this.validateNameInput(this.lastNameInput, 'lastName'),
      ...this.validateDateInput(),
      ...this.validateCountrySelect(),
      ...this.validateConsentInput(),
      ...this.validateGenderInput(),
      ...this.validateFileInput(),
    };
  };
  private createUserCard = (): IUserDetails => {
    const checkedInput: React.RefObject<HTMLInputElement> = this.genderRadioInputs.filter(
      (input: React.RefObject<HTMLInputElement>) => input.current?.checked
    )[0];
    const imageURL: string = URL.createObjectURL(this.fileInput.current?.files?.[0] as File);
    const inputDate = new Date(this.dateInput.current?.value as string);
    const formattedDate = inputDate.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
    return {
      id: NaN,
      name: this.nameInput.current?.value as string,
      lastName: this.lastNameInput.current?.value as string,
      date: formattedDate,
      country: this.countrySelect.current?.value as string,
      gender: checkedInput.current?.value as string,
      file: imageURL,
    };
  };

  private completeProcessingForm = (): void => {
    const userCard: IUserDetails = this.createUserCard();
    this.props.addUserCard(userCard);
    const state: IFormState = { ...this.state };
    state.submitted = true;
    state.errors = {};
    this.setState(state);
    setTimeout(() => {
      this.form.current?.reset();
      state.submitted = false;
      this.setState(state);
    }, 3000);
  };

  private handleSubmit = (event: React.SyntheticEvent): void => {
    event.preventDefault();
    const errors: IErrors = { ...this.validateData() };
    const noErrors = !Object.keys(errors).length;
    if (noErrors) {
      this.completeProcessingForm();
    } else {
      this.setState({ errors: errors });
    }
  };

  render = (): JSX.Element => {
    return (
      <>
        <form onSubmit={this.handleSubmit} ref={this.form} className="form">
          <div className="form__name">
            <label className="form__label">Full name:</label>
            <div className="form__input_container form__name__input_container">
              <NameInput text="First name" nameInput={this.nameInput} />
              <ErrorText errorMessage={this.state.errors.name} />
            </div>
            <div className="form__input_container form__name__input_container">
              <NameInput text="Last name" nameInput={this.lastNameInput} />
              <ErrorText errorMessage={this.state.errors.lastName} />
            </div>
          </div>
          <div className="form__date">
            <label htmlFor="date" className="form__label">
              Date of birth:
            </label>
            <div className="form__input_container form__date__input_container">
              <DateInput dateInput={this.dateInput} />
              <ErrorText errorMessage={this.state.errors.date} />
            </div>
          </div>
          <div className="form__country">
            <label htmlFor="country" className="form__label">
              Country:
            </label>
            <div className="form__input_container form__country__input_container">
              <CountrySelect countrySelect={this.countrySelect} />
              <ErrorText errorMessage={this.state.errors.country} />
            </div>
          </div>
          <div className="form__gender">
            <label className="form__label">Gender:</label>
            <div className="form__gender__input_container">
              <GenderRadioInputs
                maleRadioInput={this.maleRadioInput}
                femaleRadioInput={this.femaleRadioInput}
                otherRadioInput={this.otherRadioInput}
              />
              <ErrorText errorMessage={this.state.errors.gender} />
            </div>
          </div>
          <div className="form__file">
            <label htmlFor="file" className="form__label">
              Profile picture:
            </label>
            <div className="form__input_container form__file__input_container">
              <FileInput fileInput={this.fileInput} />
              <ErrorText errorMessage={this.state.errors.file} />
            </div>
          </div>
          <div className="form__input_container">
            <ConsentInput consentInput={this.consentInput} />
            <ErrorText errorMessage={this.state.errors.consent} />
          </div>
          {!this.state.submitted && <input type="submit" value="Save details" />}
          {this.state.submitted && (
            <p className="form__saved">The data has been saved successfully</p>
          )}
        </form>
      </>
    );
  };
}

export default UserForm;
