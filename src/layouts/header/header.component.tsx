import Button from '@mui/material/Button';
import React, { ReactElement } from 'react';
import Typography from '@mui/material/Typography';

import { useWalletContext, walletConnect } from 'contexts/wallet';

import styles from './style.module.scss';

const Header = (): ReactElement => {
  const { walletState, dispatch } = useWalletContext();
  const connectToWallet = () => {
    dispatch(walletConnect());
  };

  return (
    <header className={styles.root}>
      <div className={styles.navbar}>
        <Typography variant="h2">Civitas Nostra</Typography>
      </div>
      <div className={styles.panelConnect}>
        <span>wallet is {!walletState.isConnected && 'not'} connected</span>
        {!walletState.isConnected ? (
          <Button
            className={styles.button}
            onClick={connectToWallet}
            variant="contained">
            Connect
          </Button>
        ) : (
          <>
            <span>{walletState.accounts[0]}</span>
            <span>
              {walletState.chain?.name} - id:{walletState.chain?.id}
            </span>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
