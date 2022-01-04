import { Link } from "react-router-dom"

function Login() {
    return (
      <div className="Login">

        <form>
            <label>
                <input placeholder="Username" type="text" name="username" className="form-control"/>
            </label>
            <label>
                <input placeholder="Password" type="password" name="password" className="form-control"/>
            </label>
            <input type="submit" value="Submit"/>
        </form>

        <Link exact to="/signup">Don't have an account? Create one here</Link>
      </div>
    );
  }
  
  export default Login;