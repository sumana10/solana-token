import './App.css';
import { Wallet } from './Components/Wallet';
import { generate } from './Components/generateToken';
import { useState } from 'react';

const App = () =>{

  const [address, setAddress] = useState("");
  const mint = async (e: any) =>{
    let address = await generate()
    console.log(address);
    setAddress(address)
    
  }
  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        {/* <NewFungibleToken/>  */}
         <Wallet/>
         
        <button onClick={mint} className='sendbtn'>newFungibleToken</button>
        <p className="token">{address ? "Token Address: "+ address : "" }</p>

      </header>
    </div>
  );
}

export default App;
