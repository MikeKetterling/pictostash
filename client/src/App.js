import React from "react"
import {Route, Switch} from "react-router-dom"
import './App.css';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/">
          <div>login page</div>
        </Route>
        <Route exact path="/signup">
          <div>signup page</div>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
