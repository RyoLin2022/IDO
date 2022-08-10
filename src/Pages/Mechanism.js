import React from 'react'
import './CSS/Mechanism.css'
function Mechanism() {
  return (
    <div className='mechanism'>
      <div id="mechanismpage">
        <table id="mechanismTable1">
          <thead id="mechanismTableHead">
            Tokenomics
          </thead>
          <tbody>
            <tr>
              <td>Total Supply</td>
              <td>100,000,000</td>
            </tr>
            <tr>
              <td>IDO</td>
              <td>30,000,000</td>
            </tr>
            <tr>
              <td>Liquidity Pool</td>
              <td>10,000,000</td>
            </tr>
            <tr>
              <td>Mining</td>
              <td>50,000,000</td>
            </tr>
            <tr>
              <td>Team Token</td>
              <td>10,000,000</td>
            </tr>
            (Team Token Unlock 5% per month)
          </tbody>
        </table>
        <table id="mechanismTable2">
          <thead id="mechanismTableHead">
            Mechanism
          </thead>
          <tbody>
            <tr>
              <td>Liquidity Tax</td>
              <td>2</td>
            </tr>
            <tr>
              <td>Marketing Tax</td>
              <td>8</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Mechanism
