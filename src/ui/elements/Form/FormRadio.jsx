import { object, string, func, node} from 'prop-types';
import { Field } from 'react-final-form';
import cn from 'classnames';
import styles from './FormRadio.module.scss';

function FormRadio(props) {
  const {
    input,
    placeholder,
    meta,
    label,
    onFocus,
    onBlur,
    className,
    value,
    name,
    ...rest
  } = props;

  return (
    <div className={cn(styles.formRadio, {
      [styles[className]]: !!className
    })}>
      <input
        id={name + '_' + value}
        {...rest}
        {...input}
      />
      <label
        htmlFor={name + '_' + value}
      >
        {label || value}
      </label>
    </div>
  );
}

FormRadio.propTypes = {
  input: object,
  meta: object,
  label: node,
  onBlur: func,
  onFocus: func,
  className: string,
};

const _FormRadio = ({ ...rest }) => {
  return (
    <Field component="input" type="radio" {...rest}>
      {({ meta, input }) => (
        <FormRadio {...rest} meta={meta} input={input} />
      )}
    </Field>
  )
};

export default _FormRadio;
