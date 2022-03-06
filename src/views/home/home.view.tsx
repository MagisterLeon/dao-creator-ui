
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import React, { ReactElement } from 'react';
import Typography from '@mui/material/Typography';

import { ROOT_ROUTES } from 'routes/routes';

import styles from './style.module.scss';

const Home = (): ReactElement => {
  return (
    <div className={styles.home}>
      <div className={styles.cta}>
        <Typography variant="h1">Invest together with an investment club</Typography>
        <Button
          component={Link} size="large"
          to={ROOT_ROUTES.clubsCreate}
          variant="contained"
        >
          Create a web3 investment club
        </Button>
      </div>
    </div>
  );
};

export default Home;
