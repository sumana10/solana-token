import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Wallet } from './Components/Wallet';
import { mintToken } from './Components/mintToken';
import NewFungibleToken from './Components/NewFungibleToken';

//import Mint from './Components/Mint';






function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <NewFungibleToken/>
        {/* <Wallet/> */}
        {/* {Mint()} */}
        {/* <button onClick={mintToken}>Mint</button> */}
      </header>
    </div>
  );
}

export default App;
