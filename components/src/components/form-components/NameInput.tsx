import React from 'react';
import { UseFormRegister } from 'react-hook-form';

interface IFormInput {
  name: string;
}

type InputProps = {
  register: UseFormRegister<string>;
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
