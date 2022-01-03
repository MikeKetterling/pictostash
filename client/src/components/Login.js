import { Link } from "react-router-dom"

function Login() {
    return (
      <div className="Login">
        <Form>
            <Form.Group>
                <Form.Control placeholder="username" type="text" name="username"/>
                
                <Form.Control placeholder="password" type="password" name="password"/>
                
                <Button type="submit" value="submit"/>
            </Form.Group>
        </Form>

        <Link exact to="/signup">Don't have an account? Create one here</Link>
      </div>
    );
  }
  
  export default Login;