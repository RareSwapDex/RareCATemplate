import { Currency, Token, BNB, ETHER } from '@uniswap/sdk';

export function currencyId(currency: Currency): string {
  if (currency === ETHER || currency === BNB) return 'ETH';
  if (currency instanceof Token) return currency.address;
  throw new Error('invalid currency');
}
