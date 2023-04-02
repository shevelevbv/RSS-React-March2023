import React from 'react';
import { FieldValues, UseFormRegister } from 'react-hook-form';

interface IPropsType {
  register: UseFormRegister<FieldValues>;
}

const GenderRadioInputs = ({ register }: IPropsType): JSX.Element => (
  <fieldset className="form__gender__inputs">
    <div className="form__gender__input">
      <input
        type="radio"
        value="male"
        id="input-male"
        role="male-input"
        {...register('gender', {
          required: 'Please select your gender',
        })}
      />
      <label htmlFor="input-male">Male</label>
    </div>
    <div className="form__gender__input">
      <input
        type="radio"
        value="female"
        id="input-female"
        {...register('gender', {
          required: 'Please select your gender',
        })}
      />
      <label htmlFor="input-female">Female</label>
    </div>
    <div className="form__gender__input">
      <input
        type="radio"
        value="other"
        id="input-other"
        {...register('gender', {
          required: 'Please select your gender',
        })}
      />
      <label htmlFor="input-other">Other</label>
    </div>
  </fieldset>
);

export default GenderRadioInputs;
