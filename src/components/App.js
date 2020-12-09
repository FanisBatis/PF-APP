import Header from "./Header"
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Courses from "./Courses";
import CourseDetails from "./CourseDetails";
import Homepage from "./Homepage";

function App() {
  return (
    <div>
      <BrowserRouter>
        <div>
          <Header />

          <Switch>
            <Route path="/" exact component={Homepage} />
            <Route path="/courses/:id" component={CourseDetails} />
            <Route path="/courses" component={Courses} />
          </Switch>

        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
