import { useState } from 'react'
import Register from './Pages/Register';
import "bootstrap/dist/css/bootstrap.min.css";
import Button from 'react-bootstrap/Button';
import { Routes,Route } from 'react-router-dom';
import  {useFirebase} from "./Context/firebase.jsx"
import  Login from "./Pages/Login.jsx";
import NAVBAR from './Components/Navbar.jsx';
import Listing from './Pages/Listing.jsx';
import Home from './Pages/Home.jsx';
import Details from './Pages/Details.jsx';
import OrderPage from './Pages/Order.jsx';
function App() {
  const firebase= useFirebase();
  console.log("firebase",firebase);
  return (
    <>
<div><NAVBAR/></div>
<Routes>
<Route path='/register' element={<Register />}></Route>
<Route path='/' element={<Home/>}></Route>
<Route path='/login' element={<Login />}></Route>
<Route path='/book/listings' element={<Listing/>}></Route>
<Route path='/book/:bookid' element={<Details/>}></Route>
<Route path='/book/:bookid/orderPage' element={<OrderPage/>}></Route>

</Routes>

    </>
  )
}

export default App
