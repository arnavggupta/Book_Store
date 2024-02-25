import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useFirebase } from '../Context/firebase';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { OffcanvasBody } from 'react-bootstrap';
function Register() {
  const navigate = useNavigate();
const [email,setemail]=useState("");
const [password,setpassword]=useState("");
    const firebase =useFirebase();

    const redirect=()=>navigate("/login");
    const handelsubmit = async (e) => {
      e.preventDefault();
    
      console.log("Email:", email);
      console.log("Password:", password);
    
      try {
        const result = await firebase.signup(email, password);
        console.log("Signup Result:", result);
        console.log("Successful");
    
        redirect();
      } catch (error) {
        console.error("Signup Error:", error.message);
      }
    };

    return (

        <div style={{margin:"200px"}}>
     <Form onSubmit={handelsubmit} style={{ maxWidth: '400px', margin: 'auto' }}>
  <Form.Group className="mb-3" controlId="formBasicEmail">
    <Form.Label style={{ fontWeight: 'bold' }}>Email address</Form.Label>
    <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e)=>{setemail(e.target.value)}} style={{ width: '100%', padding: '10px', boxSizing: 'border-box', border: '1px solid #ccc', borderRadius: '4px' }} />
    <Form.Text className="text-muted">
      We'll never share your email with anyone else.
    </Form.Text>
  </Form.Group>

  <Form.Group className="mb-3" controlId="formBasicPassword">
    <Form.Label style={{ fontWeight: 'bold' }}>Password</Form.Label>
    <Form.Control type="password" placeholder="Password" value={password} onChange={(e)=>{setpassword(e.target.value)}}style={{ width: '100%', padding: '10px', boxSizing: 'border-box', border: '1px solid #ccc', borderRadius: '4px' }} />
  </Form.Group>

 
 <p>Already Have Account <Button onClick={()=>navigate("/login")} style={{padding:"3px"}}>Login</Button></p>

  <Button variant="primary"  type="submit" style={{ backgroundColor: '#4CAF50', color: 'white', padding: '10px 15px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
    Create Acoount
  </Button>
</Form>

      </div>
      
    );
  }
  
  export default Register;