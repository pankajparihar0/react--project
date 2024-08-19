import React, { useEffect, useState } from 'react'
import Service from "../appwite/config"
import { Link } from 'react-router-dom'

export default function PostCard({post}) {
  const [url,setUrl] = useState("");

useEffect(()=>{
  const fetchimage = async()=>{
    const p= await Service.getFilePrivies(post.Image).then((post)=>(post.href));
    if(p){
      setUrl(p);
    }else{
      
    }
  }
  fetchimage();
},[]);
console.log(post.$id);
  return (
    <Link to={`/post/${post.$id}`}>
      <div className='post-card'> 
        <div className='post-image'>
            <img  src={url} />
        </div>
        <h5>{post.title}</h5>
      </div>
    </Link>
  )
}
