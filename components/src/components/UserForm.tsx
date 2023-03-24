import React from 'react';
import { IUserDetails } from '../pages/UserDetails';
import NameInput from './form-components/NameInput';
import DateInput from './form-components/DateInput';
import CountrySelect from './form-components/CountrySelect';
import GenderRadioInputs from './form-components/GenderRadioInputs';
import FileInput from './form-components/FileInput';
import ConsentInput from './form-components/ConsentInput';
import ErrorText from "./form-components/ErrorText";

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
  file?: string;
}

class UserForm extends React.Component<IPropsType> {
  private readonly form: React.RefObject<HTMLFormElement>;
  private readonly nameInput: React.RefObject<HTMLInputElement>;
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
      errors: {},
    };
  }

  private validateNameInput = (): IErrors => {
    const errors: IErrors = {};
    let name: string | undefined = this.nameInput.current?.value;
    if (!name) {
      errors.name = "The name shouldn't be empty";
    } else {
      name = name.trim();
      const startsWithUpperLetter: boolean = /^[A-Z]/.test(name);
      if (!startsWithUpperLetter) {
        errors.name = 'The name should start with an upper-case Latin letter';
      }
      const onlyLettersInName = /^[A-Za-z]+$/.test(name);
      if (!onlyLettersInName) {
        errors.name = 'The name should contain only Latin letters';
      }
      const nameLength = name.length;
      if (nameLength < 3) {
        errors.name = 'The name should be at least 3 letters long';
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
      ...this.validateNameInput(),
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
    const gender: string = checkedInput.current?.value as string;
    return {
      id: NaN,
      name: this.nameInput.current?.value as string,
      date: this.dateInput.current?.value as string,
      country: this.countrySelect.current?.value as string,
      gender: gender,
      file: this.fileInput.current?.files?.[0].name as string,
    };
  };

  private handleSubmit = (event: React.SyntheticEvent): void => {
    event.preventDefault();
    const errors: IErrors = { ...this.validateData() };
    const noErrors = !Object.keys(errors).length;
    if (noErrors) {
      const userCard: IUserDetails = this.createUserCard();
      this.form.current?.reset();
      this.props.addUserCard(userCard);
    } else {
      this.setState({ errors: errors });
    }
  };

  render = (): JSX.Element => {
    return (
      <>
        <form onSubmit={this.handleSubmit} ref={this.form}>
          <NameInput nameInput={this.nameInput} />
          <ErrorText errorMessage={this.state.errors.name} />
          <DateInput dateInput={this.dateInput} />
          <ErrorText errorMessage={this.state.errors.date} />
          <CountrySelect countrySelect={this.countrySelect} />
          <ErrorText errorMessage={this.state.errors.country} />
          <GenderRadioInputs
            maleRadioInput={this.maleRadioInput}
            femaleRadioInput={this.femaleRadioInput}
            otherRadioInput={this.otherRadioInput}
          />
          <ErrorText errorMessage={this.state.errors.gender} />
          <FileInput fileInput={this.fileInput} />
          <ErrorText errorMessage={this.state.errors.file} />
          <ConsentInput consentInput={this.consentInput} />
          <ErrorText errorMessage={this.state.errors.consent} />
          <input type="submit" value="Submit" />
        </form>
      </>
    );
  };
}

export default UserForm;
