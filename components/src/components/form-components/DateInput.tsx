import React from 'react';
import { FieldValues, UseFormRegister } from 'react-hook-form';

interface IPropsType {
  register: UseFormRegister<FieldValues>;
}
const DateInput = ({ register }: IPropsType) => (
  <div className="form__date">
    <input
      type="date"
      {...register('date')}
      id="date"
      className="form__input form__input_date"
      role="date-input"
    />
  </div>
);

export default DateInput;
