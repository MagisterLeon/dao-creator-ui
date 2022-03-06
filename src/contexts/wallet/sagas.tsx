import {
  CallEffect,
  ForkEffect,
  PutEffect,
  TakeEffect,
  call,
  put,
  take,
  takeLatest,
} from 'redux-saga/effects';
import { END, EventChannel, eventChannel } from 'redux-saga';
import { providers } from 'ethers';
import WalletConnectProvider from '@walletconnect/web3-provider';
import Web3Modal from 'web3modal';

import { AnyAction } from 'common/interfaces/action.interface';
import { CUSTOM_RPC, Chain, getChainNameById } from 'common/chain';
import { GeneratorType } from 'types';

import {
  ACCOUNT_FAIL,
  ACCOUNT_SUCCESS,
  CHAIN_FAIL,
  CHAIN_SUCCESS,
  CONNECT,
  CONNECT_FAIL,
  CONNECT_SUCCESS,
} from './actions';

// config
const providerOptions = {
  /* injected providers enabled by default (Metamask) */
  walletconnect: {
    options: {
      // required for WalletConnect
      infuraId: process.env.REACT_APP_INFURA_API,
      rpc: CUSTOM_RPC,
    },
    package: WalletConnectProvider,
  },
};

// eslint-disable-next-line @typescript-eslint/naming-convention
const IS_CACHE_PROVIDER_USED = false;
const web3Modal = new Web3Modal({
  cacheProvider: IS_CACHE_PROVIDER_USED,
  network: 'mainnet',
  providerOptions,
});
// if cacheProvider disabled then clear leftover
if (!IS_CACHE_PROVIDER_USED && web3Modal.cachedProvider) {
  web3Modal.clearCachedProvider();
}

function subscribeEvents(provider: any): EventChannel<AnyAction | END> {
  return eventChannel(emitter => {
    // Subscribe to accounts change
    provider.on('accountsChanged', (accounts: string[]) => {
      emitter({ accounts, type: ACCOUNT_SUCCESS });
    });

    // Subscribe to chainId change
    provider.on('chainChanged', (chainId: number) => {
      const _chainId = parseInt(chainId.toString(), 16).toString(); // hex to decimal
      const chain: Chain = {
        id: _chainId,
        name: getChainNameById(_chainId.toString()),
      };
      emitter({
        chain,
        type: CHAIN_SUCCESS,
      });
    });

    // Subscribe to provider connection
    provider.on('connect', (info: { chainId: number }) => {
      const _chainId = info.chainId.toString();
      const chain: Chain = {
        id: _chainId,
        name: getChainNameById(_chainId),
      };
      emitter({
        chain,
        isConnected: true,
        type: CONNECT_SUCCESS,
      });
    });

    // Subscribe to provider disconnection
    provider.on('disconnect', (error: { code: number; message: string }) => {
      if (error) {
        emitter({ error, isConnected: false, type: CONNECT_FAIL });
      } else {
        emitter(END);
      }
    });
    return () => {
      /* clear things here when exit */
    };
  });
}

function* subscribeEventsChannel(
  provider: any,
): Generator<
  CallEffect<EventChannel<AnyAction | END>> | TakeEffect | PutEffect<AnyAction>,
  void,
  AnyAction | END
> {
  const channel: any = yield call(subscribeEvents, provider);
  try {
    while (true) {
      // take(END) will cause the saga to terminate by jumping to the finally block
      const result: AnyAction | END = yield take(channel);
      yield put(result);
    }
  } finally {
    // eslint-disable-next-line no-console
    console.log('events are terminated');
    yield put({ isConnected: false, type: CONNECT_SUCCESS });
  }
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function* getChain(provider: any): Generator<PutEffect<AnyAction>, void, number> {
  try {
    const chainId: number = yield provider.request({
      method: 'net_version',
      params: [],
    });
    const _chainId = chainId.toString();
    const chain: Chain = {
      id: _chainId,
      name: getChainNameById(chainId.toString()),
    };
    yield put({ chain, type: CHAIN_SUCCESS });
  } catch (error) {
    yield put({ error, type: CHAIN_FAIL });
  }
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function* getAccounts(provider: any): Generator<PutEffect<AnyAction>, void, string[]> {
  try {
    const accounts: string[] = yield provider.request({
      method: 'eth_accounts',
      params: [],
    });
    yield put({ accounts, type: ACCOUNT_SUCCESS });
  } catch (error) {
    yield put({ error, type: ACCOUNT_FAIL });
  }
}

function* connectWallet(): Generator<CallEffect | PutEffect<AnyAction>> {
  let web3: providers.Web3Provider | undefined;
  let provider: any;
  try {
    provider = yield call(web3Modal.connect);
    web3 = new providers.Web3Provider(provider);
  } catch (error) {
    yield put({ error, type: CONNECT_FAIL });
    return;
  }
  yield put({ provider, type: CONNECT_SUCCESS, web3 });
  yield call(getAccounts, provider);
  yield call(getChain, provider);
  yield call(subscribeEventsChannel, provider);
}

export function* connectSaga(): GeneratorType<ForkEffect> {
  yield takeLatest(CONNECT, connectWallet);
}
