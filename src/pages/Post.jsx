import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import service from '../appwite/config'
import authService from '../appwite/auth'
import { useNavigate } from 'react-router-dom'
import { useSelector,useDispatch } from 'react-redux'
import parse from 'html-react-parser';
import { Button } from 'react-bootstrap'

function Post() {
    const userdata = useSelector(state=>state.AuthReducer.userData);
    const slug = useParams();
    const navigate = useNavigate();
    const [post,setPost] = useState({});
    const [url,setUrl] = useState("");
    const [content,setContent] = useState("");
    const [title,setTitle] = useState("");
    const logedUser =userdata&&userdata.$id;
    const[auther,setAuther] = useState(false);
    let uID ;
    console.log(slug.slug);
    useEffect(()=>{
        const fetchpost = async() =>{
            try {
                const p  =  await service.getPost(slug.slug);
                if(p){
                  uID=p.user_id;
                setPost(p);
                setUrl(p.Image);
                setTitle(p.title);
                setContent(p.content);
                uID=p.user_Id;
                if(uID === logedUser){
                  setAuther(true);
                }
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
            if(s){
              document.getElementById('post-img').style.backgroundImage=`url(${s})`;
            }else{
              
            }
          }
        fetchpost();
        
    },[]);
const deletepost = async (slug)=>{
try {
  console.log(post.Image);
  const fde = await service.deleteFile(post.Image)
  const de=await service.deletePost(slug.slug.slug);
  if(de)
    {
      alert("post deleted")
      navigate("../")
    }

 
  
} catch (error) {
  console.log(error)
  alert(error);
}
}
const edit=(slug)=>{
  console.log(slug.slug.slug);
  navigate(`../edit_post/${slug.slug.slug}`);
}

  return (
    <div className='container p-2 post text-white'>
        <div className='post-header d-flex flex-row justify-content-end'>
        { auther&&<><Button onClick={()=>(edit({slug}))} className='p-2 m-2' variant="primary">Edit</Button>
        <Button className='p-2 m-2' onClick={()=>deletepost({slug})} variant="danger">Delete</Button></>
        }
        </div>
        <div id="post-img" className='post-img'>
        </div>
        <div className='post-body'>
            <h2 className='p-3 post-title'>{title}</h2>
            <div className='p-3 post-content'>{parse(`${content}`)}</div>
        </div>
    </div>
  )
}

export default Post
