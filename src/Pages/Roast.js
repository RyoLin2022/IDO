import React from 'react'
import './Roast.css'
import { savedAcc } from '../App';

let currentAccount = null;
let counter =0;
function Roast() {

    const generateLink = `https://ido-91a.pages.dev/roast?invitedBy=${savedAcc}`;
    console.log(generateLink);
    function GenerateLink () {
        counter=counter+1;
        document.getElementById("ReferralLink").value = generateLink;
        document.getElementById("Generate-Btn").innerText = ("Copy");
        if(counter>1)
            console.log(counter);
    }

    function detectURL() {
        console.log(window.location.href);
    }

    
    return (
        <div className='roast'>
            <div id="roastpage">
                <h3>Generate Referal Links</h3>
                <input id="ReferralLink"></input>
                <button onClick={GenerateLink} id="Generate-Btn">Generate Referral Link</button>
                <button onClick={detectURL} id="demo">Demo </button>
            </div>
        </div>
    )
}

export default Roast