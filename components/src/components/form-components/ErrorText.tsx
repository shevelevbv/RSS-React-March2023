import React from 'react';
import { FieldErrors } from 'react-hook-form';

interface IPropsType {
  error: FieldErrors;
  errorKey: string;
}
const FileInput = ({ error, errorKey }: IPropsType) => (
  <div>
    {error[errorKey] && <p className="form__error_text">{error[errorKey]?.message as string}</p>}
  </div>
);

export default FileInput;
