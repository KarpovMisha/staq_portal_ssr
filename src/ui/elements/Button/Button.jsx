import React from 'react';
import cn from 'classnames';
import button from './Button.module.scss';

const Button = (props) => {
  const {
    children,
    className,
    secondaryClassName,
    stringClassName,
    name,
    variant,
    disabled,
    onClick,
    tagName: TagName = 'button',
    type = 'button',
    ...rest
  } = props;
  return (
    <TagName
      className={cn(button.btn, 'button', {
        [button[`btn_${variant}`]]: !!variant,
        [button[`${className}`]]: !!className,
        [button[`${secondaryClassName}`]]: !!secondaryClassName,
        [stringClassName]: !!stringClassName,
      })}
      type={type}
      disabled={disabled}
      onClick={onClick}
      {...rest}
    >
      <span>
        {children}
        {name}
      </span>
    </TagName>
  );
};

export default Button;
