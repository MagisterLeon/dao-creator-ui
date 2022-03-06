import React, { Context, Dispatch, createContext, useContext } from 'react';
import useSagaReducer from 'use-saga-reducer';

import { AnyAction } from 'common/interfaces/action.interface';

import { WalletState, initialState, walletReducer } from './reducer';
import { connectSaga } from './sagas';
import { walletConnect } from './actions';

export const WalletContext: Context<any> = createContext(initialState);

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function WalletProvider(props: any) {
  const [walletState, dispatch] = useSagaReducer(connectSaga, walletReducer, initialState);
  return <WalletContext.Provider value={{ dispatch, walletState }} {...props} />;
}

function useWalletContext(): {
  dispatch: Dispatch<AnyAction>;
  walletState: WalletState;
} {
  return useContext(WalletContext);
}

export { walletConnect, WalletProvider, useWalletContext };
