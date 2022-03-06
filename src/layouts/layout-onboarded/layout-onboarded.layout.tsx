import React, { FC } from 'react';

import Header from './header/header.component';
import styles from './style.module.scss';

const LayoutOnboarded: FC = ({ children }) => (
  <div className={styles.root}>
    <Header />
    <div>{children}</div>
  </div>
);

export default LayoutOnboarded;
