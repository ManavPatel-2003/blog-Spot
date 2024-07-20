import React from 'react'
import { useState, useEffect } from 'react'
import appwriteService from '../appwrite/config'
import { Container, PostCard } from '../components'
import PostLoader from '../components/loaders/PostLoader'
function AllPosts() {
    

    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true);

    useEffect( ()=> {
        if(posts.length == 0){
            setLoading(true)
        }
        else{
            setLoading(false)
        }
    }, [posts])

    appwriteService.getPosts([]).then( (posts) => {
        if(posts){
            // console.log(posts.documents)
            setPosts(posts.documents)
        }
    })

    // console.log(loading)
  return (
    

    <div className='w-full py-8'>
        
        <Container>
        {
            loading && <><PostLoader /> <PostLoader /></>
        }
            {/* <div className='flex flex-wrap'> */}
                {
                    posts.map(
                        (post) => (
                                <PostCard {...post} key={post.$id}/>
                        )
                    )
                }
            
            {/* </div> */}
        </Container>
    </div>
  )
}

export default AllPosts
