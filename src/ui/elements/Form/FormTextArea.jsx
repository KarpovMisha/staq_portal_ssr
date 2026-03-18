import { object, string, func } from 'prop-types';
import { Field } from 'react-final-form';

import './FormTextArea.scss';

function FormTextArea(props) {
  const {
    input,
    meta: { error, touched },
    label,
    onChange,
    autoFocus = false,
    type = 'text',
    ...rest
  } = props;

  return (
    <div
      className='formTextArea'>
      <label
        className="formTextArea__label">
        {label}
      </label>
      <div className="formTextArea__box">
        <textarea
          {...rest}
          {...input}
          rows={3}
          type={type}
          autoFocus={autoFocus}
          onChange={onChange}
          maxLength={50000}
        />
        <div className="formTextArea__border"></div>
      </div>
      {touched && error && <div className="formTextArea__error">{error}</div>}
    </div>
  );
}

FormTextArea.propTypes = {
  input: object,
  meta: object,
  label: string,
  onBlur: func,
  onFocus: func,
  className: string,
  type: string,
  name: string.isRequired,
};

const parse = rest => value => {
  if (rest.type && rest.type === 'number') {
    return Number(value);
  }
  return value;
};


const _FormTextArea = ({ name, ...rest }) => (
  <Field name={name} parse={parse(rest)}>
    {({ input, meta }) => {
      return (
        <FormTextArea
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
export default _FormTextArea;
