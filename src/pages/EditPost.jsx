import React, { useState,useEffect } from 'react'
import service from '../appwite/config';
import { useParams } from 'react-router-dom'
import PostForm from '../components/PostForm/PostForm';

function EditPost() {
    const slug=useParams();
    const [posts,setPosts] = useState({});
    const [loading,setLoading] = useState(false);
    useEffect(()=>{
        const fetchpost = async() =>{
            try {
                const p  =  await service.getPost(slug.slug);
                if(p){
                    setPosts(p);
                    setLoading(true);
                }else{
                    console.log("no post found");
                }
            } catch (error) {

                console.log(error);
            }
        }
        
        fetchpost();  
    },[]);
    
  return loading? (
    <div className="container p-3 addform text-white">
   <PostForm post={posts}/>
    </div>
  ):<div>hiii</div>;
}

export default EditPost
