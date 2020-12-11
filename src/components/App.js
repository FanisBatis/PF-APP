import { BrowserRouter, Route, Switch } from "react-router-dom";
import Header from "./Header"
import Courses from "./Courses";
import CourseDetails from "./CourseDetails";
import Homepage from "./Homepage";
import EditCourse from './EditCourse';

function App() {
  return (
    <div>
      <BrowserRouter>
        <div>
          <Header />
          <Route path="/" exact component={Homepage} />
          <Switch>
            <Route path="/courses/:id" component={CourseDetails} />
            <Route path="/courses" component={Courses} />
          </Switch>
          <Route path="/edit-course/:id" component={EditCourse} />
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
