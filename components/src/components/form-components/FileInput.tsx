import React from 'react';
import { FieldValues, UseFormRegister } from 'react-hook-form';

interface IPropsType {
  register: UseFormRegister<FieldValues>
}
const FileInput = ({ register }: IPropsType) => (
  <div>
    <input
      id="file"
      className="form__input form__input_file"
      type="file"
      {...register('file')}
      role="file-input"
    />
  </div>
);

export default FileInput;
