import React,{useState} from 'react'
import authService from '../appwite/auth'
import { login } from '../store/authSlice'
import { useForm } from 'react-hook-form'
import { useDispatch , useSelector} from 'react-redux'
import{Link ,useNavigate} from 'react-router-dom'
import Input from './Input'
import logo from '../logo.png'

function SignUp() {
    const [error,setError] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {register,handleSubmit} = useForm();
    const signup = async(data)=>{
        try {
            setError("");
            const session = await authService.createAccount(data);
            if(session){
                const userData  = await authService.getCurrentUser();
                if(userData){
                    dispatch(login(userData));
                    window.alert("SignUp Successful");
                    navigate("/");
                }
            }
        } catch (error) {
          window.alert(error);
        }
    }
  return (
    <>
    <div className='p-2'> <img src={logo} alt="logo" width='150px' /> </div>
        <h2> Sign Up</h2>
        {error && <p>{error}</p>}

        <form onSubmit={handleSubmit(signup)}>
            <div className='container p-2'>
            <Input 
            label="Email:"
            type="email"
            className="m-2"
            placeholder="Enter your email here"
            {...register("email",{
                require:true
            })}/>
            <Input
          label = "Password:"
          type= "Password"
          className="m-2"
          placeholder = "Enter your password"
          {...register("password",{
            required:true,
          })}
          />
          </div>
          <button className='m-2' type="submit">Sing Up</button>
        </form>
        <p>Already have a account 
            <Link to="/login">Log IN</Link>
        </p>
      </>
  )
}

export default SignUp
