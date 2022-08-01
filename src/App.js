import './App.css';
import { useState } from 'react';
import { ethers } from 'ethers';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Reports from './Pages/Reports';
import Products from './Pages/Products';


let currentAccount = null;
// 初加载刷新
function App() {

  //Properties

  const [walletAddress, setWalletAddress] = useState("");

  async function requestAccount() {
    console.log('Requesting account...');

    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",

      });
      setWalletAddress(accounts[0]);
      currentAccount = accounts[0];

      console.log(currentAccount);
    } catch (error) {
      console.log('error connecting');
    }

    //Check if Metamask Exist
    if (window.ethereum) {
      console.log('detected');
    } else {
      console.log('not detected');
      alert("Please Install Metamask");
    }
  }

  async function getBalance() {
    let accBalance = await window.ethereum.request({
      method: "eth_getBalance",
      params:
        [currentAccount, 'latest']
    });
    var balanceDEC = Number(accBalance).toString(10);
    console.log(balanceDEC);
    var inWeiBal = balanceDEC.length;
    var balanceBtn = document.getElementById("balance-btn");

    var str = Math.pow(10, (inWeiBal - 22));
    var rounded = Math.round(str * parseInt(balanceDEC.substring(0, 4)) * 10000) / 10000;
    balanceBtn.innerText = rounded + " BNB";
  }

  async function connectWallet() {

    if (typeof window.ethereum !== 'undefined') {
      await requestAccount();
      const provider = new ethers.providers.Web3Provider(window.ethereum);

      var btnConnect = document.getElementById("connect-btn");
      document.getElementById("balance-btn").hidden = false;

      let lengthAcc = currentAccount.length;
      btnConnect.innerText = currentAccount.substring(0, 4) + "..." + currentAccount.substring(lengthAcc - 4, lengthAcc);

      alert("Wallet connected successfully!");
      getBalance();
    } else {
      alert("Please install Metamask");
    }
  }

  return (

    <div className="App" id="bg">
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' exact element={<Home />} />          
          <Route path='/reports' element={<Reports />} />
          <Route path='/products' element={<Products />} />
        </Routes>
      </Router>

      <header className="App-header">
        
        <button id="balance-btn" hidden>
          balance
        </button>
        <button id="connect-btn" onClick={connectWallet}>
          Connect Wallet
        </button>
        <h2>IDO page</h2>
      </header>
      <h1>Designer <a href="https://t.me/RyoLin" className="Ryo">RyoLin</a></h1>
    </div>
  );
}

export default App;
