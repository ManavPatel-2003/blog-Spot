import React, { useEffect, useState } from 'react'
import appwriteService from "../appwrite/config"
import { Link } from 'react-router-dom'
import parse from "html-react-parser";
import { FaHeart } from 'react-icons/fa';
import { IconContext } from 'react-icons';
import { useSelector } from 'react-redux';

function PostCard({$id, content, $createdAt, title, featuredImage, userName}) {
  const date = new Date($createdAt)
  const postDate = date.getDate()
  const postMonth = date.toLocaleString('default', {month: 'long'})
  const postYear = date.getFullYear()
  const userData = useSelector((state) => state.auth.userData)
  const[like, setLike] = useState()
  const[numLikes, setnumLikes] = useState()

  useEffect( ()=> {
    appwriteService.isLiked($id, userData.$id).then( (like) => {
      if(like){
        // console.log("Already liked")
        setLike(true)
      }
      else{
        setLike(false)
      }
    })
    appwriteService.getNumLikes($id).then( (numLikes) => setnumLikes(numLikes) )
    // console.log("now")
  }, [])
  
  function handleLike() {
    if(like===false){
      // console.log("df")
      setLike(true)
      appwriteService.addLike($id, userData.$id).then(
        () => {
          appwriteService.getNumLikes($id).then( (numLikes) => setnumLikes(numLikes) )
          // console.log("updated!!")
        }
      );
      setTimeout( () => {
        
      },500)
      
    }
    else if(like===true){
      setLike(false)
      appwriteService.removeLike($id, userData.$id).then( 
        () => {
          appwriteService.getNumLikes($id).then( (numLikes) => setnumLikes(numLikes) )
          // console.log("updated!!")
        }
      );
    }
  }
  
  useEffect( ()=> {
    handleLike()
  }, [])

  
  return (
    
      
      <div className="px-2 py-2">
        <article className="mx-auto my-10 flex max-w-md flex-col rounded-2xl bg-white px-4 shadow md:max-w-5xl md:flex-row md:items-center">
        <Link to={`/post/${$id}`}>
          <div className="shrink-0 my-4 md:mr-8 md:max-w-sm">
            <img className="rounded-2xl" src={appwriteService.getFilePreview(featuredImage)} alt="" />
          </div>
        </Link>
          <div className="py-4 sm:py-8">
          <Link to={`/post/${$id}`}>
            <p className="mb-6 block text-2xl font-medium text-gray-700">{title}</p>
          
            <p className="mb-6 text-gray-500">{parse(content)}</p>
          </Link>
            <div className="flex gap-8 flex-row items-center">
                <svg className="w-10 h-10 me-3 text-gray-200 dark:text-gray-700" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z"/>
                </svg>
                <p className="ml-0 w-22">
                  <strong className="block font-medium text-gray-700">{userName}</strong>
                  <span className="text-sm text-gray-400">{`${postDate} ${postMonth}, ${postYear}`}</span>
                </p>
                <button type="button" onClick={handleLike}>
                    {/* <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"> */}
                    {!like?(
                    <IconContext.Provider value={{ color: 'gray'}}>
                      <FaHeart /> <>{`${numLikes===undefined?0:numLikes} likes`}</>
                    </IconContext.Provider>
                    ):
                    (
                      <IconContext.Provider value={{ color: 'red'}}>
                      <FaHeart /> <>{`${numLikes===undefined?0:numLikes} likes`}</>
                    </IconContext.Provider>
                    )
                    }
                    {/* </span> */}
                </button>
            </div>
          </div>

        </article>
      </div>

    
  )
}


export default PostCard
