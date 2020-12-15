import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Fade } from 'react-bootstrap';
import Header from "./Header"
import Courses from "./Courses";
import CourseDetails from "./CourseDetails";
import Dashboard from "./Dashboard";
import EditCourse from './EditCourse';
import AddCourse from './AddCourse';

function App() {
  return (
    <div>
      <BrowserRouter>
        <div>
          <Header />
          <Route path="/" exact component={Dashboard} />
          <Switch>
            <Route path="/courses/:id" component={CourseDetails} />
            <Route path="/courses" component={Courses} />
          </Switch>
          <Route path="/edit-course/:id" component={EditCourse} />
          <Route path="/add-course" component={AddCourse} />
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
