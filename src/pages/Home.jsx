import React, { useEffect, useState } from 'react'
import appwriteService from "../appwrite/config"
import { Container, PostCard } from '../components'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'


function Home() {
    const [posts, setPosts] = useState([])

    const authStatus = useSelector((state) => state.auth.status)
    const userData = useSelector((state) => state.auth.userData)



    useEffect( ()=> {

    }, [])
    
    if(posts.length === 0){
        return (
            // <div className='w-full py-8 mt-4 text-center'>
            //     <Container>
            //         <div className='flex flex-wrap'>
            //             <div className='p-2 w-full'>
            //                 {
            //                 !authStatus && (
            //                 <h1 className='text-2xl font-bold hover:text-gray-500'>
            //                     Login to view posts
            //                 </h1>
            //                 )
            //                 }

            //                 {
            //                     authStatus && (
            //                         <h1 className='text-2xl font-bold'>
            //                             Welcome!! {userData.name}
            //                         </h1>
            //                     )
            //                 }
            //             </div>
            //         </div>
            //     </Container>
            // </div>
            <section className="bg-white">
            <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-0 lg:grid-cols-12">
                <div className="mr-auto place-self-center lg:col-span-7">
                    <h1 className="max-w-2xl mb-4 text-4xl font-extrabold leading-none md:text-5xl xl:text-6xl">Connecting the World</h1>
                    <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl">The ultimate platform for sharing moments, ideas, and dreams. Join the community and explore!</p>
        
                    <Link to={authStatus?'/all-posts':'/login'}>
                        <div className="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300">
                            Explore Posts
                            <svg className="w-5 h-5 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                        </div>
                    </Link>
                    
                </div>
                <div className="hidden sm:mt-10 sm:col-span-5 sm:flex" >
                    <img src="https://images.pexels.com/photos/1310044/pexels-photo-1310044.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" className="object-scale-down drop-shadow-md rounded-md m-auto" alt="mockup" />
                </div>             
            </div>
            </section>
        )
    }
}


export default Home
