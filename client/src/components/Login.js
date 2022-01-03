import { Link } from "react-router-dom"
import {Form, Button} from 'react-bootstrap'


function Login() {
    return (
      <div className="text-center">

        <h2>Welcome!</h2>
        <br/>

        <Form>
          
          <Form.Group className="mb-3" controlId="formBasicUsername">
            <Form.Control placeholder="Username" type="text" name="username" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Control placeholder="Password" type="password" name="password"/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control placeholder="Enter Email" type="email" name="email" />
          </Form.Group>

          <br></br>

          <Button variant="primary" type="submit">
            Submit
          </Button>

        </Form>
          <br></br>

        <Link exact to="/signup">Don't have an account? Create one here</Link>

      </div>
    );
  }
  
  export default Login;