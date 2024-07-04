import { Logo } from '@/Components/Nav'
import { Search } from 'lucide-react'
import React from 'react'

const Videos = () => {
  return (
    <div>
        <div className="top flex items-center justify-between px-12 py-3">
            <Logo />

            <div className="search-box h-[50px]  rounded-2xl overflow-hidden w-[500px] relative">
                <input type="text" className="w-full h-full p-3 bg-gray-200 border-none" />
                <div className="h-full w-[50px] flex items-center justify-center absolute top-0 right-0 border-l-2 border-black border-opacity-20">
                    <Search />
                </div>
            </div>

            <div className="flex items-center">
                <div className="rounded-full h-[50px] w-[50px] overflow-hidden border"></div>
            </div>
        </div>
    </div>
  )
}

export default Videos