import React from 'react';
import Particle from '../components/Particle';
import './Home.css';
// import background from '../components/Infinity.jpg'
// <img src={background} alt="Background"/>
function Home() {
  return (
    <div className='home'>
      <div className="ParticleBG">
        <Particle/>
        <h2> Meme </h2><br/>
        <h2> Infinity </h2>
      </div>
    </div>
  )
}

export default Home
