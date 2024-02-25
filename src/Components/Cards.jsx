import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useFirebase } from '../Context/firebase';
import {useState ,useEffect} from "react";
import { useNavigate } from 'react-router-dom';
function Cards(props) {
    const firebase= useFirebase();
    const navigate=useNavigate();
    const [url,setUrl]= useState(null);
useEffect(()=>{
firebase.getimage(props.image).then((images)=>{
    setUrl(images);
})
},[])

const redirect=()=>navigate(`/book/${props.id}`)
  return (
   
    <Card style={{ width: '18rem',height: '90%', margin:"10px", border:"2px solid black" }}>
      <Card.Img variant="top" src={url} />
      <Card.Body>
        <Card.Title>{props.name}</Card.Title>
        <Card.Text>
    This Book ({props.name}) Consist lot Of Good Research and this Book has Costs of Rs.{props.price}!
        </Card.Text>
        <Button variant="primary" onClick={redirect} >View</Button>
      </Card.Body>
    </Card>
    
  );
}

export default Cards;