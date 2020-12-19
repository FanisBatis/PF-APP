import React from "react";
import Stats from './Stats';
import DashboardCourses from './DashboardCourses';
import './Css Comp/Dashboard.css';


const Dashboard = () => {

  return (
    <div class="looo">
      <div class="container" width="10px">
        <div class="jumbotron">
          <div class="animated-title">
            <div class="text-top">
              <div>
                <span>Welcome to </span>
                <span>Code.Hub Dashboard!</span>
              </div>
            </div>
            <div class="text-bottom">
              <div>
                <span>Manage everything</span>
                <span>and have fun!</span>
              </div>
            </div>
          </div>
        </div>
        <Stats /> {/* show codeHub statistics via Stats component */}
      </div>
      <DashboardCourses /> {/* show courses  via DashboardCourses component */}

    </div>
  )
}

export default Dashboard;
