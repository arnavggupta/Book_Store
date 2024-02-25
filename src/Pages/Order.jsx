import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { useFirebase } from '../Context/firebase';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
const OrderPage = () => {
  const firebase = useFirebase();
  const params= useParams();
const navigate= useNavigate();
  // console.log(params.bookid);
  // State to manage form inputs
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    landmark: '',
    pincode: '',
  });
  const [quantity, setQuantity] = useState(1);

  // Function to handle incrementing the quantity
  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  // Function to handle decrementing the quantity, with a minimum value of 1
  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  }

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const adddata=async ()=>{
await firebase.addorderes(params.bookid,formData,quantity).then(()=>{
setFormData({
  name:' ',
  email:" ",
  landmark:" ",
  pincode:' '
})
alert("Order added Successfully")
navigate("/")
}).catch((error)=>{
console.log(error);
});


  }
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // You can perform further actions with the form data here
    console.log('Form submitted:', formData);

adddata();


  };

  return (
    <>



    <Container className="my-5">
      <h1 className="mb-4">Order Page</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="name">
          <Form.Label>Name:</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="email">
          <Form.Label>Email:</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="Your Address">
          <Form.Label>Your Address:</Form.Label>
          <Form.Control
            type="text"
            name="landmark"
            value={formData.landmark}
            onChange={handleInputChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="pincode">
          <Form.Label>Pincode:</Form.Label>
          <Form.Control
            type="text"
            name="pincode"
            value={formData.pincode}
            onChange={handleInputChange}
            required
          />
        </Form.Group>
       
     
   
    <Button variant="success" type="submit" style={{marginTop:"10px"}} >
          Place Order
        </Button>

    </Form>

    <div style={{marginTop:"10px"}}>
      <label>Quantity:</label>
      <div>
        <button onClick={handleDecrement}>-</button>
        <span style={{marginLeft:"5px",marginRight:"5px"}}>{quantity}</span>
        <button onClick={handleIncrement}>+</button>
      </div>
    </div>

  
    </Container>
    </>
  );
};

export default OrderPage;
