// import './App.css';
import { WalletNotConnectedError } from '@solana/wallet-adapter-base';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { LAMPORTS_PER_SOL, PublicKey, Keypair, SystemProgram, Transaction } from '@solana/web3.js';
import React, { FC, useCallback, useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { generate } from './generateToken';

const SendForm = () =>{

    const { connection } = useConnection();
    const { publicKey, sendTransaction } = useWallet();
    const [result, setResult] = useState("");
    const [address, setAddress] = useState("")
    const [amount, setAmount] = useState("");
    const [userBalance, setUserBalance] = useState<any>();

    useEffect(() => {
      getSolBalance();
    }, [publicKey]);

    const handleSubmit = async(e:any) => {
      e.preventDefault();
      setResult("")
      // console.log(address);
      // console.log(amount);
      
      
      // const destAddr = e.currentTarget[1].value;
      // const amount = e.currentTarget[0].value;
      // console.log(destAddr);
      // console.log(amount);
      
       if (!publicKey) throw new WalletNotConnectedError();
       const destPubkey = new PublicKey(address);
        console.log(destPubkey);
       
       const transaction = new Transaction().add(
           SystemProgram.transfer({
               fromPubkey: publicKey,
               toPubkey: destPubkey,
               lamports: LAMPORTS_PER_SOL * Number(amount),
           })
       );
      //  console.log(transaction);
       
       //    let hash =  transaction.recentBlockhash
       const signature = await sendTransaction(transaction, connection);

       let result = await connection.confirmTransaction(signature, 'processed');
       
       //  console.log(hash);
       // setResult(result)
       setAddress("");
       setAmount("");
       getSolBalance();
       if(result)
      //  setResult("Token Successfully Send")
       return toast("Transaction Completed", {type:"success"})
       
       
   };

   async function getSolBalance(){

    if(publicKey){

      const pubKey = new PublicKey(publicKey);
      const bal = await connection.getBalance(pubKey);
      const balInSol = bal / LAMPORTS_PER_SOL;
      console.log("hello" + balInSol);
      setUserBalance(balInSol);
      
    }
   }
   const [addressG, setAddressG] = useState("");
    const [amountG, setAmountG] = useState("");
    const [processing, setProcessing] = useState<boolean>(false);
    const mint = async (e: any) =>{
      if(publicKey){
        setProcessing(true);
        let addressG = await generate(publicKey)
        console.log(addressG);
        setAddressG(addressG.creatorTokenAddressString);
        // setAmount(address.creatorTokenBalance.toString());
        // console.log(address.creatorTokenBalance.valueOf);
        
        if(addressG){
        setProcessing(false);
        return toast("Token Successfully Generated", {type:"success"})

        }
      }  
      }

   

  return (
    <>
    <ToastContainer position="top-right"/>
    {/* <div className="container"> */}
     
  <div>
    {/* <div className="box box-blue">
      <p>
        <strong>Select Wallet</strong>
      </p>
    </div> */}
     {/* <div className="box box-blue">
      <p>
        <strong>Disconnect Wallet</strong>
      </p>
    </div>  */}
    
    <form className="box" id="form" onSubmit={handleSubmit}>
    <p className="balance">{userBalance  ? "Balance: "+ userBalance : "" }</p>
      {/* <div className="box box-blue">
        <p>
          <strong>Amount: 19.999995 SOL</strong>
        </p>
      </div> */}
      
      <div className="form-control">
        <input type="text" placeholder="Enter amount" value={amount} onChange={(e)=>setAmount(e.target.value)}/>
        
      </div>
      <div className="form-control">
        <input type="text" placeholder="Enter wallet address" value={address} onChange={(e)=>setAddress(e.target.value)}/>
      </div>
      <button className="transaction" disabled={!publicKey} >Send Sol Token</button>
    </form> 
    <p className='purple'>{result}</p>
  </div>
  <div>
                   
  <button onClick={mint} disabled={processing} className='transaction gen' >{processing ? "Generating....": "Generate New Token"}</button>
                  
  </div>
  <div className='message'>
  <p className="purple" title={addressG}>{addressG ? "NewToken: "+ addressG.slice(0, 5)+"..."+ addressG.slice(-5): "" }</p>
  </div>
{/* </div> */}
</>
  )
}

export default SendForm