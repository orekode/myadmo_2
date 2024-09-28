import { Scroller } from '@/Components'
import ScrollsLayout from '@/Layouts/ScrollsLayout'
import React from 'react'
import '@appnest/masonry-layout'
import { Coins, Play } from 'lucide-react'

import { useMediaQuery } from 'usehooks-ts'
import { Head, Link } from '@inertiajs/react'

const Scrolls = () => {
    const matches = useMediaQuery('(max-width: 680px)');
  return (
    <>

        <Head title="Explore" />

        <div className="sticky p-6 max-[680px]:py-1.5 top-0 left-0 w-full bg-white mt-1 z-10">
            <Scroller>
                {Array.from({length: 15}, item => 
                    <div className="px-3 py-1.5 bg-blue-50 border rounded-lg max-[680px]:text-xs">Category Name</div>
                )}
            </Scroller>
        </div>

        <div className="p-6 pt-0 relative z-0">

            <masonry-layout maxcolwidth={matches ? "340" : "420"} gap="20">
                {Array.from({length: 15}, item => 
                    <Link href='/ad'>
                        <div className="rounded-lg overflow-hidden relative">
                            <div className="h-[478px] max-[680px]:h-[300px] max-[730px]:h-[400px] w-full overflow-hidden rounded-lg relative">
                                <img src="/images/shopping_guy.jpg" alt="" className="h-full w-full object-cover rounded-lg" />
                                <div className="absolute bottom-0 text-white font-bold left-0 w-full bg-gradient-to-b from-transparent to-slate-800 p-3 flex items-center justify-between">
                                    <div className="flex gap-1.5 ">
                                        <Play />
                                        <span>6.5k</span>
                                    </div>

                                    <div className="span">00:33</div>
                                </div>
                            </div>
                            <div className="content max-[680px]:text-xs">
                                <div className="title my-1.5 font-semibold">Where every step feels like a dream. Savoring every second, one slow dance at...</div>
                                <div className="flex justify-between items-center my-3">
                                    <div className="left flex items-center gap-1.5">
                                        <div className="h-[30px] w-[30px] rounded-full overflow-hidden">
                                            <img src="/images/happy.jpg" className='h-full w-full object-cover' />
                                        </div>
                                        <div className="name font-bold">the happy guy</div>
                                    </div>
                                    <div className="right flex items-center gap-1.5">
                                        <span className="font-bold">{"12".padStart(4, 0)}</span>
                                        <span className="text-yellow-500">
                                            <Coins />
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link>
                )}
            </masonry-layout>

        </div>



    </>
  )
}

export default Scrolls