import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useFirebase } from '../Context/firebase';
import { useState,useEffect } from 'react';
import { OffcanvasBody } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
function Login() {
  const navigate=useNavigate();
const [email,setemail]=useState(null);
const [password,setpassword]=useState(null);
    const firebase =useFirebase();
console.log(firebase);
      useEffect(()=>{
        if(firebase.isloggedin()){
          navigate("/");
     
        }
        
      
      },[firebase,navigate] )



    const handelsubmit= async(e)=>{
       e.preventDefault();

     const result=  await firebase.Login(email,password); 
console.log("sucessfull");

    }
    return (

        <div style={{margin:"200px"}}>
     <Form style={{ maxWidth: '400px', margin: 'auto' }}>
  <Form.Group className="mb-3" controlId="formBasicEmail">
    <Form.Label style={{ fontWeight: 'bold' }}>Email address</Form.Label>
    <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e)=>{setemail(e.target.value)}} style={{ width: '100%', padding: '10px', boxSizing: 'border-box', border: '1px solid #ccc', borderRadius: '4px' }} />
    
  </Form.Group>

  <Form.Group className="mb-3" controlId="formBasicPassword">
    <Form.Label style={{ fontWeight: 'bold' }}>Password</Form.Label>
    <Form.Control type="password" placeholder="Password" value={password} onChange={(e)=>{setpassword(e.target.value)}}style={{ width: '100%', padding: '10px', boxSizing: 'border-box', border: '1px solid #ccc', borderRadius: '4px' }} />
  </Form.Group>

  <p>Dont Have Account <Button style={{padding:"3px"}} onClick={()=>navigate("/register")}>Register Here </Button></p>

  <Button variant="primary" onClick={handelsubmit} type="submit" style={{ backgroundColor: '#4CAF50', color: 'white', padding: '10px 15px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
   Login Account
  </Button>
</Form>

<h5 style={{marginRight:"50px",marginTop:"5px",marginBottom:"5px"}}>OR</h5>
<Button variant='danger' onClick={firebase.SignwithGoogle}>Sign in With Google </Button>
      </div>
    );
  }
  
  export default Login;