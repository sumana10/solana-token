import React, { FC, useMemo, useState } from 'react';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import {
    LedgerWalletAdapter,
    PhantomWalletAdapter,
    SlopeWalletAdapter,
    SolflareWalletAdapter,
    SolletExtensionWalletAdapter,
    SolletWalletAdapter,
    TorusWalletAdapter,
} from '@solana/wallet-adapter-wallets';
import {
    WalletModalProvider,
    WalletDisconnectButton,
    WalletMultiButton
} from '@solana/wallet-adapter-react-ui';
import { clusterApiUrl } from '@solana/web3.js';
import { SendOneLamportToRandomAddress } from './Send';
import SendForm from './SendForm';
import { generate } from './generateToken';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";





// Default styles that can be overridden by your app
require('@solana/wallet-adapter-react-ui/styles.css');

export const Wallet: FC = () => {
    // The network can be set to 'devnet', 'testnet', or 'mainnet-beta'.
    const network = WalletAdapterNetwork.Devnet;

    const [processing, setProcessing] = useState<boolean>(false);

    // You can also provide a custom RPC endpoint.
    const endpoint = useMemo(() => clusterApiUrl(network), [network]);

    // @solana/wallet-adapter-wallets includes all the adapters but supports tree shaking and lazy loading --
    // Only the wallets you configure here will be compiled into your application, and only the dependencies
    // of wallets that your users connect to will be loaded.
    const wallets = useMemo(
        () => [
            new PhantomWalletAdapter(),
            new SlopeWalletAdapter(),
            new SolflareWalletAdapter({ network }),
            new TorusWalletAdapter(),
            new LedgerWalletAdapter(),
            new SolletWalletAdapter({ network }),
            new SolletExtensionWalletAdapter({ network }),
        ],
        [network]
    );
    
    const [address, setAddress] = useState("");
    const [amount, setAmount] = useState("");
    // const mint = async (e: any) =>{
    //     setProcessing(true);
    //     let address = await generate()
    //     console.log(address);
    //     setAddress(address.creatorTokenAddressString);
    //     // setAmount(address.creatorTokenBalance.toString());
    //     // console.log(address.creatorTokenBalance.valueOf);
        
    //     if(address){
    //     setProcessing(false);
    //     return toast("Token Successfully Generated", {type:"success"})

    //     }
        
    //   }

    //   console.log(endpoint);
      

    return (
        <div className='container'>
        <div>
        <ConnectionProvider endpoint={endpoint} >
            <WalletProvider wallets={wallets} autoConnect >
                <WalletModalProvider >
                    
                    <WalletMultiButton className='box' />
                    <WalletDisconnectButton />
                    { /* Your app's components go here, nested within the context providers. */ }
                    <SendForm/>
                    {/* <div>
                   
                    <button onClick={mint} disabled={processing} className='transaction gen' >{processing ? "Generating....": "Generate New Token"}</button>
                   
                    </div> */}
                    
                    {/* <SendOneLamportToRandomAddress/> */}
                    {/* <button onClick={mintToken}>Mint</button> */}
                </WalletModalProvider>
            </WalletProvider>
            
        </ConnectionProvider>
        </div>
       
    </div>
    );
};