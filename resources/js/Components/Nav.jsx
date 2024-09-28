
import React, { useState } from 'react';
import { Btn } from '.';
import { ChevronDown, ChevronUp, X } from 'lucide-react';
import { Link, useForm, usePage } from '@inertiajs/react';
import UseAnimations from 'react-useanimations';
import {default as MenuIcon} from 'react-useanimations/lib/menu';
import { toast } from 'sonner';

export const Logo = () => (
    <div className="logo h-[70px]">
        <img src="/images/logo.png" className='h-full w-full object-contain' alt="logo" />
    </div>
);

export const navs = [
    { name: 'Home', link: '/' },
    { name: 'Marketplace', link: '/store' },
    { name: 'Our Ads', link: '/ads' },
    { name: 'Log In', link: route('login') },
    { name: 'My Profile', link: route('profile') },
];

const auth_excempt = ["Log In", 'Log In'];
const guest_excempt = ["My Profile"];

const Nav = ({ }) => {

    const { auth } = usePage().props;
    const {errors, post, reset, processing, recentlySuccessful } = useForm({});

    const [ menu, setMenu ] = useState(false);
    const [ show, setShow ] = useState(false);

    const logout = (e) => {
        e.preventDefault();

        post(route('auth.logout'), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: (errors) => {
                if(errors.error)
                    toast[errors.type](errors.error);
                
                if (errors.password) {
                    reset('password', 'password');
                }
            },
        });
    };



    return (
        <nav className="p-3 px-12 max-[845px]:px-6 max-[845px]:pl-0 flex items-center justify-between h-[70px] border-b">
            <div className="left">
                <Logo />
            </div>

            <div className={` links flex items-center gap-10 max-[845px]:shadow max-[845px]:fixed top-0 ${menu ? "right-0" : "-right-[100vh]"} max-[845px]:h-screen max-[845px]:w-[300px] max-[845px]:flex-col bg-white z-50 max-[845px]:pt-12 `}>

                <div onClick={() => setMenu(!menu)} className="min-[845px]:hidden flex items-center justify-center text-gray-500 hover:text-black h-[40px] w-[40px] border rounded-full">
                    <X />
                </div>
                
                {
                    navs.
                        filter(item => !(auth_excempt .includes(item.name)) || (auth_excempt .includes(item.name) && !auth.user)).
                        filter(item => !(guest_excempt.includes(item.name)) || (guest_excempt.includes(item.name) &&  auth.user))
                    .map(item =>
                        <Link key={item.name} href={item.link} className="item cursor-pointer">{item.name}</Link>
                    )
                }


                {!auth.user ? 
                    <>
                        <Link href='/auth/signup'>
                            <Btn.Sm>Sign Up</Btn.Sm>
                        </Link>
                    </>
                :
                    <>
                        <div className='relative'>

                            <div onClick={() => setShow(!show)} className="flex items-end">
                                <div className='border-2 rounded-full border-blue-500 p-0.5 relative'>
                                    <div className="h-[40px] w-[40px] rounded-full bg-blue-500 text-center flex items-center justify-center font-black text-white">
                                        {auth.user.first_name[0] + auth.user.last_name[0]}
                                    </div>
                                </div>
                                <span className=''>
                                    {show ? 
                                        <ChevronUp size={15}/>
                                    :
                                        <ChevronDown size={15}/>
                                    }
                                </span>
                            </div>


                            <div className={`absolute top-[110%] right-0 bg-white border rounded-md p-1.5 px-6 w-max ${show ? 'opacity-100' : 'opacity-0'}`}>
                                <form onSubmit={logout}>
                                    <button className="item cursor-pointer">Log Out</button>
                                </form>
                            </div>
                        </div>
                    </>
                }



            </div>

            <div onClick={() => setMenu(!menu)} className="min-[845px]:hidden flex items-center justify-center scale-x-110">
                <UseAnimations animation={MenuIcon} size={30} fillColor='blue'/>
            </div>

        </nav>
    )
}

export default Nav