
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {Fade} from 'react-bootstrap';
import Courses from "./Courses";
import CourseDetails from "./CourseDetails";
import Dashboard from "./Dashboard";
import AddCourse from "./AddCourse";
import Header from "./Header";
import EditCourse from "./EditCourse";

function App() {
  return (
    <div>
      <Router>
        <Fade>
            <Switch>
              <div>
               <Header />
                <Route path="/" exact component={Dashboard} />
                  <Switch>
                    <Route path="/courses/:id" component={CourseDetails} />
                    <Route path="/courses" component={Courses} />
                  </Switch>
              <Route path="/addcourse" component={AddCourse} />
              <Route path="/edit-course" component={EditCourse} />
            </div>
          </Switch>
      </Fade>
    </Router>
  </div>
  );
}

export default App;
