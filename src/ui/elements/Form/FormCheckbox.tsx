import React from 'react';
import cn from 'classnames';
import { Field, FieldRenderProps } from 'react-final-form';
import styles from './FormCheckbox.module.scss';

export type FormCheckboxOnChange = (
  checked: boolean,
  event: React.ChangeEvent<HTMLInputElement>
) => void;

export type FormCheckboxProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'type' | 'onChange' | 'checked' | 'value'
> & {
  name: string;
  label?: React.ReactNode;
  className?: string;
  value?: string;
  onChange?: FormCheckboxOnChange;
};

type InnerProps = FormCheckboxProps & {
  input: FieldRenderProps<boolean, HTMLInputElement>['input'];
  meta: FieldRenderProps<boolean, HTMLInputElement>['meta'];
};

function InnerFormCheckbox({
  input,
  meta,
  label,
  className,
  value,
  name,
  onChange,
  ...rest
}: InnerProps) {
  const id = `${name}_${value ?? 'checkbox'}`;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    input.onChange(e);
    onChange?.(e.target.checked, e);
  };

  return (
    <div
      className={cn(styles.formCheckbox, {
        [styles[className ?? '']]: !!className,
      })}
    >
      <input
        id={id}
        name={input.name}
        type="checkbox"
        checked={!!input.checked}
        onChange={handleChange}
        onBlur={input.onBlur}
        onFocus={input.onFocus}
        value={value}
        {...rest}
      />

      <label htmlFor={id}>{label ?? value}</label>
    </div>
  );
}

export default function FormCheckbox(props: FormCheckboxProps) {
  const { name } = props;

  return (
    <Field<boolean> name={name} type="checkbox" value={(props as any).value}>
      {({ input, meta }) => (
        <InnerFormCheckbox {...props} input={input} meta={meta} />
      )}
    </Field>
  );
}
