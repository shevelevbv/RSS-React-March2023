import React, { useState } from 'react';
import { IUserDetails } from '../pages/UserDetails';
import { ErrorOption, FieldValues, useForm } from 'react-hook-form';
import NameInput from './form-components/NameInput';
import ErrorText from './form-components/ErrorText';
import DateInput from './form-components/DateInput';
import CountrySelect from './form-components/CountrySelect';
import GenderRadioInputs from './form-components/GenderRadioInputs';
import FileInput from './form-components/FileInput';
import ConsentInput from './form-components/ConsentInput';
import { IErrors } from '../helpers/interfaces';

interface IPropsType {
  addUserCard: (userCard: IUserDetails) => void;
}

const UserFormHooks = (props: IPropsType): JSX.Element => {
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
    getValues,
    reset,
  } = useForm<FieldValues>();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const createUserCard = (): IUserDetails => {
    const imageURL: string = URL.createObjectURL(getValues('file')[0]);
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
      gender: getValues('gender'),
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

  const onSubmit = (): void => {
    const noErrors = !Object.keys(errors).length;
    if (noErrors) {
      completeProcessingForm();
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
        <div className="form__gender">
          <label className="form__label">Gender:</label>
          <div className="form__gender__input_container">
            <GenderRadioInputs register={register} />
            <ErrorText errorMessage={errors.gender?.message as string} />
          </div>
        </div>
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
