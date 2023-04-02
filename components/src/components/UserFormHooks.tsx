import React from 'react';
import { IUserDetails } from '../pages/UserDetails';
import { FieldValues, useForm } from 'react-hook-form';
import NameInput from './form-components/NameInput';
import ErrorText from './form-components/ErrorText';
import DateInput from './form-components/DateInput';
import CountrySelect from './form-components/CountrySelect';
import GenderRadioInputs from './form-components/GenderRadioInputs';
import FileInput from './form-components/FileInput';
import ConsentInput from './form-components/ConsentInput';

interface IPropsType {
  addUserCard: (userCard: IUserDetails) => void;
}

const UserFormHooks = ({ addUserCard }: IPropsType): JSX.Element => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitSuccessful },
    getValues,
    reset,
  } = useForm<FieldValues>({ mode: 'onSubmit', reValidateMode: 'onSubmit' });

  const createUserCard = (): IUserDetails => {
    const imageURL: string = URL.createObjectURL(getValues('file')[0]);
    const inputDate: Date = new Date(`${getValues('date')}T00:00`);
    const formattedDate: string = inputDate.toLocaleDateString('en-US', {
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
    addUserCard(userCard);
    setTimeout(() => {
      reset();
    }, 3000);
  };

  const onSubmit = (): void => {
    if (isValid) {
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
            <ErrorText error={errors} errorKey="name" />
          </div>
          <div className="form__input_container form__name__input_container">
            <NameInput register={register} placeholder="Last name" keyName="lastName" />
            <ErrorText error={errors} errorKey="lastName" />
          </div>
        </div>
        <div className="form__date">
          <label htmlFor="date" className="form__label">
            Date of birth:
          </label>
          <div className="form__input_container form__date__input_container">
            <DateInput register={register} />
            <ErrorText error={errors} errorKey="date" />
          </div>
        </div>
        <div className="form__country">
          <label htmlFor="country" className="form__label">
            Country:
          </label>
          <div className="form__input_container form__country__input_container">
            <CountrySelect register={register} />
            <ErrorText error={errors} errorKey="country" />
          </div>
        </div>
        <div className="form__gender">
          <label className="form__label">Gender:</label>
          <div className="form__gender__input_container">
            <GenderRadioInputs register={register} />
            <ErrorText error={errors} errorKey="gender" />
          </div>
        </div>
        <div className="form__file">
          <label htmlFor="file" className="form__label">
            Profile picture:
          </label>
          <div className="form__input_container form__file__input_container">
            <FileInput register={register} />
            <ErrorText error={errors} errorKey="file" />
          </div>
        </div>
        <div className="form__input_container">
          <ConsentInput register={register} />
          <ErrorText error={errors} errorKey="consent" />
        </div>
        {isSubmitSuccessful ? (
          <p className="form__saved">The data has been saved successfully</p>
        ) : (
          <input type="submit" value="Save details" role="submit" />
        )}
      </form>
    </>
  );
};

export default UserFormHooks;
