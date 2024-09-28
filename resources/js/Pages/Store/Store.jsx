import { Footer, Nav, Scroller } from '@/Components'
import { Head, Link } from '@inertiajs/react'
import { Menu, MessageCircle, Search, ShoppingBag, ShoppingBasket, ShoppingCart, X } from 'lucide-react';
import { useState } from 'react'
import '@appnest/masonry-layout'

const Store = () => {

    const navs = [
        { name: 'Home', link: '/' },
        { name: 'Marketplace', link: '/store' },
        { name: 'Merchants', link: '/store' },
        { name: 'Our Categories', link: '/store' },
        { name: 'Our Ads', link: '/ads' },
        // { name: 'Log In', link: '/login' },
    ];

    const [ menu, setMenu ] = useState(false);

  return (

    <div className='bg-blue-50 bg-opacity-30'>

        <Head title="Marketplace" />

        <header className='relative h-[500px] w-full bg-blue-500 text-white overflow-x-hidden overflow-y-hidden'>
            <nav className="absolute top-0 left-0 px-6 w-full h-[60px]  z-20 flex items-center justify-between">
                <div onClick={() => setMenu(!menu)} className="min-[950px]:hidden scale-x-125 flex items-center justify-center">
                    <Menu />
                </div>

                <div className={` px-6 flex items-center min-[950px]:gap-1.5 max-[950px]:flex-col max-[950px]:fixed top-0 ${menu ? "left-0" : "-left-[200vh]"} max-[950px]:w-[320px] max-[950px]:h-screen max-[950px]:bg-white max-[950px]:text-black`}>
                    <div onClick={() => setMenu(!menu)} className="min-[950px]:hidden h-[50px] w-[50px] border rounded-full my-6 flex items-center justify-center">
                        <X />
                    </div>
                    {navs.map(item => <Link href={item.link} className=' px-4 font-semibold max-[950px]:mb-4 py-1.5 rounded-xl max-[950px]:w-full max-[950px]:text-center hover:bg-blue-50 min-[950px]:hover:text-black'>{item.name}</Link>)}

                    <Link href={'/login'} className='px-4 font-semibold min-[500px]:hidden mb-4'>Log In</Link>
                    <Link href={'/login'} className='px-4 font-semibold border rounded-lg py-1.5 min-[500px]:hidden'>Sign Up</Link>
                </div>

                <div className="flex items-center">
                    <Link href={'/login'} className='px-1 mx-3 border border-gray-50 border-opacity-40 h-[35px] w-[35px] rounded-full flex items-center justify-center font-semibold'>
                        <MessageCircle size={18}/>
                    </Link>
                    <Link href={'/login'} className='px-1 mr-1.5 border border-gray-50 border-opacity-40 h-[35px] w-[35px] rounded-full flex items-center justify-center font-semibold'>
                        <ShoppingBag size={18}/>
                    </Link>
                    <Link href={'/login'} className='px-4 font-semibold max-[500px]:hidden'>Log In</Link>
                    <Link href={'/login'} className='px-4 font-semibold border rounded-lg py-1.5 max-[500px]:hidden'>Sign Up</Link>
                </div>
            </nav>
            <div className="absolute top-0 max-[750px]:top-1/2 left-0 h-full w-[400px] max-[750px]:w-[200px] z-0">
                <img src="/images/shopping_guy.png" alt="" className="h-full w-full object-cover max-[750px]:h-1/2 " />
            </div>

            <div className="absolute top-0 max-[750px]:top-1/2 right-0 max-[500px]:-right-20 h-full w-[400px] z-0 max-[500px]:scale-75">
                <img src="/images/shopping_girls.png" alt="" className="h-full max-[750px]:h-1/2 w-full object-cover" />
            </div>

            <div className="relative max-[950px]:px-6 h-full w-full bg-black bg-opacity-10 z-10 flex flex-col items-center justify-center">
                <div className="logo w-[300px] h-[100px] bg-red-00">
                    <img src="/images/logo-white.png" alt="" className="h-full w-full object-cover" />
                </div>

                <h3 className="font-black text-center text-4xl max-[400px]:text-3xl max-w-[500px]">Redeem Your MyAdmo Points for Amazing Deals!</h3>

                <div className="max-w-[900px] w-full h-[55px] focus-within:border-2 focus-within:border-blue-600 rounded-2xl p-1.5 px-2 mt-9 bg-white flex gap-3 shadow-xl">
                    <input type="text" className="h-full w-full p-1 px-3 rounded-2xl border-none focus:ring-0 focus:border-none focus:shadow-none text-black" />
                    <button className="bg-blue-600 text-white px-6 max-[500px]:px-3 rounded-lg flex items-center justify-center">
                        <span className='max-[500px]:hidden'>search</span>
                        <span className='min-[500px]:hidden'><Search /></span>
                    </button>
                </div>
            </div>
        </header>

        <section className="content-spacing py-12">
            <Scroller>
                {Array.from({length: 10}, item => 
                    <div className="box h-[150px] w-[150px] bg-blue-100 rounded-2xl shadow overflow-hidden relative">
                        <img src="/images/bag.png" alt="" className="h-full w-full object-contain" />
                        <div className="absolute top-1 right-1 font-bold text-sm bg-purple-700 text-white px-3 py-0.5 rounded-3xl">Bags</div>
                    </div>
                )}
            </Scroller>
            
        </section>

        <div className="flex items-center content-spacing gap-3">
            <div className="search-box border-2 border-transparent focus-within:border-blue-500 bg-white shadow border-gray-100 rounded-xl overflow-hidden w-[380px]">
                <input type="text" className="border-none outline-none w-full h-full" placeholder="Category Filter" />
            </div>
            <select name="pricing" id="" className="bg-white shadow border border-gray-100 rounded-xl overflow-hidden">
                <option disabled selected>Price filter</option>
            </select>
        </div>

        <section className="content-spacing py-12">
            <masonry-layout maxcolwidth="320" gap="13">
                {Array.from({length: 20}, item => 
                    <div className="card hover:scale-105 border border-gray-200 border-opacity-50 bg-white cursor-pointer hover:shadow-sm active:shadow-none mh-[400px] rounded-xl oveflow-hidden">
                        <div className="image w-full rounded-xl overflow-hidden">
                            <img src="/images/bag.png" alt="" className="w-full" />
                        </div>
                        <div className="content p-3">
                            <div className="title text-xl max-[500px]:text-base font-semibold">Your Logo Bag Pack T104</div>
                            <p className='text-xs my-1.5 text-gray-600 max-[500px]:hidden'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet laudantium dolores maiores doloribus sunt </p>
                            <div className="price my-1.5 max-[500px]:text-sm">
                                <span className="font-medium">Ghc</span>
                                <span className='font-bold text-2xl max-[500px]:text-lg'>250</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <button className="bg-blue-500 hover:bg-blue-600 text-white rounded-xl text-center py-2 px-6 w-full">Buy Now</button>
                                <button className="hover:bg-orange-400 max-[500px]:hidden hover:text-white border hover:border-orange-400 h-[40px] w-[50px] rounded-xl flex items-center justify-center">
                                    <ShoppingBasket />
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </masonry-layout >
        </section>

        <Footer />
    </div>
  )
}

export default Store