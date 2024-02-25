import React from 'react'
import { useFirebase } from '../Context/firebase'
import { useEffect,useState } from 'react';
import { useParams } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
export default function Details(props) {
const firebase=useFirebase();
const param= useParams();
const navigate=useNavigate();
console.log(param.bookid);

const [url,seturl]=useState(null);
const [datas,setdatas]= useState(null);

useEffect(()=>{
  firebase.getdocbyid(param.bookid).then(value=>seturl(firebase.getimage(value.data().urlimage).then((images)=>{
    seturl(images);
})))
},[])

useEffect(()=>{
  firebase.getdocbyid(param.bookid).then(value=>setdatas(value.data())
)},[param])

console.log(datas); 

const redirect=()=>{navigate(`/book/${param.bookid}/orderPage`)};

if(!url){
  return (
    <h1>Loading....</h1>
  )
}
else{

  return (
    <div style={{ display: "flex" }}>
      <img width={"50%"} style={{ margin: "10px",height:"400px"}} src={url} alt={datas.name} />
      <div style={{ marginLeft: "30px" ,marginTop:"10px" }}>
        <h1>Book Name- {datas.name}</h1>
        <h4>ISBN: {datas.isbn}</h4>
        <h4>Author: {datas.username}</h4>
        <h4>ContactEmail: {datas.useremail}</h4>
        <h4 style={{color:"red"}}>Price: {datas.price} Rs</h4>
        <div style={{marginTop:"20px"}}>
        <h5>   Dive into the captivating world of "{datas.name}" written by {datas.username}. 
        This book offers a compelling narrative, exploring themes that resonate 
        with readers of all backgrounds. With an intriguing plot and well-developed 
        characters, it's a literary journey that you won't want to miss.</h5>
        {/* Add more details as needed */}
        </div>

        <div>
          <Button  variant='success' style={{marginTop:"10px"}} onClick={redirect} >Order Request</Button>
        </div>
      </div>
    </div>
  );
  
}
}


