import React from 'react';
import './IDO.css';
import { savedAcc } from '../App';

let currentAccount = null;

function IDO() {

  currentAccount = savedAcc;

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

  let contractAddress = "0x6b25Cb9338b4cEC5632aFd12B905C9C25a71BB4b";    //Modify Contract Address here!!
  async function ContractEthBalance() {
    let accBalance = await window.ethereum.request({
      method: "eth_getBalance",
      params:
        [contractAddress, 'latest']
    });
    var balanceDEC = Number(accBalance).toString(10);
    console.log(balanceDEC);
    var inWeiBal = balanceDEC.length;
    var balanceBtn = document.getElementById("test-btn");

    var str = Math.pow(10, (inWeiBal - 22));
    var rounded = Math.round(str * parseInt(balanceDEC.substring(0, 4)) * 10000) / 10000;
    balanceBtn.innerText = rounded + " OKT";
  }

  return (

    <div className='IDO'>

      <div className="IDOcontainer">
        <h1 className="animate__animated animate__rotateIn" id="Welcome">Welcome to Infinity</h1>
        <div className="box1">
          <table className="Table">
            <tr id="tr1">IDO</tr>
            <tr>
              <td>Amount</td>
              <td >2OKT/Person</td>
            </tr>

          </table>
        </div>
        <div className="box2">
          <button id='IDOtransaction-btn' onClick={sendTransaction} className="button">
            Make IDO
          </button>
        </div>
        <div className="box3">

        </div>
      </div>
    </div>

  )
}

export default IDO
