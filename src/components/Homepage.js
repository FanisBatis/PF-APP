import React from "react";
import Jumbotron from 'react-bootstrap/Jumbotron';
import Stats from './Stats';

const Homepage = () => {
  return (
    <div>
      <Jumbotron fluid className='mt-4 text-center'>
        <h1>Welcome to Code.Hub Dashboard!</h1>
        <h5>Manage everything and have fun!</h5>
      </Jumbotron>
      <Stats />
    </div>
  )
}

export default Homepage;