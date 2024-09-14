import React,{useCallback, useState} from 'react'
import { useForm } from 'react-hook-form'
import Input from '../Input'
import Select from '../Select'
import RET from '../RET'
import service from '../../appwite/config'
import {useNavigate} from 'react-router-dom'
import { useSelector } from 'react-redux'
import Button from 'react-bootstrap/Button';

function PostForm({post}) {
    const {register,handleSubmit,watch ,setValue,control,getValues} = useForm({
        defaultValues:{
            title:post?.title || '',
            slug:post?.$id ||'',
            content : post?.content || '',
            status:post?.status||'active',
        }
    })
    const  navigate = useNavigate();
    const userData = useSelector(state=>state.AuthReducer.userData)
    const [slg,setSlg] = useState();
    const [url,setUrl] = useState("");
    if(post){
        const fetchimage = async()=>{
            const p= await service.getFilePrivies(post.Image).then((post)=>(post.href));
            if(p){
              setUrl(p);
            }else{
              
            }
          }
          fetchimage();
    }
    const submit = async(data)=>{
        if(post){
           try{
            const file = data.image[0]?await service.uploadFile(data.image[0]):null;
            if(file){
                
                console.log(file.$id)
                if(post.Image !== "active")service.deleteFile(post.Image)
                    data.Image = file.$id;
            }
            const dbpost = await service.updatePost(
                {slug:post.$id,
                    ...data,
                }
            )
            if(dbpost){
                navigate(`/post/${dbpost.$id}`)
            }
        }catch (error) {
            console.log("this is the Error : "+error);
        }

        }else{
            const file = await service.uploadFile(data.image[0]);
            if(file){
                const fileID = file.$id
                data.Image = fileID
                console.log(data);
                const dbpost = await service.createPost({
                    ...data,
                    user_Id:userData.$id,
                })
                if(dbpost){
                    navigate(`/post/${dbpost.$id}`)
                }
            }else{
                console.log("failed")
            } 
        }
    }
    const  slugTransform=useCallback((value)=>{
        if(value && typeof value ==='string'){
            return value.trim().toLowerCase().replace(/\s/g,'-')
        }
        return (value && typeof value ==='string')
    },[])

    function imagePreview(e){
        console.log("clicked");
    }
    // React.useEffect(()=>{
    //     const subscription = watch((value,{name})=>{
    //         if(name === 'title'){
    //             setValue('slug',slugTransform(value.title,{shouldValidate:true}))
    //         }
    //     });
    //     return ()=>subscription.unsubscribe()
    // },[watch,slugTransform,setValue])
  return (
    <div>
      <form onSubmit={handleSubmit(submit)}>
        <Input label = "Title : "
        placeholder="Title"
        {...register("title",{required:true})}
        onInput={(e)=>{
            
            setValue("slug",slugTransform(e.currentTarget.value),{
                shouldValidate:true
            })
        }}
        />
 
        <Input label = "Slug : "
        placeholder="slug"
        {...register("slug",{required:true})}
        />
        <RET label="Content : " name="content" control={control} defaultValue={getValues("content")}/>
        <Input label="Featured Image :"
        type="file"
        onClick = {imagePreview} 
        {...register("image",{required:!post})}/>

        {(post)&&<span><img src={url} alt="Image Preview" width='100px' height='100px'/></span>}
        {console.log(url)}
        <Button type='submit' variant="primary">Submit</Button>{' '}
      </form>
    </div>
  )
}

export default PostForm
