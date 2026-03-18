import { object, string, func, node } from 'prop-types';
import { Field } from 'react-final-form';
import cn from 'classnames';

import './FormInput.scss';

function FormNumberInput(props) {
  const {
    input,
    meta: { active, error, touched },
    label,
    onFocus,
    onBlur,
    className,
    autoFocus = false,
    inputType = 'primary',
    name,
    format,
    ...rest
  } = props;

  const digitsFromValue = (val) => (val || '').toString().replace(/\D/g, '');
  const formatDisplay = (digits) => {
    if (format === 'group') {
      return digits.replace(/(\d{4})(?=\d)/g, '$1 ')
    }
    return digits;
  };

  return (
    <div className={`${inputType}_input`}>
      <label
        htmlFor={name}
        className={cn('formInput__label', {
          'formInput__label--is-floating': active || input.value || autoFocus,
        })}
      >
        {label}
      </label>
      <div className='formInput__box'>
        {(() => {
          const digits = digitsFromValue(input.value);
          const display = formatDisplay(digits);

          const handleChange = (e) => {
            const raw = e.target.value || '';
            const onlyDigits = digitsFromValue(raw);
            input.onChange(onlyDigits);
          };

          const handlePaste = (e) => {
            const pasted = (e.clipboardData && e.clipboardData.getData('Text')) ||
              (window.clipboardData && window.clipboardData.getData('Text')) || '';
            const onlyDigits = digitsFromValue(pasted);
            if (onlyDigits.length > 0) {
              e.preventDefault();
              input.onChange(onlyDigits);
            }
          };

          const handleKeyDown = (e) => {
            // allow modifier combos (cmd/ctrl) for paste/copy/select-all
            if (e.ctrlKey || e.metaKey) return;
            const allowedKeys = ['Backspace', 'Tab', 'ArrowLeft', 'ArrowRight', 'Delete', 'Home', 'End'];
            if (allowedKeys.includes(e.key)) return;
            // allow digits only
            if (!/^[0-9]$/.test(e.key)) {
              e.preventDefault();
            }
          };

          return (
            <input
              id={name}
              {...rest}
              name={name}
              autoFocus={autoFocus}
              value={display}
              onChange={handleChange}
              onPaste={handlePaste}
              onKeyDown={handleKeyDown}
              onFocus={(e) => {
                if (input && typeof input.onFocus === 'function') input.onFocus(e);
                if (onFocus) onFocus(e);
              }}
              onBlur={(e) => {
                if (input && typeof input.onBlur === 'function') input.onBlur(e);
                if (onBlur) onBlur(e);
              }}
              inputMode='numeric'
              pattern='[0-9]*'
            />
          );
        })()}
        <div className='formInput__border' />
      </div>
      {touched && error && <div className='formInput__error'>{error}</div>}
    </div>
  );
}

FormNumberInput.propTypes = {
  input: object,
  meta: object,
  label: node,
  onBlur: func,
  onFocus: func,
  className: string,
  type: string,
  name: string.isRequired,
  format: string,
};

const _FormNumberInput = ({ name, ...rest }) => (
  <Field name={name}>
    {({ input, meta }) => (
      <FormNumberInput
        {...rest}
        name={name}
        input={input}
        meta={meta}
      />
    )}
  </Field>
);

export default _FormNumberInput;
