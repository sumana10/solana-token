import './App.css';
import { Wallet } from './Components/Wallet';
import { generate } from './Components/generateToken';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";



const App = () =>{

  const [address, setAddress] = useState("");
  const [amount, setAmount] = useState("");
  const mint = async (e: any) =>{
    let address = await generate()
    console.log(address);
    setAddress(address.creatorTokenAddressString);
    // setAmount(address.creatorTokenBalance.toString());
    // console.log(address.creatorTokenBalance.valueOf);
    
    if(address)
    return toast("Token Successfully Generated", {type:"success"})
    
  }
  return (
    <div className="App">
      <ToastContainer position="top-right"/>
      <header className="App-header">
      
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        {/* <NewFungibleToken/>  */}
         <Wallet/>
        

         
        <button onClick={mint} className='sendbtn'>newFungibleToken</button>
        <p className="purple">{address ? "Token Address: "+ address : "" }</p>
        <p className="purple">{amount ? "Amount: "+ amount : "" }</p>

      </header>
    </div>
  );
}

export default App;
