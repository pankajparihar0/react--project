import React from 'react'
import authService from '../../appwite/auth';
import Logoutbtn from './Logoutbtn';
import {Link} from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import LoginBtn from '../LoginBtn';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import logo from '../../logo.png'

export default function Header() {
    const authstatus = useSelector(state=>state.AuthReducer.status);
    const navigate = useNavigate(); 
    const navItems = [
        {
          name : 'Home',
          slug:"/",
          active:true
        },
        
        {
          name:"All Post",
          slug:"all_post",
          active: authstatus
        },{
          name:"Add Post",
          slug:"add_post",
          active:authstatus
        }
    ]
  return (
<>
    {/* <div>
      <header>
        <nav>
          <div>
            <Link to='/'>
            LOgO
            </Link>
          </div>
          <ul className='flex '>
            {navItems.map((item)=>
            item.active?(
              <li key={item.name}>
                <button onClick={()=>navigate(item.slug)}>{item.name}</button>
              </li>
            ):null
            )}
            {(authstatus)?
            <li>
              <Logoutbtn/>
            </li>
            :
            <li>
              <LoginBtn/>
            </li>
            }
          </ul>
        </nav>
      </header>
    </div> */}


<Navbar expand="lg" className="nav">
      <Container>
        <Navbar.Brand > <Link to="/"><img src={logo} width="100px"/></Link></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse className='mx-auto justify-content-end' id="basic-navbar-nav">
          <Nav  className="mx-6 ">
          {navItems.map((item)=>
            item.active?(
              <Nav.Link  key={item.name}><Link to={item.slug}>{item.name}</Link></Nav.Link>
            ):null
            )}
            {(authstatus)?
              <Logoutbtn/>
            :
              <LoginBtn/>
            }
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </>
  )
}
