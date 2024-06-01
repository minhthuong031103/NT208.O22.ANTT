'use client';

import {  BinanceTestnet} from '@thirdweb-dev/chains';
import { ThirdwebProvider } from '@thirdweb-dev/react';
import { useChain } from './Chainprovider';

export const Web3Provider = ({ children }: { children: React.ReactNode }) => {
  const { selectedChain } = useChain();

  return (
    <ThirdwebProvider
      activeChain={selectedChain}
      supportedChains={[ BinanceTestnet]}
      clientId="8d30cd5b80149184f1e17f092232930a" // You can get a client id from dashboard settings
    >
      {children}
    </ThirdwebProvider>
  );
};
