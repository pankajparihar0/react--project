import React,{useState} from 'react'
import{Link ,useNavigate} from 'react-router-dom'
import {login as  authLogIn} from '../store/authSlice'
import Input from './Input'
import { useDispatch } from 'react-redux'
import authService from '../appwite/auth'
import {useForm} from "react-hook-form"
import logo from '../logo.png'
function Login() {
    const navigate = useNavigate();
    const dispatch =useDispatch();
    const{register,handleSubmit} = useForm();
    const[error,setError] = useState("")

    const login=async(data)=>{
        setError("")
        try {
            const session = await authService.login(data);
            if(session){
                const userData=await authService.getCurrentUser();
                if(userData){
                  dispatch(authLogIn(userData));
                  navigate("/");
                }
                }else{
                  setError("Invailid UserName/Password")
                  navigate("/login");
                }
                
        
        } catch (error) {
          
        }
    }
  return (
    <div className='text-white'>
      <div className='p-2'> <img src={logo} alt="logo" width='150px' /> </div>
      <h2>Log In</h2>
      {error && <p className={'text-danger'}>{error}</p>}
      <form onSubmit={handleSubmit(login)}>
        <div className='container p-2 '>
            <Input
            label="Email:"
            placeholder="Enter your email"
            type = "email"
            className="m-2"
            {...register("email",{
              required:true,
              // validate:{
              //   matchPatern:(value)=>/^\w+/.test(value)||"Email address must be a valid address",
              // }
            })}/>
          
          <Input
          label = "Password:"
          type= "Password"
          placeholder = "Enter your password"
          className="m-2 password"
          {...register("password",{
            required:true,
          })}
          />
          <button className='m-2' type="submit">Log IN</button>
        </div>
      </form>
      <p>Don't have any account 
        <Link to="/signup"> Sign UP</Link>
      </p>
    </div>
  )
}

export default Login
