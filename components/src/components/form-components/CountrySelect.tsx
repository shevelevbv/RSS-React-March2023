import React from 'react';
import { FieldValues, UseFormRegister } from 'react-hook-form';

interface IPropsType {
  register: UseFormRegister<FieldValues>
}
const CountrySelect = ({ register }: IPropsType) => (
  <div>
    <select
      id="country"
      {...register('country', {
        required: 'Please choose your country',
      })}
      className="form__input form__input_country"
      role="country-input"
    >
      <option value="">Choose the country</option>
      <option value="Belarus">Belarus</option>
      <option value="Georgia">Georgia</option>
      <option value="Kazakhstan">Kazakhstan</option>
      <option value="Kyrgyzstan">Kyrgyzstan</option>
      <option value="Poland">Poland</option>
      <option value="Russia">Russia</option>
      <option value="Ukraine">Ukraine</option>
    </select>
  </div>
);

export default CountrySelect;
