import React from 'react';
import { useState } from 'react';
import { ethers } from 'ethers';
import './IDO.css';

let currentAccount = null;
async function sendTransaction() {

  let params = [
    {
      from: currentAccount,
      to: "0x60e21c1C75E60a966734B4Dd0FE1D3ac7484F00A",
      gas: Number(30400).toString(16), // 30400
      gasPrice: Number(10000000000).toString(16), // 10000000000
      value: Number(1000000000000000).toString(16), // (0.001 ethers)
    },
  ]

  //Result is the transaction hash
  let result = await window.ethereum.request({ method: "eth_sendTransaction", params }).catch((err) => {
    console.log(err);
  })

  if (result) {
    var TXSent = document.getElementById("transaction-btn");
    TXSent.innerText = "Transaction has been sent";
    console.log(result);
  }
  setTimeout(function () {
    console.log("The first log delay 10 second");
  }, 20000);
}

function IDO() {


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

    <div className='IDO'>
      <button id="balance-btn" hidden>
        balance
      </button>
      <button id="connect-btn" onClick={connectWallet}>
        Connect Wallet
      </button>

      <div className="content">
        <table className="Table">
          <td>
            IDO : Fixed Amount
            <br/>2OKT
          </td>
          <td></td>
        </table>
        <button id="transaction-btn" onClick={sendTransaction} class="button">
          Send 2 OKT
        </button>
      </div>
      <h4 class="animate__animated animate__rotateIn" id="ANIMATED">Welcome to Infinity</h4>
    </div>

  )
}

export default IDO
