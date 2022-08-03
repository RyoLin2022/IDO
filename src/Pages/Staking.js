import React from 'react';
import { useState } from 'react';
import { ethers } from 'ethers';
import './Staking.css';

let currentAccount = null;

// async function sendTransaction() {

//   let params = [
//     {
//       from: currentAccount,
//       to: "0x60e21c1C75E60a966734B4Dd0FE1D3ac7484F00A",
//       gas: Number(30400).toString(16), // 30400
//       gasPrice: Number(10000000000).toString(16), // 10000000000
//       value: Number(1000000000000000).toString(16), // (0.001 ethers)
//     },
//   ]

//   //Result is the transaction hash
//   let result = await window.ethereum.request({ method: "eth_sendTransaction", params }).catch((err) => {
//     console.log(err);
//   })

//   if (result) {
//     var TXSent = document.getElementById("transaction-btn");
//     TXSent.innerText = "Transaction has been sent";
//     console.log(result);
//   }
//   setTimeout(function () {
//     console.log("The first log delay 10 second");
//   }, 20000);
// }

function Staking() {

  var tokenDecimal = 6;
  let contractAddress = "0xA20DF0188F1330E1c80e012901735B9C1b58E27a";       //Modify Contract Address here!!
  let stakingContractAddress = "0xb26318a92f465004f343562D649D9908D8fE5B03";//Modify Staking Contract Address here!!

  /*------------------Here's the Balance for the staking contract-----------------*/
  /*------------------Here's the Balance for the staking contract-----------------*/
  /*------------------Here's the Balance for the staking contract-----------------*/

  async function erc20Balance() {
    let accBalance = await window.ethereum.request({
      method: "eth_call",
      params: [{
        to: contractAddress,
        data: "0x70a08231000000000000000000000000b26318a92f465004f343562d649d9908d8fe5b03",
        //BalanceOf:0x70a08231
        //BalanceOF + staking contract address
      },
        "latest"
      ]
    });
    var balanceDEC = Number(accBalance).toString(10);

    var inWeiBal = balanceDEC.length;
    var CAbalance = document.getElementById("StakingContractTokenBalance");

    var str = Math.pow(10, (inWeiBal - tokenDecimal - 4));
    var rounded = Math.round(str * parseInt(balanceDEC.substring(0, 4)) * 10000) / 10000;
    CAbalance.innerText = rounded;
  }





  /*------------------Checck the allowance for staking contract-----------------*/
  /*------------------Checck the allowance for staking contract-----------------*/
  /*------------------Checck the allowance for staking contract-----------------*/

  async function ACCAllowance() {
    let inputdata = "0xdd62ed3e"
      + "000000000000000000000000" + currentAccount.substring(2, currentAccount.length)
      + "000000000000000000000000" + stakingContractAddress.substring(2, stakingContractAddress.length);
    let accAllowance = await window.ethereum.request({
      method: "eth_call",
      params: [{
        to: contractAddress,
        data: inputdata,
        //allowance:0xdd62ed3e
        //BalanceOF + staking contract address
      },
        "latest"
      ]
    });
    var accAllowNum = Number(accAllowance).toString(10);

    if (accAllowNum > 0) {
      document.getElementById("Approve-btn").hidden = true;
      document.getElementById("Unstake-btn").hidden = false;
      document.getElementById("Stake-btn").hidden = false;
    } else {
      document.getElementById("Approve-btn").hidden = false;
      document.getElementById("Unstake-btn").hidden = true;
      document.getElementById("Stake-btn").hidden = true;
    }
  }




  /*------------------Here's the Staking Balance for certain account-----------------*/
  /*------------------Here's the Staking Balance for certain account-----------------*/
  /*------------------Here's the Staking Balance for certain account-----------------*/
  async function ACCStakingBalance() {
    let inputData = "0x5b5a2213000000000000000000000000" + currentAccount.substring(2, currentAccount.length);
    let accBalance = await window.ethereum.request({
      method: "eth_call",
      params: [{
        to: stakingContractAddress,
        data: inputData,
        //BalanceOf:0x5b5a2213
      },
        "latest"
      ]
    });
    var balanceDEC = Number(accBalance).toString(10);
    var inWeiBal = balanceDEC.length;
    var CAbalance = document.getElementById("StakingAccountBalance");

    var str = Math.pow(10, (inWeiBal - tokenDecimal - 4));
    var rounded = Math.round(str * parseInt(balanceDEC.substring(0, 4)) * 10000) / 10000;
    CAbalance.innerText = rounded;
  }


  /*------------------Here's the Staking Reward for certain account-----------------*/
  /*------------------Here's the Staking Reward for certain account-----------------*/
  /*------------------Here's the Staking Reward for certain account-----------------*/
  async function ACCStakingReward() {
    let inputData = "0x4d318018000000000000000000000000" + currentAccount.substring(2, currentAccount.length);
    let accBalance = await window.ethereum.request({
      method: "eth_call",
      params: [{
        to: stakingContractAddress,
        data: inputData,
        //BalanceOf:0x5b5a2213
      },
        "latest"
      ]
    });
    var balanceDEC = Number(accBalance).toString(10);
    var inWeiBal = balanceDEC.length;
    var CAbalance = document.getElementById("StakingAccountInterest");

    var str = Math.pow(10, (inWeiBal - tokenDecimal - 4));
    var rounded = Math.round(str * parseInt(balanceDEC.substring(0, 4)) * 10000) / 10000;
    CAbalance.innerText = rounded;
  }

  async function ACCerc20Balance() {    
    let inputData = "0x70a08231000000000000000000000000" + currentAccount.substring(2, currentAccount.length);
    let accBalance = await window.ethereum.request({
      method: "eth_call",
      params: [{
        to: contractAddress,
        data: inputData,
        //BalanceOf:0x70a08231
        //(account):0000000000000000000000006b25Cb9338b4cEC5632aFd12B905C9C25a71BB4b
      },
        "latest"
      ]
    });
    var balanceDEC = Number(accBalance).toString(10);
    console.log(balanceDEC);
    var inWeiBal = balanceDEC.length;
    var CAbalance = document.getElementById("ACCTokenBalance");
    var str = Math.pow(10, (inWeiBal - tokenDecimal - 4));
    var rounded = Math.round(str * parseInt(balanceDEC.substring(0, 4)) * 10000) / 10000;
    CAbalance.innerText = rounded;
  }


async function makeStake() {
  let inputValueDEC = document.getElementById("stakeMiddle").value;
  let inputValueHex = Number(inputValueDEC).toString(16);

  let Zeros = Math.pow(10,20-inputValueHex.length);
  let stringZeros = Zeros.toString();

  let inputData="0xadf8ccaa"+"00000000000000000000000000000000000000000000"
  +stringZeros.substring(1,Zeros.length)+inputValueHex;
  console.log(inputData);
  //0xadf8ccaa0000000000000000000000000000000000000000000000000000000000989680
  //0xadf8ccaa0000000000000000000000000000000000000000000000000000000000989680
  let inputGasPrice = await window.ethereum.request({
    method: "eth_gasPrice"
  });

  let params = [
    {
      from: currentAccount,
      to: stakingContractAddress,
      gas: Number(300000).toString(16), // 30400
      gasPrice: inputGasPrice, // 
      value: 0,
      data:inputData,
    },
  ]

  //Result is the transaction hash
  let result = await window.ethereum.request({ method: "eth_sendTransaction", params }).catch((err) => {
    console.log(err);
  })

  if (result) {
    var TXSent = document.getElementById("GoingToStake");
    TXSent.innerText = "Transaction has been sent";
    console.log(result);
  }
  setTimeout(function () {
    console.log("The first log delay 10 second");
  }, 20000);
}



  /*------------------Here's the token Approval-----------------*/
  /*------------------Here's the token Approval-----------------*/
  /*------------------Here's the token Approval-----------------*/
  async function ApproveToken() {
    let inputGasPrice = await window.ethereum.request({
      method: "eth_gasPrice"
    });
  
    let params = [
      {
        from: currentAccount,
        to: contractAddress,
        gas: Number(100000).toString(16), // 30400
        gasPrice: inputGasPrice, // 10000000000
        value: '0', // 2441406250
        data: '0x095ea7b3000000000000000000000000b26318a92f465004f343562d649d9908d8fe5b030000000000000000000000000000000000000000204fce5e3e25026110000000',

        //0x095ea7b300000000000000000000000[062e0d998212b01d87049eb2d4a82436f1fca3b63]0000000000000000000000000000000000000000000000056bc75e2d63100000
      },
    ];

    let result = window.ethereum
      .request({
        method: 'eth_sendTransaction',
        params,
      }).catch((err) => {
        console.log(err);
      })

    setTimeout(function () {
      console.log("The first log delay 20 second");
      ACCAllowance();
    }, 20000);
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
    var inWeiBal = balanceDEC.length;
    var balanceBtn = document.getElementById("balance-btn");

    var str = Math.pow(10, (inWeiBal - 22));
    var rounded = Math.round(str * parseInt(balanceDEC.substring(0, 4)) * 10000) / 10000;
    balanceBtn.innerText = rounded + " OKT";
  }

  async function connectWallet() {
    if (typeof window.ethereum !== 'undefined') {
      await requestAccount();
      const provider = new ethers.providers.Web3Provider(window.ethereum);

      var btnConnect = document.getElementById("connect-btn");
      document.getElementById("balance-btn").hidden = false;

      let lengthAcc = currentAccount.length;
      btnConnect.innerText = currentAccount.substring(0, 4) + "..." + currentAccount.substring(lengthAcc - 4, lengthAcc);

      erc20Balance();
      ACCStakingBalance();
      ACCStakingReward();
      getBalance();
      ACCAllowance();
      ACCerc20Balance();
      alert("Wallet connected successfully!");
    } else {
      alert("Please install an injected Web3 wallet");
    }
  }


  const [style, setStyle] = useState("overlay");
  
  const OpenStake = () => {  
    setStyle("overlay2");
  };  

  const CloseStake = () => {  
    setStyle("overlay");
  };

  
  const [style2, setStyle2] = useState("overlay3");
  
  const OpenUnstake = () => {  
    setStyle2("overlay4");
  };  

  const CloseUnstake = () => {  
    setStyle2("overlay3");
  };

  function getStakeAmount() {
    let staking = document.getElementById("stakeAmountID");
    let inputValue = staking.value;
    let inputValueDecimal = inputValue*Math.pow(10,tokenDecimal);    
    document.getElementById("stakeMiddle").value=inputValueDecimal;
   
    makeStake();
    staking.value = null;
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
          <br />
          <table id='APR'>
            <tr id='layer1'>
              <td id='topleft'>Annul Percentage Yield</td>
              <td className="topRight">365%</td>
            </tr>
            <br />
            <tr id='layer2'>
              <td id='topleft'>Total Staked</td>
              <td id="StakingContractTokenBalance" className="topRight">0.0</td>
            </tr>

          </table>
        </div>
        <div className="staking-box-3">
          <div id='box-3-left'>
            <div className="upper">Staked</div>

            <div className="lower" id="StakingAccountBalance">0.0</div>
          </div>
          <div id='box-3-right'>
            <div className="upper">Earned</div>

            <div className="lower" id="StakingAccountInterest">0.0</div>
          </div>
        </div>
        <div className="staking-box-4">
          <button id="Approve-btn" onClick={ApproveToken}>Approve</button>

          <div className={style}>
            <div className="popup">
              <div onClick={CloseStake} className="CloseIcon">X</div>
              <h3>Stake</h3>
              <h3>Balance<span id="ACCTokenBalance"></span></h3>
              <input className="stakeAmountClass" id="stakeAmountID"></input>
              <button id="GoingToStake" onClick={getStakeAmount}>Stake Now</button>
            </div>
          </div>

          
          <div className={style2}>
            <div className="popup2">
              <div onClick={CloseUnstake} className="CloseIcon">X</div>
              <h3>Unstake</h3>
            </div>
          </div>

          <div className="ToStakeOrNotToStake">
            <button id = "Stake-btn" onClick={OpenStake} hidden>+</button>
            <div id ="stakeMiddle"></div>
            <button id = "Unstake-btn" onClick={OpenUnstake} hidden>-</button>
          </div>
          {/* <button onClick={ethEstimateGas}>Test</button> */}
        </div>
      </div>
    </div>

  )
}


export default Staking
