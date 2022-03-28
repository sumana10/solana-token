import React,{FC, useCallback } from 'react'
import { createMint } from '@solana/spl-token';
import { clusterApiUrl, Connection, Keypair, LAMPORTS_PER_SOL } from '@solana/web3.js';


const NewFungibleToken: FC = () =>{

  const payer = Keypair.generate();
  const mintAuthority = Keypair.generate();
  const freezeAuthority = Keypair.generate();
  
  const connection = new Connection(
    clusterApiUrl('devnet'),
    'confirmed'
  );
  
  const onClick = useCallback(async () => {
       
    const mint = await createMint(
      connection,
      payer,
      mintAuthority.publicKey,
      freezeAuthority.publicKey,
      9 // We are using 9 to match the CLI decimal default exactly
    );
    
    console.log(mint.toBase58());
}, [connection]);

  return (
    <button onClick={onClick}>newFungibleToken</button>
  )
}
export default NewFungibleToken