import React, { FC } from 'react';

import Header from 'layouts/header/header.component';

import styles from './style.module.scss';

const LayoutDefault: FC = ({ children }) => (
  <div className={styles.root}>
    <Header />
    <div>{children}</div>
  </div>
);

export default LayoutDefault;
