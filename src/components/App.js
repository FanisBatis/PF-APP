import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
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
        <Header />
        <Switch>
          <Route path="/" exact component={Dashboard} />
          <Route path="/courses/:id" component={CourseDetails} />
          <Route path="/courses" component={Courses} />
          <Route path="/edit-course/:id" component={EditCourse} />
          <Route path="/add-course" component={AddCourse} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
