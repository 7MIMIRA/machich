import React, { useState } from 'react';
import axios from 'axios';
import Navigation from './Navigation.jsx';
import Shortener from './Shortener.jsx';

function Main() {


  return (
    <main>
      {/* <Navigation /> */}
      <div className="mainBody">
        <div className="heading1">
          <h1>Machich</h1>
          <h2>Voted best URL shortening service of 2021 by Jose Lopez</h2>
        </div>
        <Shortener />
      </div>
    </main>
  )
}

export default Main;