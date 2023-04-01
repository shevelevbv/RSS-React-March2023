import React from 'react';
import { FieldValues, UseFormRegister } from 'react-hook-form';

type InputProps = {
  register: UseFormRegister<FieldValues>;
  placeholder: string;
  keyName: string;
};

const NameInput = ({ register, placeholder, keyName }: InputProps) => {
  const validateName = (name: string) => {
    if (!/^[A-Za-z]+$/.test(name)) {
      return 'The name must contain only Latin letters';
    }
    if (!/^[A-Z]/.test(name)) {
      return 'The name should start with an upper-case letter';
    }
  };

  return (
    <div>
      <input
        type="text"
        {...register(keyName, {
          required: "The name shouldn't be empty",
          minLength: {
            value: 3,
            message: 'The name must be at least 3 letters long',
          },
          validate: validateName,
        })}
        placeholder={placeholder}
        className="form__input"
        spellCheck={false}
        role="name-input"
      />
    </div>
  );
};

export default NameInput;
