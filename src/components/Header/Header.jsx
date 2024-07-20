import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Container, Logo, LogoutBtn } from '../index'
import { useNavigate } from 'react-router-dom'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'

function Header() {
  const authStatus = useSelector((state) => state.auth.status)
  const userData = useSelector((state) => state.auth.userData)
  const navigate = useNavigate()

  const navItems = [
    {
      name: 'Home',
      slug: '/',
      active: true
    },
    {
      name: 'Login',
      slug: '/login',
      active: !authStatus 
    },
    {
      name: 'Signup',
      slug: '/signup',
      active: !authStatus 
    },
    {
      name: 'All Posts',
      slug: '/all-posts',
      active: authStatus 
    },
    {
      name: 'Add Posts',
      slug: '/add-post',
      active: authStatus 
    },
    {
      name: 'My Posts',
      slug: '/my-posts',
      active: authStatus 
    }
  ]
  return (
    // <header className='py-3 shadow bg-gray-500'>
    //   <Container>
    //     <nav className='flex'>
    //       <div className='mr-4'>
    //         <Link to='/'>
    //           <Logo width='70px'/>
    //         </Link>
    //       </div>
    //       <ul className='flex ml-auto'>
    //         {
    //           navItems.map( 
    //             (item) => 
    //               item.active ? (<li key={item.name}><button className='inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full' onClick={() => navigate(item.slug)}>{item.name}</button></li>):null
    //           )
    //         }

            // {
            //   authStatus && (
            //     <li><LogoutBtn /></li>
            //   )
            // }

            // {
            //   authStatus
            //   && (
            //     <li><button className='inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'>Hello!! {userData.name}</button></li>
            //   )
            // }
    //       </ul>
    //     </nav>
    //   </Container>
    // </header>
    <header className="bg-white">
  <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
    <div className="flex lg:flex-1">
      <a href="#" className="-m-1.5 p-1.5">
        <span className="sr-only">Your Company</span>
        <img className="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="" />
      </a>
    </div>
    <div className="flex lg:hidden">
      <button type="button" className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700">
        <span className="sr-only">Open main menu</span>
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
        </svg>
      </button>
    </div>
    <div className="hidden lg:flex lg:gap-x-12">
      {
             navItems.map( 
                (item) => 
                   item.active ? (<button className='inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full' onClick={() => navigate(item.slug)}>{item.name}</button>):null
               )
      }
    </div>
    <div className="hidden lg:flex lg:flex-1 gap-x-12 lg:justify-end">
    {
              authStatus && (
                <button className='inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'>
                  Hello! {userData.name}
                </button>
              )
            }

            {
              authStatus
              && 
              (
                <Menu as="div" className="relative inline-block text-left">
                  <div>
                    <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                      Options
                      <ChevronDownIcon aria-hidden="true" className="-mr-1 h-5 w-5 text-gray-400" />
                    </MenuButton>
                  </div>

                  <MenuItems
                    transition
                    className="absolute right-0 z-10 mt-1 w-30 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                  >
                    <div className="py-1">
                        <MenuItem>
                          <LogoutBtn />
                        </MenuItem>
                    </div>
                  </MenuItems>
                </Menu>
              )
    }
    </div>
  </nav>
</header>

  )
}

export default Header
