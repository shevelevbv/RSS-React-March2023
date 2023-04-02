import React from 'react';
import { FieldValues, UseFormRegister } from 'react-hook-form';

type InputProps = {
  register: UseFormRegister<FieldValues>;
  placeholder: string;
  keyName: string;
};

const NameInput = ({ register, placeholder, keyName }: InputProps): JSX.Element => {
  const validateName = (name: string): string | undefined => {
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
        autoComplete="off"
        role="name-input"
      />
    </div>
  );
};

export default NameInput;
