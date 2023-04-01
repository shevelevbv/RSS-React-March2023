import React, { useState } from 'react';
import { IUserDetails } from '../pages/UserDetails';
import { FieldValues, useForm } from 'react-hook-form';
import NameInput from './form-components/NameInput';
import ErrorText from './form-components/ErrorText';
import DateInput from './form-components/DateInput';
import CountrySelect from './form-components/CountrySelect';
import GenderRadioInputs from './form-components/GenderRadioInputs';
import FileInput from './form-components/FileInput';
import ConsentInput from './form-components/ConsentInput';
import {IErrors, IFormState} from '../helpers/interfaces';
import userForm from './UserForm';

interface IPropsType {
  addUserCard: (userCard: IUserDetails) => void;
}

interface IFormInput {
  name: string;
  lastName: string;
  date: string;
  country: string;
}

const UserFormHooks = (props: IPropsType): JSX.Element => {
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
    getValues,
    watch,
    reset,
  } = useForm<FieldValues>();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const consentGiven: boolean = watch('consent');
  const selectedFiles: FileList = watch('file');

  const validateNameInput = (refName: string): IErrors => {
    const errors: IErrors = {};
    let name: string = getValues(refName);
    if (!name) {
      errors[refName as keyof IErrors] = { message: "The name shouldn't be empty" };
    } else {
      name = name.trim();
      const startsWithUpperLetter: boolean = /^[A-Z]/.test(name);
      if (!startsWithUpperLetter) {
        errors[refName as keyof IErrors] = {
          message: 'The name must start with an upper-case letter',
        };
      }
      const onlyLettersInName = /^[A-Za-z]+$/.test(name);
      if (!onlyLettersInName) {
        errors[refName as keyof IErrors] = { message: 'The name must contain only Latin letters' };
      }
      const nameLength = name.length;
      if (nameLength < 3) {
        errors[refName as keyof IErrors] = { message: 'The name must be at least 3 letters long' };
      }
    }
    return errors;
  };

  const validateDateInput = (): IErrors => {
    const errors: IErrors = {};
    const date = getValues('date');
    if (!date) {
      errors.date = { message: "The date shouldn't be empty" };
    } else {
      const currentDate = new Date();
      const inputDate = new Date(`${date}T00:00`);
      if (inputDate > currentDate) {
        errors.date = { message: "The date of birth can't be later than today" };
      }
    }
    return errors;
  };

  const validateCountrySelect = (): IErrors => {
    const errors: IErrors = {};
    const nothingSelected = !getValues('country');
    if (nothingSelected) {
      errors.country = { message: 'Please choose your country' };
    }
    return errors;
  };

  const validateConsentInput = (): IErrors => {
    const errors: IErrors = {};
    if (!consentGiven) {
      errors.consent = { message: 'You should agree to the terms' };
    }
    return errors;
  };

  // // const validateGenderInput = (): IErrors => {
  // //   const errors: IErrors = {};
  // //   const nothingChecked = this.genderRadioInputs.every(
  // //     (input: React.RefObject<HTMLInputElement>): boolean => !input.current?.checked
  // //   );
  // //   if (nothingChecked) {
  // //     errors.gender = 'Please select your gender';
  // //   }
  // //   return errors;
  // // };
  // //
  const validateFileInput = (): IErrors => {
    const errors: IErrors = {};
    const noFilesChosen = !selectedFiles.length;
    if (noFilesChosen) {
      errors.file = { message: 'Please choose your file' };
    } else {
      const file = selectedFiles[0];
      const notImage = !file?.type.startsWith('image/');
      if (notImage) {
        errors.file = { message: 'The file should be an image' };
      }
    }
    return errors;
  };

  const validateData = () => {
    return {
      ...validateNameInput('name'),
      ...validateNameInput('lastName'),
      ...validateDateInput(),
      ...validateCountrySelect(),
      ...validateConsentInput(),
      // ...validateGenderInput(),
      ...validateFileInput(),
    };
  };

  const createUserCard = (): IUserDetails => {
    // const checkedInput: React.RefObject<HTMLInputElement> = this.genderRadioInputs.filter(
    //   (input: React.RefObject<HTMLInputElement>) => input.current?.checked
    // )[0];
    const imageURL: string = URL.createObjectURL(selectedFiles[0] as File);
    const inputDate = new Date(`${getValues('date')}T00:00`);
    const formattedDate = inputDate.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
    return {
      id: NaN,
      name: getValues('name'),
      lastName: getValues('lastName'),
      date: formattedDate,
      country: getValues('country'),
      // gender: checkedInput.current?.value as string,
      file: imageURL,
    };
  };

  const completeProcessingForm = (): void => {
    const userCard: IUserDetails = createUserCard();
    props.addUserCard(userCard);
    clearErrors();
    setIsSubmitted(true);
    setTimeout(() => {
      reset();
      setIsSubmitted(false);
    }, 3000);
  };
  const onSubmit = (data): void => {
    const errors: IErrors = { ...validateData() };
    const noErrors = !Object.keys(errors).length;
    if (noErrors) {
      completeProcessingForm();
    } else {
      Object.keys(errors).forEach((key: string) => {
        setError(key, errors[key]);
      });
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="form" role="form">
        <div className="form__name">
          <label className="form__label">Full name:</label>
          <div className="form__input_container form__name__input_container">
            <NameInput register={register} placeholder="First name" keyName="name" />
            <ErrorText errorMessage={errors.name?.message as string} />
          </div>
          <div className="form__input_container form__name__input_container">
            <NameInput register={register} placeholder="Last name" keyName="lastName" />
            <ErrorText errorMessage={errors.lastName?.message as string} />
          </div>
        </div>
        <div className="form__date">
          <label htmlFor="date" className="form__label">
            Date of birth:
          </label>
          <div className="form__input_container form__date__input_container">
            <DateInput register={register} />
            <ErrorText errorMessage={errors.date?.message as string} />
          </div>
        </div>
        <div className="form__country">
          <label htmlFor="country" className="form__label">
            Country:
          </label>
          <div className="form__input_container form__country__input_container">
            <CountrySelect register={register} />
            <ErrorText errorMessage={errors.country?.message as string} />
          </div>
        </div>
        {/*<div className="form__gender">*/}
        {/*  <label className="form__label">Gender:</label>*/}
        {/*  <div className="form__gender__input_container">*/}
        {/*    <GenderRadioInputs*/}
        {/*      maleRadioInput={this.maleRadioInput}*/}
        {/*      femaleRadioInput={this.femaleRadioInput}*/}
        {/*      otherRadioInput={this.otherRadioInput}*/}
        {/*    />*/}
        {/*    <ErrorText errorMessage={this.state.errors.gender} />*/}
        {/*  </div>*/}
        {/*</div>*/}
        <div className="form__file">
          <label htmlFor="file" className="form__label">
            Profile picture:
          </label>
          <div className="form__input_container form__file__input_container">
            <FileInput register={register} />
            <ErrorText errorMessage={errors.file?.message as string} />
          </div>
        </div>
        <div className="form__input_container">
          <ConsentInput register={register} />
          <ErrorText errorMessage={errors.consent?.message as string} />
        </div>
        {isSubmitted ? (
          <p className="form__saved">The data has been saved successfully</p>
        ) : (
          <input type="submit" value="Save details" role="submit" />
        )}
      </form>
    </>
  );
};

export default UserFormHooks;
