import React, { ReactElement } from 'react';

import { ROOT_ROUTES } from 'routes/routes';
import Button from 'components/core/button/button.component';

import styles from './style.module.scss';

const Home = (): ReactElement => {
  return (
    <div className={styles.home}>
      <Button label="Create a web3 investment club"
              to={ROOT_ROUTES.clubs} />
    </div>
  );
};

export default Home;
