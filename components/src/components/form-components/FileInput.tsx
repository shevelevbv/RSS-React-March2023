import React from 'react';
import { FieldValues, UseFormRegister } from 'react-hook-form';

interface IPropsType {
  register: UseFormRegister<FieldValues>;
}
const FileInput = ({ register }: IPropsType) => {
  const validateFile = (files: FileList) => {
    const file = files[0];
    const notImage = !file?.type.startsWith('image/');
    if (notImage) {
      return 'The file should be an image';
    }
  };
  return (
    <div>
      <input
        id="file"
        className="form__input form__input_file"
        type="file"
        {...register('file', {
          required: 'Please choose your file',
          validate: validateFile,
        })}
        role="file-input"
      />
    </div>
  );
};

export default FileInput;
