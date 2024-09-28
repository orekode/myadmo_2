import { useState } from 'react'
import { ArrowLeft, CircleDollarSign, Edit } from 'lucide-react'
import '@appnest/masonry-layout'

import { useMediaQuery } from 'usehooks-ts'
import { Head, Link } from '@inertiajs/react'
import Dashboard from '../Admin/Dashboard'
import NewCategory from '@/Groups/Ads/NewCategory'

const Profile = () => {
    const matches = useMediaQuery('(max-width: 850px)');
    const [ activeTab, setActiveTab ] = useState("My Videos")

    const [ modal, setModal ] = useState("");
    
    return (
        <>
            <Head title="Your Profile" />
            <NewCategory show={modal == "search"} setShow={(state) => setModal( state ? "search" : "")}/>
            <div className="fixed top-0 left-0 p-3">
                <div onClick={() => location.href="/ads"} className="h-[40px] w-[40px] border bg-white rounded-full flex items-center justify-center scale-90">
                    <ArrowLeft />
                </div>
            </div>
            <div className="border-b">
                <div className="top p-14 max-[930px]:px-9 max-[550px]:p-3 max-[550px]:scale-90 flex items-center justify-between max-[650px]:items-end max-[550px]:flex-col max-[550px]:items-center">
                    <div className="flex max-[550px]:flex-col max-[550px]:items-center gap-3">
                        <div className="h-[120px] w-[120px] max-[850px]:h-[90px] max-[850px]:w-[90px] bg-blue-600 text-white font-bold max-[850px]:text-4xl text-5xl rounded-full overflow-hidden flex items-center justify-center text-center">
                            S
                        </div>
                        <div className="max-[550px]:text-center relative">
                            <div className="name font-bold text-2xl max-[850px]:text-xl">Adeniyi David Shalom</div>
                            <div className="max-[550px]:hidden name font-semibold text-gray-500 text-sm max-[850px]:text-xs max-[850px]:my-0.5 my-1">shalommckdavid@gmail.com</div>
                            <div className="max-[550px]:hidden name font-semibold text-gray-700 text-lg max-[850px]:text-base mb-1">0508809987</div>
                            <button className="max-[550px]:absolute -top-3 -right-5 max-[550px]:p-1 bg-gray-200 px-6 py-2 max-[850px]:px-4 max-[850px]:py-1 rounded-xl flex items-center gap-1.5 border border-gray-300">
                                <span className='max-[550px]:hidden'>Edit Profile</span>
                                <Edit size={15} strokeWidth={2} />
                            </button>
                        </div>
                    </div>
                    <div className="max-[550px]:mt-1.5 px-12 max-[650px]:px-3 flex flex-col items-center">
                        <div className="">
                            <span className='font-medium'>Ghc</span>
                            <span className='text-7xl max-[850px]:text-5xl max-[650px]:text-4xl font-semibold text-slate-700'>0090</span>
                        </div>

                        <button onClick={() => setModal("search")} className="border-2 border-blue-500 hover:border-green-500 hover:bg-green-500 active:bg-blue-6000 bg-opacity-80 text-blue-500 hover:text-white px-6 py-1.5 max-[850px]:px-4 max-[850px]:py-1 rounded-xl mt-1.5 mx-auto flex items-center gap-1.5 font-semibold">
                            <span>Withdraw</span>
                            <CircleDollarSign strokeWidth={ 2 } size={ matches && 15}/>
                        </button>
                    </div>
                </div>
            </div>

            <div className="bottom">

                <nav className="flex items-center border-b px-4">
                    {[
                        {
                            name: "My Adverts"
                        },
                        {
                            name: "My History"
                        },
                    ].map(item => 
                        <div key={item.name} onClick={()=>setActiveTab(item.name)} className="hover:bg-gray-100 border-blue-500 px-3 py-2 pb-3 text-center relative cursor-pointer">
                            <span>{item.name}</span>
                            {activeTab == item.name &&
                                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-1 w-[80%] rounded-t-xl bg-blue-500"></div>
                            }
                        </div>
                    )}
                </nav>

                <div className="empty h-[400px] w-full flex flex-col items-center justify-center text-center scale-90">
                    <div className="image h-[250px] w-[250px] flex items-center justify-center rounded-full">
                        <img src="/images/advert.svg" className='h-full w-full object-contain' />
                    </div>

                    <div className="font-bold text-2xl text-slate-600 -mt-1.5 mb-2">No Videos Yet</div>
                    <p className='max-w-[350px] mx-auto'>Want to advertise on myadmo? click the button bellow to get started</p>
                    <Link href={route('advert.create')}>
                        <button className='bg-[#333] hover:bg-blue-500 text-white rounded-xl px-3 py-1.5 mt-4'>Get Started</button>
                    </Link>
                </div>

            </div>

        </>
    )
}

export default Profile