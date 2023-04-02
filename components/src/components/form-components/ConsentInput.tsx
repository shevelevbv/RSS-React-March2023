import React from 'react';
import { FieldValues, UseFormRegister } from 'react-hook-form';

interface IPropsType {
  register: UseFormRegister<FieldValues>;
}
const ConsentInput = ({ register }: IPropsType): JSX.Element => (
  <div>
    <input
      type="checkbox"
      id="consent"
      className="form__consent__input"
      {...register('consent', {
        required: 'You should agree to the terms',
      })}
      role="checkbox-input"
    />
    <label htmlFor="consent">I hereby consent to the processing of my personal data</label>
  </div>
);

export default ConsentInput;
