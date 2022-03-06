import { AnyAction } from 'common/interfaces/action.interface';
import { Chain } from 'common/chain';

import {
  ACCOUNT_FAIL,
  ACCOUNT_SUCCESS,
  CHAIN_FAIL,
  CHAIN_SUCCESS,
  CONNECT_FAIL,
  CONNECT_SUCCESS,
} from './actions';

export interface WalletState {
  accounts: string[];
  chain?: Chain;
  error: any;
  isConnected: boolean;
  name: string | null;
  provider?: any;
  web3?: any;
}

export const initialState: WalletState = {
  accounts: [],
  error: '',
  isConnected: false,
  name: null,
};

export function walletReducer(state: typeof initialState, action: AnyAction): WalletState {
  const { accounts, chain, error, provider, web3 } = action;
  switch (action.type) {
    case ACCOUNT_SUCCESS:
      return { ...state, accounts };
    case ACCOUNT_FAIL:
      return { ...state, error };
    case CHAIN_SUCCESS:
      return { ...state, chain };
    case CHAIN_FAIL:
      return { ...state, error };
    case CONNECT_SUCCESS:
      return { ...state, error: null, isConnected: true, provider, web3 };
    case CONNECT_FAIL:
      return { ...state, error, isConnected: false, name: null };
    default:
      return state;
  }
}
