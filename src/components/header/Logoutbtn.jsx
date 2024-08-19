import React from 'react'
import { useDispatch} from 'react-redux';
import authService from '../../appwite/auth';
import { logout } from '../../store/authSlice';
import Button from 'react-bootstrap/Button';

export default function Logoutbtn() {
    const dispatch = useDispatch();
    const logoutHandler = ()=>{
        authService.logout().then(()=>{
            dispatch(logout())
        })
    }
  return (
    // <button className='bg-danger' onClick={logoutHandler}>Logout</button>
    <Button onClick={logoutHandler} variant="danger">LogOut</Button>
  )
}
