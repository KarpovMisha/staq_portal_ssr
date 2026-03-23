import { func, object, string, array, bool } from 'prop-types';
import { Field } from 'react-final-form';
import Select from 'react-select';
import './FormSelect.scss';


function FormSelect(props) {
  const {
    input,
    meta: { error, touched },
    label,
    type,
    onFocus,
    onBlur,
    onChange,
    options,
    isMulti = false,
    isSearchable = false,
    selectType = 'primary',
    instanceId,
    inputId,
    ...rest
  } = props;

  // Keep IDs deterministic for SSR hydration (react-select otherwise uses a global counter).
  const stableInstanceId = instanceId || input?.name || 'form-select';
  const stableInputId = inputId || `${stableInstanceId}-input`;

  const focusHandler = (e) => {
    input.onFocus(e);
    if (onFocus) {
      onFocus(e);
    }
  };

  const blurHandler = (e) => {
    input.onBlur(e);
    if (onBlur) {
      onBlur(e);
    }
  };

  const changeHandler = (data) => {
    input.onChange(data);
    if (onChange) {
      onChange(data);
    }
  };

  return (
    <div
      className={`${selectType}_select`}
    >
      {label && (
        <label
          pointerEvents="none"
          className='formSelect__label'
        >
          {label}
        </label>
      )}
      <div className='formSelect__wrapper'>
        <Select
          className='react-select-container'
          classNamePrefix='react-select react-select-internal'
          instanceId={stableInstanceId}
          inputId={stableInputId}
          onChange={changeHandler}
          onBlur={blurHandler}
          onFocus={focusHandler}
          value={input.value}
          options={options}
          isMulti={isMulti}
          isSearchable={isSearchable}
          {...rest}
        />
      </div>
      {touched && error && (
        <div className='formSelect__error' pointerEvents="none">
          {error}
        </div>
      )}
    </div>
  );
}

FormSelect.propTypes = {
  input: object,
  meta: object,
  label: string,
  type: string,
  onBlur: func,
  onFocus: func,
  onChange: func,
  className: string,
  options: array,
  isMulti: bool,
  isSearchable: bool,
  selectType: string,
  instanceId: string,
  inputId: string,
};

// eslint-disable-next-line
export default ({ name, ...rest }) => (
  <Field name={name}>
    {({ input, meta }) => <FormSelect {...rest} input={input} meta={meta} />}
  </Field>
);
