import React, {useState, useEffect} from "react";
import {Route, Switch} from "react-router-dom";
// import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from "./Login.js"
import Signup from "./Signup.js"
import AlbumList from "./AlbumList.js";
import Album from "./Album.js";
import Sandbox from "./Sandbox.js";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  // useEffect(() => {
  //   fetch("/me").then((resp) => {
  //     if (resp.ok) {
  //       resp.json().then((user) => {
  //         setCurrentUser(user);
  //         setIsAuthenticated(true);
  //       });
  //     }
  //   });
  // }, []);

  if (!isAuthenticated) {
    return <div></div>
  }


  return (
    <div className="App">
      <Switch>
        <Route exact path="/">
          <Login setCurrentUser ={setCurrentUser}/>
        </Route>
        <Route exact path="/signup">
          <Signup setCurrentUser ={setCurrentUser}/>
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
