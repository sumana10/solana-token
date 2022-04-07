import { PublicKey, clusterApiUrl, Connection, Keypair, LAMPORTS_PER_SOL } from '@solana/web3.js';
import {  createMint, getOrCreateAssociatedTokenAccount, mintTo, transfer } from '@solana/spl-token'; // @FIXME: replace with @solana/spl-token

export const generate = async (publicKey : any) => {
    // Connect to cluster
    const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');

    // console.log(publicKey.toString())
    const userWallet = publicKey.toString();
    // const resp = await window.solana.connect();
    // resp.publicKey.toString()
    console.log(userWallet);

    // Generate a new wallet keypair and airdrop SOL
    const fromWallet = Keypair.generate();
    const fromAirdropSignature = await connection.requestAirdrop(fromWallet.publicKey, LAMPORTS_PER_SOL);

    // Wait for airdrop confirmation
    await connection.confirmTransaction(fromAirdropSignature);
    
    // Generate a new wallet to receive newly minted token
    // const toWallet = new PublicKey("Bv53xJMPq6e5PV7m2NBvtHCVS2YNYkZmLmVvsUMNJu3T");
    const toWallet = new PublicKey(userWallet);
    
    // Create new token mint
    const mint = await createMint(connection, fromWallet, fromWallet.publicKey, null, 4);

    // Get the token account of the fromWallet address, and if it does not exist, create it
    const fromTokenAccount = await getOrCreateAssociatedTokenAccount(
        connection,
        fromWallet,
        mint,
        fromWallet.publicKey
    );

    // Get the token account of the toWallet address, and if it does not exist, create it
    const toTokenAccount = await getOrCreateAssociatedTokenAccount(connection, fromWallet, mint, toWallet);
    // console.log("Check"+toTokenAccount.address)

    // Mint 1 new token to the "fromTokenAccount" account we just created
    let signature = await mintTo(
        connection,
        fromWallet,
        mint,
        fromTokenAccount.address,
        fromWallet.publicKey,
        1000000000,
        []
    );
    // console.log("Initial mint successful");
    // console.log('mint tx:', signature);

    // Transfer the new token to the "toTokenAccount" we just created
    signature = await transfer(
        connection,
        fromWallet,
        fromTokenAccount.address,
        toTokenAccount.address,
        fromWallet.publicKey,
        1000000000,
        []
    );
    // console.log('transfer tx:', signature);
    const creatorTokenAddressString = mint.toString();
    // let creatorTokenBalance = await connection.getBalance(toTokenAccount.address);

    return {creatorTokenAddressString}
};