import React, { ReactElement } from 'react';

import { useWalletContext, walletConnect } from 'contexts/wallet';
import Button from 'components/core/button/button.component';

import styles from './style.module.scss';

const Header = (): ReactElement => {
  const { walletState, dispatch } = useWalletContext();
  const connectToWallet = () => {
    dispatch(walletConnect());
  };

  return (
    <header className={styles.root}>
      <div className={styles.navbar} />
      <div className={styles.panelConnect}>
        <span>wallet is {!walletState.isConnected && 'not'} connected</span>
        {!walletState.isConnected ? (
          <Button
            className={styles.button}
            dataTest="Header__Button--connect-wallet"
            label="Connect"
            onClick={connectToWallet}
            variant="cta"
          />
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
