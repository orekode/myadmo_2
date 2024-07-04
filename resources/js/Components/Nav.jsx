
import React from 'react';
import { Btn } from '.';

export const Logo = () => (
    <div className="logo h-[70px]">
        <img src="/images/logo.png" className='h-full w-full object-contain' alt="logo" />
    </div>
);

const Nav = () => {

    const navs = [
        {name: 'Home',        link: '/'},
        {name: 'Marketplace', link: '/store'},
        {name: 'Our Ads',      link: '/login'},
        {name: 'Log In',      link: '/login'},
    ];

  return (
    <nav className="p-3 px-12 flex items-center justify-between h-[70px] border-b">
        <div className="left">
            <Logo />
        </div>

        <div className="links flex items-center gap-10">
            {navs.map(item => 
                <div className="item">{item.name}</div>
            )}
            <Btn.Sm>Sign Up</Btn.Sm>
        </div>

    </nav>
  )
}

export default Nav