import React from "react";
import Jumbotron from 'react-bootstrap/Jumbotron';
import Stats from './Stats';
import {Container} from "react-bootstrap";
import DashboardCourses from './DashboardCourses';


const Dashboard = () => {
  return (
    <div>
      <Container>
      <Jumbotron fluid className='mt-4 text-center'>
        <h1>Welcome to Code.Hub Dashboard!</h1>
        <h5>Manage everything and have fun!</h5>
      </Jumbotron>

      <Stats />
    <DashboardCourses />
    </Container>
    </div>
  );
};

export default Dashboard;
