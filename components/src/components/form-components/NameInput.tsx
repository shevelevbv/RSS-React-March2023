import React from 'react';
import { FieldValues, UseFormRegister } from 'react-hook-form';

type InputProps = {
  register: UseFormRegister<FieldValues>;
  placeholder: string;
  keyName: string;
};

const NameInput = ({ register, placeholder, keyName }: InputProps) => (
  <div>
    <input
      type="text"
      {...register(keyName)}
      placeholder={placeholder}
      className="form__input"
      spellCheck={false}
      role="name-input"
    />
  </div>
);

export default NameInput;
