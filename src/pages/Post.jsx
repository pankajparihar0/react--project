import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import service from '../appwite/config'
import authService from '../appwite/auth'
import { useNavigate } from 'react-router-dom'
import { useSelector,useDispatch } from 'react-redux'

function Post() {
    const navigate = useNavigate();
    const userdata = useSelector(state=>state.userData);
    const slug = useParams();
    const [post,setPost] = useState({null:null});
    const [url,setUrl] = useState("");
    const [content,setContent] = useState("");
    const [title,setTitle] = useState("");
    console.log(slug.slug);
    useEffect(()=>{
        const fetchpost = async() =>{
            try {
                const p  =  await service.getPost(slug.slug);
                if(p){
                setPost(p);
                setTitle(p.title);
                setContent(p.content);
                fetchimage(p);
                }else{
                    console.log("no post found");
                }
            } catch (error) {
                console.log(error);
            }
        }
        const fetchimage = async(p)=>{
            const s= await service.getFilePrivies(p.Image).then((ps)=>ps.href);
            console.log(s);
            if(s){
              setUrl(s);
            }else{
              
            }
          }
        fetchpost();
        
        
    },[]);
    console.log(title)
  return (
    <div className='container p-4 post text-white'>
        <div className='post-header'></div>
        <div className='post-img'>
            <img src={url} />
        </div>
        <div className='post-body'>
            <h2 className='post-title'>{title}</h2>
            <div className='post-content'>{content}</div>
        </div>
    </div>
  )
}

export default Post
