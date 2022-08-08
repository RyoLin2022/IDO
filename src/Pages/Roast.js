import React from 'react'
import './CSS/Roast.css'
import { savedAcc } from '../App';

let currentAccount = null;
let refAccount = null;
function Roast() {

    currentAccount = savedAcc;
    var tokenDecimal = 6;
    let contractAddress = "0xA20DF0188F1330E1c80e012901735B9C1b58E27a";         //Modify Contract Address here!!
    let RoastContractAddress = "0x05Ab540316173f61EeE46486F4da679BE3BA925B";    //Modify Roast Contract Address here!!


    
    /*------------------Here's the Contract Approval-----------------*/
    /*------------------Here's the Contract Approval-----------------*/
    /*------------------Here's the Contract Approval-----------------*/
    async function ApproveContract() {
        let inputGasPrice = await window.ethereum.request({
            method: "eth_gasPrice"
        });
        let inputData = "0x095ea7b3000000000000000000000000" +
            RoastContractAddress.substring(2, RoastContractAddress.length) +
            "0000000000000000000000000000000000000000204fce5e3e25026110000000";

        let params = [
            {
                from: currentAccount,
                to: contractAddress,
                gas: Number(300000).toString(16), // 30400
                gasPrice: inputGasPrice, // 10000000000
                value: '0', // 2441406250
                data: inputData,

            },
        ];

        var ApproveBTN = document.getElementById("Approve-btn");

        let result = window.ethereum
            .request({
                method: "eth_sendTransaction",
                params,
            }).then(
                ApproveBTN.innerText = "Approving...",
            ).catch((err) => {
                ApproveBTN.innerText = "Approve"
                console.log(err);
            })

        // setTimeout(function () {
        //     console.log("The first log delay 20 second");
        //     // ACCAllowance();
        // }, 20000);

        // setTimeout(function () {
        //     console.log("The second log delay 40 second");
        //     // ACCAllowance();
        // }, 40000);
    }




    /*------------------Here's the Link Generation-----------------*/
    /*------------------Here's the Link Generation-----------------*/
    /*------------------Here's the Link Generation-----------------*/
    function GenerateLink() {
        let link = window.location.href;
        if (link.length > 60)
            link = link.substring(0, link.length - 42) + currentAccount;
        else
            link = link + "?invitedBy=" + currentAccount;
        console.log(link);
        navigator.clipboard.writeText(link);
    }

    function detectFather() {
        console.log(window.location.href);
        let fullText = window.location.href;
        let length = fullText.length;
        let accText = fullText.substring(length - 42, length);
        console.log(accText);
        refAccount = accText;
    }

    function refAccountButton() {
        console.log(refAccount);
    }


    
    return (
        <div className='roast'>
            
            <div id="roastpage" >
                <h3>Generate Referal Links</h3>
                <button onClick={GenerateLink} id="Generate-Btn">Copy Referral Link</button>        
                <button onClick={detectFather} id="demo">Demo </button>
                <button id="ApproveContract-btn" onClick={ApproveContract}>Approve</button>
            </div>
        </div>
    )
}

export default Roast
