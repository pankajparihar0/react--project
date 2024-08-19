import Button from 'react-bootstrap/Button';
import React from 'react'
import { useNavigate } from 'react-router-dom'

function LoginBtn() {
    const navigate = useNavigate();
    const handleclick=()=>{
        navigate("/login");
    }
  return (
    <>
    {/* <button onClick={handleclick} >LogIn</button> */}
    <Button onClick={handleclick} variant="primary">LogIn</Button>{' '}
    </>
  )
}

export default LoginBtn
