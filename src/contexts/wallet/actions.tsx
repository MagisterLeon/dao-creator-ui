// Actions
export const ACCOUNT_SUCCESS = 'ACCOUNT_SUCCESS';
export const ACCOUNT_FAIL = 'ACCOUNT_FAIL';

export const CHAIN_SUCCESS = 'CHAIN_SUCCESS';
export const CHAIN_FAIL = 'CHAIN_FAIL';

export const CONNECT = 'CONNECT';
export const CONNECT_SUCCESS = 'CONNECT_SUCCESS';
export const CONNECT_FAIL = 'CONNECT_FAIL';

// Action creators
export function walletConnect(): { type: string } {
  return { type: CONNECT };
}
