import { Link } from 'react-router-dom';
import React, { FC, Fragment } from 'react';
import cx from 'classnames';

import { ButtonProps } from './types';
import styles from './style.module.scss';

const Button: FC<ButtonProps> = ({
  children,
  className,
  dataTest,
  href,
  isDisabled = false,
  isLoading,
  label,
  onClick,
  rel,
  target,
  to,
  type = 'button',
  variant = 'secondary',
}) => {
  const filteredProps = {};
  const isActionDisabled = isDisabled || isLoading;

  let Component;
  if (to) {
    Component = Link;
    Object.assign(filteredProps, { to });
  } else if (href) {
    Component = 'a';
    Object.assign(filteredProps, { href, rel, target });
  } else {
    Component = 'button';
    Object.assign(filteredProps, {
      disabled: isActionDisabled,
      type,
    });
  }

  return (
    <Component
      className={cx(
        styles.button,
        styles[`variant--${variant}`],
        isDisabled && styles.isDisabled,
        isLoading && styles.isLoading,
        className,
      )}
      data-test={dataTest}
      disabled={isDisabled || isLoading}
      onClick={isActionDisabled ? () => {} : onClick}
      {...filteredProps}
    >
      {isLoading ? (
        'Loading...'
      ) : (
        <Fragment>
          <span className={styles.label}>
            {label}
            {children}
          </span>
        </Fragment>
      )}
    </Component>
  );
};

export default Button;
