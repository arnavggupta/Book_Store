import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState,useEffect } from 'react';
import { useFirebase } from '../Context/firebase';
import { useNavigate } from 'react-router-dom';
function Listing() {
  const firebase=useFirebase();
  const navigate=useNavigate();


const [name,setname]=useState(null);
const [isbn,setisbn]=useState(null);
const [price,setprice]=useState(null);
const [pic,setpic]=useState(null);


const handleFileChange = (e) => {
  const file = e.target.files[0];

  if (file) {
    // Use FileReader to read the file
    const reader = new FileReader();
    reader.onloadend = () => {
      console.log("File Name:", file.name);
    };
    reader.readAsDataURL(file);
  }
};


const redirect=()=>navigate("/");
const handlesubmit=async(e)=>{
e.preventDefault();

await firebase.addlisting(name,isbn,price,pic);
if(firebase.isloggedin()){
  redirect();
}
else{
  alert("First You have To logged in")
  setname("");
    setisbn("");
    setprice("");
    setpic(null);
}
}


  return (
    <div style={{margin:"20px"}}>
    <Form onSubmit={handlesubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label> Book Name</Form.Label>
        <Form.Control type="text" placeholder="Enter Book Name" value={name} onChange={(e)=>setname(e.target.value)} />
        
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>ISBN No.</Form.Label>
        <Form.Control type="text" placeholder="Enter ISBN number" value={isbn} onChange={(e)=>setisbn(e.target.value)} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Price</Form.Label>
        <Form.Control type="text" placeholder="Enter Price" value={price} onChange={(e)=>setprice(e.target.value)} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Cover Pic</Form.Label>
        <Form.Control type="file" placeholder="Add Cover Pic"  onChange={(e)=>setpic(e.target.files[0])}/>
      </Form.Group>
      
      
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
    </div>
  );
}

export default Listing;