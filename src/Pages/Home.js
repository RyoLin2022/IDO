import React from 'react';
import './CSS/Home.css';
import bgVid from "./assets/Infinity_IDO.mp4";

function Home() {

  return (

    <><video autoPlay muted loop id="IDOBG">
      <source src={bgVid} type="video/mp4" />
    </video>
      <div className='home'>
        <div className="homeMID">
          INFINITY<br/>
          Phase1 : IDO STAKING<br/>
          Phase2 : IFO<br/>
          Phase3 : NFT SYSTEM<br/>
          Phase4 : STAY TUNED<br/>
        </div>
      </div>
    </>
  )
}

export default Home
