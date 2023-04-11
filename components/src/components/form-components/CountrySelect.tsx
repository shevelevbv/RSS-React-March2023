import React from 'react';
import { FieldValues, UseFormRegister } from 'react-hook-form';

const countryOptions: Array<string> = [
  'Belarus',
  'Georgia',
  'Kazakhstan',
  'Kyrgyzstan',
  'Poland',
  'Russia',
  'Ukraine',
];

interface IPropsType {
  register: UseFormRegister<FieldValues>;
}
const CountrySelect: React.FC<IPropsType> = ({ register }) => (
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
      {countryOptions.map((option: string) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  </div>
);

export default CountrySelect;
