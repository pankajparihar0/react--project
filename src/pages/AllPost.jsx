import React, { useEffect, useState } from 'react'
import PostCard from '../components/PostCard'
import service from '../appwite/config'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loadPost } from '../store/postSlice';
import Pagination from 'react-bootstrap/Pagination';
import { setPageNo } from '../store/pageNo';


// export default function AllPost() {
  
//     const [posts,setPost]= useState([]);
//     useEffect(()=>{},[]);
//     service.getPosts([]).then((posts)=>{
//         if(posts){
//             setPost(posts.documents)
//         }
//     })
//     return (
//     <div>
//       {posts.map((post)=>(
//         <div key={post.$id}>
//             <PostCard post={post}/>
//         </div>
//       ))}
//     </div>
//   ) 
// }

export default function AllPost() {
  const dispatch = useDispatch();
  //const [posts,setPosts] = useState([]);
  let posts = useSelector(state=>state.PostReducer.postData);
  const[l,setL] = useState(0);
  let pages =(parseInt) (l/5+1);

  let active =useSelector(state=>state.PageReducer.page);
  let items = [];
  for (let number = 1; number <= pages; number++) {
    items.push(
      <Pagination.Item onClick={()=>dispatch(setPageNo(number))} key={number} active={number === active}>
        {number}
      </Pagination.Item>,
    );
  }
  useEffect(()=>{
    async function len(){
      let x=await service.totalPost();
      console.log(x.documents.length);
      setL(x.documents.length);
    }
    len();
    // const getPost = async()=>{
    //   try {
    //   const Data =  await service.getPosts(4,offset);
    //   if(Data){
    //     dispatch(loadPost(Data.documents));
    //     setPosts(Data.documents)
    //   }else{
    //     console.log("error in dispating data");
    //   }
    //   } catch (error) {
    //     console.log("Error getting the post in redux",error);
    //   }
    // }
    // getPost();
  },[]);
  
  // useEffect(() => {
  //   // Fetch posts when the component mounts
  //   const fetchPosts = async () => {
  //     try {
  //       const fetchedPosts = await service.getPosts([]);
  //       if (fetchedPosts) {
  //         setPosts(fetchedPosts.documents || []);
  //       }
  //     } catch (error) {
  //       console.error('Error fetching posts:', error);
  //     }
  //   };

  //   fetchPosts();
  // }, []); // Empty dependency array to ensure this runs only once
  if(posts.length !==0){
  
  return (
    <>
    <div className='container posts'>
      {
      posts.map((post) => (
        
        <div className='m-2' key={post.$id}>
          <PostCard post={post} />
        </div>
      ))}

    </div>
    <div className='pages'>
    <Pagination>{items}</Pagination>
  </div>
    </>
  );}else{
    return (
      <div className='container text-center mt-5 text-white'>
        <h3>There are NO posts yet!!</h3>
      </div>
    )
  }
}
