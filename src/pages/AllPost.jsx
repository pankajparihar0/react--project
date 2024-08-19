import React, { useEffect, useState } from 'react'
import PostCard from '../components/PostCard'
import service from '../appwite/config'

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
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    // Fetch posts when the component mounts
    const fetchPosts = async () => {
      try {
        const fetchedPosts = await service.getPosts([]);
        if (fetchedPosts) {
          setPosts(fetchedPosts.documents || []);
        }
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []); // Empty dependency array to ensure this runs only once
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
