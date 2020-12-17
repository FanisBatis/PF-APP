
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
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
        <div>
            <Switch>
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
          </Switch>
      </div>
    </Router>
  </div>
  );
}

export default App;
