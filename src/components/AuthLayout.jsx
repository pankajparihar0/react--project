import HTMLReactParser from 'html-react-parser/lib/index';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import{Link ,useNavigate} from 'react-router-dom'


function Protected({children,authentication=true}) {
    const navigate = useNavigate()
    const [loader,setLoader] = useState(true)
    const authStatus = useSelector(state => state.AuthReducer.status)

    useEffect(()=>{
        if(authentication && authStatus !== authentication){
 
            navigate("/login")
        }else if(!authentication && authStatus !== authentication ){
            navigate("/")
        }
        setLoader(false)
    },[authStatus,navigate,authentication])
  return loader ? <h2>loading</h2> : <>{children}</>
}

export default Protected;