import { useEffect, useState } from 'react';
import './App.css';
import { useDispatch } from 'react-redux';
import authService from './appwite/auth';
import {login , logout} from  './store/authSlice';
import Header from './components/header/Header'
import Footer from './components/footer/Footer'
import { Outlet } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

function App() {
  const [loading, setloading] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(()=>{
    authService.getCurrentUser()
    .then((userdata)=>{
      if(userdata){
        dispatch(login(userdata))
      }else{
        dispatch(logout());
        // navigate("/");
      }
    })
    .finally(()=>setloading(false))
  },[]);
  return !loading ?(
  <>
  <Header/>
  <div className='outlet'>
  <Outlet />
  </div>
  <Footer/>
  </>
  ):null;
  
}

export default App; 
