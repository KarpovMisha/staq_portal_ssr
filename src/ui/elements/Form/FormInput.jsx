import { object, string, func, node } from 'prop-types';
import { Field } from 'react-final-form';
import cn from 'classnames';

import './FormInput.scss';

function FormInput(props) {
  const {
    input,
    meta: { active, error, touched },
    label,
    onChange,
    onFocus,
    onBlur,
    className,
    autoFocus = false,
    type = 'text',
    inputType = 'primary',
    name,
    showError = true,
    ...rest
  } = props;

  return (
    <div
      className={`${inputType}_input`}
    >
      <label
        htmlFor={name}
        className={cn('formInput__label', {
          'formInput__label--is-floating': active || input.value || autoFocus,
        })}
      >
        {label}
      </label>
      <div className='formInput__box'>
        <input
          id={name}
          {...rest}
          {...input}
          type={type}
          name={name}
          autoFocus={autoFocus}
          onChange={onChange}
        />
        <div className='formInput__border'></div>
      </div>
      {showError && touched && error && <div className='formInput__error'>{error}</div>}
    </div>
  );
}

FormInput.propTypes = {
  input: object,
  meta: object,
  label: node,
  onBlur: func,
  onFocus: func,
  className: string,
  type: string,
  name: string.isRequired,
};

const _FormInput = ({ name, ...rest }) => (
  <Field name={name}>
    {({ input, meta }) => {
      return (
        <FormInput
          {...rest}
          name={name}
          input={input}
          meta={meta}
          onChange={(e) => {
            input.onChange(e); //final-form's onChange
          }}
        />
      );
    }}
  </Field>
);
export default _FormInput;
