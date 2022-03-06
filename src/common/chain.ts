// needed for WalletConnect to work with Gnosis Safe multisig wallet
export const CUSTOM_RPC = {
  137: 'https://polygon-rpc.com',
};

export interface Chain {
  id: string;
  name: string;
}

export function getChainNameById(chainId: string): string {
  if (!!Number(chainId) && chainId.length > 9) {
    return 'local';
  }
  switch (chainId) {
    case '1':
      return 'mainnet';
    case '3':
      return 'ropsten';
    case '4':
      return 'rinkeby';
    case '5':
      return 'goerli';
    case '42':
      return 'kovan';
    default:
      return `unknown`;
  }
}
