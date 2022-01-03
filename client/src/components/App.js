import React from "react"
import {Route, Switch} from "react-router-dom"
import '../App.css';
import Login from "./Login.js"
import Signup from "./Signup.js"

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/">
          <Login />
        </Route>
        <Route exact path="/signup">
          <Signup />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
