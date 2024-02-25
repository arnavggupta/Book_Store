import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from 'react-router-dom';
import { useFirebase } from '../Context/firebase';
function NAVBAR(){
const navigate=useNavigate();
const firebase=useFirebase()

const handleLogout = async (e) => {
  e.preventDefault();
  try {
    await firebase.logout();
    console.log("Logged out");
    // navigate("/login", { replace: true });
window.location.href="/login";
  } catch (err) {
    console.log(err);
  }
};

return(
<>

<Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand onClick={()=>navigate("/")} href="/">Book Store</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/book/listings">Add Listing</Nav.Link>
          
            <Nav.Link  href="#" onClick={handleLogout}>
              Logout
            </Nav.Link>
        

          </Nav>
        </Container>
      </Navbar>
</>
)

}
export default NAVBAR;