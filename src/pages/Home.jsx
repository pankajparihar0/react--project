import {React,useEffect, useState} from 'react'
import{Link ,useNavigate} from 'react-router-dom'
import AllPost from './AllPost'
import service from '../appwite/config';
import { useDispatch,useSelector } from 'react-redux';
import { loadPost,removePosts } from '../store/postSlice';
import PostCard from '../components/PostCard';
import { setPageNo } from '../store/pageNo';
export default function Home() {
  // const [posts,setPosts] = useState([]);
const dispatch = useDispatch();
dispatch(setPageNo(1));

let posts = useSelector(state=>state.PostReducer.postData);
console.log(posts)
  // useEffect(()=>{
  //   const getPost = async()=>{
  //     try {
  //     const Data =  await service.getPosts(1,0);
  //     if(Data){
  //       dispatch(loadPost(Data.documents));
  //       setPosts(Data.documents)
  //     }else{
  //       console.log("error in dispating data");
  //     }
  //     } catch (error) {
  //       console.log("Error getting the post in redux",error);
  //     }
  //   }
  //   getPost();
  // },[]);
  

  if(posts.length !==0){
  
    return (
      <div className='container posts'>
        {
        posts.map((post) => (
          
          <div className='m-2' key={post.$id}>{
      
          }
            <PostCard post={post} />
          </div>
        ))}
      </div>
    );}else{
      return (
        <div className='container text-center mt-5 text-white'>
          <h3>There are NO posts yet!!</h3>
        </div>
      )
    }
}
