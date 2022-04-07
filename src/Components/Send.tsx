import { WalletNotConnectedError } from '@solana/wallet-adapter-base';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { PublicKey, Keypair, SystemProgram, Transaction } from '@solana/web3.js';
import React, { FC, useCallback, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";


export const SendOneLamportToRandomAddress: FC = () => {
    const { connection } = useConnection();
    const { publicKey, sendTransaction } = useWallet();
    const [result, setResult] = useState("");
    const onClick = useCallback(async () => {
       setResult("")
        if (!publicKey) throw new WalletNotConnectedError();
        const destPubkey = new PublicKey("7mLbWTShcDFdb2khQfppBmp8628nP8NLogmDA2Qv3xkm");
        const transaction = new Transaction().add(
            SystemProgram.transfer({
                fromPubkey: publicKey,
                toPubkey: destPubkey,
                lamports: 1,
            })
        );
        //    let hash =  transaction.recentBlockhash
        const signature = await sendTransaction(transaction, connection);

        let result = await connection.confirmTransaction(signature, 'processed');
        
        //  console.log(hash);
        // setResult(result)
        if(result)
        setResult("Token Successfully Send")
        
    }, [publicKey, sendTransaction, connection]);
    
    return (
        <>
        {/* <ToastContainer position="top-right"/> */}
        
        <button onClick={onClick} disabled={!publicKey} className='sendbtn'>
         "Send 1 lamport to a random address!"
        </button>
        <p className='purple'>{result}</p>
        
        </>
    );
};