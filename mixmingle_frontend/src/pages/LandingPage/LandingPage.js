import React from 'react';
import './LandingPage.css';
import LandingPageVideo from "../../assets/landingPageVideo.mp4"

const LandingPage = () => {
  return (
    <div>
        <div className='landingPage'>
            <video src={LandingPageVideo} autoPlay/>
        </div>
    </div>
  )
}

export default LandingPage