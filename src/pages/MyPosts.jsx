import React from 'react'
import { useState, useEffect } from 'react'
import appwriteService from '../appwrite/config'
import { Container, PostCard } from '../components'
import { useSelector } from 'react-redux'
import { Query } from 'appwrite'
import PostLoader from '../components/loaders/PostLoader'
import NoPosts from '../components/messages/NoPosts'

function MyPosts() {

    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true);
    const userData = useSelector( (state) => state.auth.userData);

    // console
    useEffect( ()=> {
        if(posts.length == 0){
            setLoading(true)
        }
        else{
            setLoading(false)
        }
    }, [posts])

    useEffect(
        () => {
            appwriteService.getPosts([Query.equal("status", "active"), Query.equal("userId", userData.$id)]).then( (posts) => {
                if(posts){
                    // console.log(posts.documents)
                    if(posts.documents.length==0){
                        setPosts(["no posts"])
                    }
                    else{
                        setPosts(posts.documents)
                    }
                }
            })
        }
    ,[])


  return (
    <div className='w-full py-8'>
        <Container>
            
            {/* <div className='flex flex-wrap'> */}
            {
                loading && <><PostLoader /> <PostLoader /></>
            }
                {
                    
                    posts[0]!="no posts"?posts.map(
                        (post) => (
                                <PostCard {...post} />
                        )
                    ):<NoPosts />
                }
            
            {/* </div> */}
        </Container>
    </div>
  )
}

export default MyPosts
