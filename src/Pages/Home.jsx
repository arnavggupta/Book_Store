import React from 'react'
import { useFirebase } from '../Context/firebase'
import { useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import Cards from '../Components/Cards';
import CardGroup from 'react-bootstrap/CardGroup';
export default function Home() {
const firebase= useFirebase();


const navigate= useNavigate();
const [docs,setdocs]= useState([]);


useEffect(()=>{
  
if(firebase.isloggedin()===false){
  navigate("/login"); 
}

},[])

useEffect(
    ()=>{
        firebase.getListing().then((doc)=>setdocs(doc.docs));
    }
    ,[])



  return (
    <div>
        
    <CardGroup>   
{docs.map((book)=>{
   
   return (

    <li>{<Cards key={book.id}  id={book.id} name={book.data().name} price={book.data().price} image={book.data().urlimage
    }/>}</li>
   )
})}
</CardGroup>
        </div>



  )
}
