import React from 'react'
import { navs } from './Nav';
import { Facebook, Linkedin, Mail, Phone } from 'lucide-react';

const Footer = () => {

    const auths = [
        {
            name: "Register as a User"
        },
        {
            name: "Register as a Advertiser"
        },
        {
            name: "Register as a Bloger"
        },
        {
            name: "Sign In"
        },
    ];

    const contacts = [
        {
            name: "+233 50 880 9987"
        },
        {
            name: "myadmo@gmail.com"
        },
        {
            name: "121212, Marraco, this is the location"
        },
    ];

  return (
    <footer className=' bg-blue-950 text-white'>
        <div className="grid grid-cols-12 max-[880px]:grid-cols-6 gap-24 max-[1111px]:gap-12 content-spacing py-12">
            <div className="col-span-5 max-[990px]:col-span-6 max-[990px]:max-w-[400px] bg-black bg-opacity-30 p-9 rounded-xl shadow border border-black border-opacity-20">
                <h1 className='font-black text-3xl'>
                    Reach out to us with your question
                </h1>

                <form action="" className="py-6">
                    <div className="input flex flex-col gap-1.5">
                        <label htmlFor="name" className="text-sm">Full Name</label>
                        <input type="text" name="name" placeholder="James Bond" className="border border-gray-700 active:border-white rounded-lg bg-transparent" />
                    </div>

                    <div className="input flex flex-col gap-1.5 my-4">
                        <label htmlFor="name" className="text-sm">Email</label>
                        <input type="text" name="name" placeholder="James Bond" className="border border-gray-700 active:border-white rounded-lg bg-transparent" />
                    </div>

                    <div className="input flex flex-col gap-1.5">
                        <label htmlFor="name" className="text-sm">Message/Enquiry</label>
                        <textarea type="text" name="name" placeholder="James Bond" className="border border-gray-700 active:border-white resize-none rounded-lg bg-transparent" />
                    </div>

                    <button className="bg-blue-500 px-6 py-2 rounded-md shadow mt-6 w-full">Send</button>
                </form>
            </div>
            <div className="col-span-7 max-[990px]:col-span-6">
                <div className="grid grid-cols-12 max-[500px]:grid-cols-6 gap-12 max-[500px]:gap-6 max-[990px]:gap-3 max-[990px]:text-sm justify-between">
                    <div className="col-span-6 max-[990px]:col-span-5">
                        <div className="text-yellow-500 font-semibold mb-3">Navigations</div>
                        {navs.map(item =>
                            <div key={item.name} className="link mb-1.5 text-nowrap">{item.name}</div>
                        )}
                    </div>
                    <div className="col-span-4">
                        <div className="text-yellow-500 font-semibold mb-3">Authentication</div>
                        {auths.map(item =>
                            <div key={item.name} className="link mb-1.5 text-nowrap">{item.name}</div>
                        )}
                    </div>
                    <div className="col-span-6">
                        <div className="text-yellow-500 font-semibold mb-3">Contacts</div>
                        {contacts.map(item =>
                            <div key={item.name} className="link mb-1.5 text-nowrap">{item.name}</div>
                        )}
                    </div>

                    <div className="col-span-12">
                        <div className="flex items-center gap-4">
                            <div className="border border-gray-600 h-[50px] w-[50px] rounded-full flex items-center justify-center">
                                <Phone />
                            </div>

                            <div className="border border-gray-600 h-[50px] w-[50px] rounded-full flex items-center justify-center">
                                <Linkedin />
                            </div>

                            <div className="border border-gray-600 h-[50px] w-[50px] rounded-full flex items-center justify-center">
                                <Facebook />
                            </div>

                            <div className="border border-gray-600 h-[50px] w-[50px] rounded-full flex items-center justify-center">
                                <Mail />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="bg-black h-[50px] w-full"></div>
    </footer>
  )
}

export default Footer