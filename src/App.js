import { useEffect, useState } from 'react';
import './App.css';
import { useDispatch,useSelector } from 'react-redux';
import authService from './appwite/auth';
import service from './appwite/config';
import {login , logout} from  './store/authSlice';
import { loadPost,removePosts } from './store/postSlice';
import { setPageNo } from './store/pageNo';
import Header from './components/header/Header'
import Footer from './components/footer/Footer'
import { Outlet } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import Loading from './components/Loading';

function App() {
  const [loading, setloading] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let pageno = useSelector(state=>state.PageReducer.page);
  let offset =(parseInt) (pageno-1)*4;

  // const getPost = async()=>{
  //   try {
  //    const Data =  await service.getPosts(4,0);
  //    if(Data){
  //     dispatch(loadPost(Data.documents));
  //    }else{
  //     console.log("error in dispating data");
  //    }
  //   } catch (error) {
  //     console.log("Error getting the post in redux",error);
  //   }
  // }
  // getPost();


  useEffect(()=>{
    const getPost = async()=>{
      try {
        console.log("hgfdsdfghjk")
       const Data =  await service.getPosts(4,offset);
       if(Data){
        dispatch(loadPost(Data.documents));
       }else{
        console.log("error in dispating data");
       }
      } catch (error) {
        console.log("Error getting the post in redux",error);
      }
    }
   getPost();
    authService.getCurrentUser()
    .then((userdata)=>{
      if(userdata){
        let x = dispatch(login(userdata))
        console.log(x);
      }else{
        dispatch(logout());
        // navigate("/");
      }
    })
    .finally(()=>setloading(false))
  },[pageno]);
  
  return !loading ?(
  <>
  <Header/>
  <div className='outlet'>
  <Outlet />
  </div>
  <Footer/>
  </>
  ):<Loading/>;
  
}

export default App; 
