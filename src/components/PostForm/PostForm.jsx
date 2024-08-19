import React,{useCallback, useState} from 'react'
import { useForm } from 'react-hook-form'
import Input from '../Input'
import Select from '../Select'
import RET from '../RET'
import service from '../../appwite/config'
import {useNavigate} from 'react-router-dom'
import { useSelector } from 'react-redux'

function PostForm({post}) {
    const {register,handleSubmit,watch ,setValue,control,getValues} = useForm({
        defaultValues:{
            title:post?.title || '',
            slug:post?.slug ||'',
            content : post?.content || '',
            status:post?.status||'active',
        }
    })
    const  navigate = useNavigate();
    const userData = useSelector(state=>state.userData)
    const [slg,setSlg] = useState();
    const submit = async(data)=>{
        if(post){
           const file =  data.image[0]?service.uploadFile(data.image[0]):null
            if(file){
                service.deleteFile(post.featuredImage)
            }
            const dbpost = await service.updatePost(
                (post.$id,{
                    ...data,
                    featuredImage:file?file.$id:undefined,
                })
            )
            if(dbpost){
                navigate('/post/${dbpost.$id}')
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
        <Input label = "title :"
        placeholder="Title"
        {...register("title",{required:true})}
        onInput={(e)=>{
            
            setValue("slug",slugTransform(e.currentTarget.value),{
                shouldValidate:true
            })
        }}
        />
 
        <Input label = "slug :"
        placeholder="slug"
        {...register("slug",{required:true})}
        />
        <RET label="Content :" name="content" control={control} defaultValue={getValues("content")}/>
        <Input label="Featured Image :"
        type="file"
        {...register("image",{required:!post})}/>
        <input type='submit' value='submit'></input>
      </form>
    </div>
  )
}

export default PostForm
