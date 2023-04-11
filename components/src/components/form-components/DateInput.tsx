import React from 'react';
import { FieldValues, UseFormRegister } from 'react-hook-form';

interface IPropsType {
  register: UseFormRegister<FieldValues>;
}
const DateInput: React.FC<IPropsType> = ({ register }) => {
  const validateDate = (date: string): string | undefined => {
    const currentDate = new Date();
    const inputDate = new Date(`${date}T00:00`);
    if (inputDate > currentDate) {
      return "The date of birth can't be later than today";
    }
  };

  return (
    <div className="form__date">
      <input
        type="date"
        {...register('date', {
          required: "The date shouldn't be empty",
          validate: validateDate,
        })}
        id="date"
        className="form__input form__input_date"
        role="date-input"
      />
    </div>
  );
};

export default DateInput;
