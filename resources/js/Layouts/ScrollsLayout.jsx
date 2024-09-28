import { Link } from '@inertiajs/react';
import { Camera, GalleryHorizontalEnd, Home, Menu, RadioTower, Search, UserCircle2 } from 'lucide-react'
import React, { useState } from 'react'
import RootLayout from './RootLayout';

const ScrollsLayout = ({ children }) => {
    const navs = [
        {
            name: 'House',
            icon: <Home size={25}/>,
            link: '/',
        },
        {
            name: 'Explore',
            icon: <GalleryHorizontalEnd size={25}/>,
            link: '/ads',
        },
        {
            name: 'Live',
            icon: <RadioTower size={25}/>,
            link: '/',
        },
        {
            name: 'Profile',
            icon: <UserCircle2 size={25}/>,
            link: '/profile',
        },
    ];

    const [menu, setMenu ] = useState(false);
  return (
    <RootLayout className="h-screen w-screen overflow-none">
        <nav className="min-[680px]:shadow relative px-6">
            <div className="flex items-center justify-between ">
                <div className="logo w-[150px] h-[55px] relative -left-5">
                    <img src="/images/logo-blue.png" alt="" className="object-cover h-full w-full" />
                </div>

                <div className="flex items-center max-[900px]:hidden">
                    <button className="bg-blue-500 font-semibold text-center text-white rounded-xl py-2 px-3">Advertise on Myadmo</button>
                </div>

                <div onClick={() => setMenu(!menu)} className="min-[900px]:hidden flex items-center justify-center scale-x-110">
                    <Menu />
                </div>
            </div>

            <div className="search-box absolute max-[680px]:relative max-[680px]:w-full min-[680px]:top-1/2 min-[680px]:left-1/2 min-[680px]:-translate-x-1/2 min-[680px]:-translate-y-1/2 h-[40px] w-[380px]">
                <input type="text" placeholder="search" className="h-full w-full px-3 py-1 5 border border-gray-200 rounded-lg outline-none" />
                <div className="search absolute top-0 right-0 flex items-center justify-center h-full w-[40px]">
                    <Search size={18}/>
                </div>
            </div>
        </nav>

        <main className="dashboard">

            <div className={`left w-[258px] h-full border-x px-3 max-[900px]:fixed  ${menu ? 'right-0' : '-right-[200vw]'}`} >
                <div className="">
                    {navs.map( item => 
                        <Link key={item.name} href={item.link} className="flex items-center hover:bg-gray-100 hover:text-wite my-3 rounded-xl">
                            <div className="icon h-[50px] w-[40px] mr-1.5 flex items-center justify-center">
                                {item.icon}
                            </div>
                            <div className="text-lg scale-90 font-medium">{item.name}</div>
                        </Link>
                    )}
                </div>

                <p className="text-gray-500 px-3">Login to earn points and increase our view count</p>

                <div className="px-3 mt-6">
                    <button className="bg-blue-500 font-semibold text-center text-white rounded-xl py-2 px-3 w-full mb-3">Log In</button>
                    <button className="bg-blue-500 font-semibold text-center text-white rounded-xl py-2 px-3 w-full min-[901px]:hidden">Advertise on Myadmo</button>
                </div>
            </div>

            <div className="right h-full overflow-y-scroll scrollbar-thin relative">
                {children}
            </div>
        </main>
    </RootLayout>
  )
}

export default ScrollsLayout;