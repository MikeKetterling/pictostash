import React from "react"
import {Route, Switch} from "react-router-dom"
// import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from "./Login.js"
import Signup from "./Signup.js"
import AlbumList from "./AlbumList.js";
import Album from "./Album.js";
import Sandbox from "./Sandbox.js";

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
        <Route exact path="/albumlist">
          <AlbumList/>
        </Route>
        <Route exact path="/album">
          <Album/>
        </Route>
        <Route exact path="/sandbox">
          <Sandbox />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
