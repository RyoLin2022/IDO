import React from 'react';
import Particle from '../components/Particle';
import './Home.css';

function Home() {

  return (

    <div className='home'>
      <div className="ParticleBG">
        <Particle />
        <div className="HomeTitle">
          <h2> Meme </h2><br />
          <h2> Infinity </h2>
        </div>
      </div>
    </div>
  )
}

export default Home
