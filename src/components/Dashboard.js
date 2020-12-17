import React from "react";
import Jumbotron from 'react-bootstrap/Jumbotron';
import Stats from './Stats';
import DashboardCourses from './DashboardCourses';
import "../index.css";

const Dashboard = () => {
  return (
    <div>
      <Jumbotron fluid className='mt-4 text-center'>
        <h1>Welcome to Code.Hub Dashboard!</h1>
        <h5>Manage everything and have fun!</h5>
      </Jumbotron>
      <Stats /> {/* show codeHub statistics via Stats component */}
      <DashboardCourses /> {/* show courses  via DashboardCourses component */}
    </div>
  )
}

export default Dashboard;