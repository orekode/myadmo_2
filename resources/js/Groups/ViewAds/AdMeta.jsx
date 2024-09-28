import { Btn, VideoBits } from '@/Components';
import { Heart, MessageSquareText, Share } from 'lucide-react';
import React from 'react';

const AdMeta = ({ title="This is the advert title", description='Lorem ipsum dolor, sit amet consectetur adipisicing elit. Deleniti nihil nobis culpa molestiae minima autem quia nisi quae sequi, aliquam dolor dignissimos. Earum incidunt perspiciatis, dolor deserunt magni porro quo!', username="Orekode", fullname="Adeniyi David Shalom", image="/images/advertise.jpg" }) => {
    return (
        <>
            <div className="meta bg-gray-50 p-3 rounded-xl">
                <div className="top">
                    <div className="flex items-center justify-between">
                        <div className="left">
                            <div className="flex items-center gap-3">
                                <div className="avatar h-[40px] w-[40px] rounded-full overflow-hidden">
                                    <img src={image} alt="creator" className='h-full w-full object-cover' />
                                </div>
                                <div className="name">
                                    <div className="username font-bold text-lg leading-none text-blue-600">{username}</div>
                                    <div className="username opacity-50">{fullname}</div>
                                </div>
                            </div>
                        </div>
                        <div className="right max-[500px]:hidden">
                            <Btn.Xs>View Profile</Btn.Xs>
                        </div>
                    </div>
                </div>
                <div className="bottom">
                    <div className="content p-1.5 mt-3 font-medium">
                        <h5 className='font-semibold text-[1rem]'>{title}</h5>
                        <div className="opacity-70">
                            <VideoBits.MoreLess 
                                content={description}
                            />
                        </div>
                    </div>
                </div>
                <div className='mt-3'>
                    <div className="max-[1050px]:hidden flex items-center gap-6 max-[650px]:hidden">

                        <div className="icon flex items-center gap-1.5">
                            <div className="h-[35px] w-[35px] bg-white rounded-full flex items-center justify-center text-red-400">
                                <Heart  size={20}/>
                            </div>
                            <div className="text-sm font-semibold  rounded-xl px-1.5 py-0.5 text-red-400">43059</div>
                        </div>

                        <div className="icon flex items-center gap-1.5">
                            <div className="h-[35px] w-[35px] bg-white rounded-full flex items-center justify-center">
                                <MessageSquareText size={20}/>
                            </div>
                            <div className="text-sm font-semibold  rounded-xl px-1.5 py-0.5">43059</div>
                        </div>

                        <div className="relative">
                            <button className="top-0 right-0 h-full px-3 py-1 rounded-xl bg-white border shadow-sm">
                                <span className='text-sm font-semibold text-blue-600'>Copy Link</span>
                            </button>
                        </div>
                    </div>

                    <div className="absolute"></div>
                </div>
            </div>
        </>
    );
}

export const AdMetaMobile = ({ callback = () => {} }) => {
    return (
        <div className="scale-90 text-white max-[1050px]:flex absolute z-30 top-0 right-0 h-full hidden flex-col gap-6  items-center justify-center">
            <div className="icon flex flex-col justify-center items-center gap-1.5">
                <div className="h-[35px] w-[35px] bg-[#222] rounded-full flex items-center justify-center ">
                    <Heart  size={20}/>
                </div>
                <div className="text-sm font-semibold bg-black bg-opacity-50 rounded-xl px-1.5 py-0.5">43059</div>
            </div>
            <div className="icon flex flex-col justify-center items-center gap-1.5">
                <div onClick={callback} className="h-[35px] w-[35px] bg-[#222] rounded-full flex items-center justify-center">
                    <MessageSquareText size={20}/>
                </div>
                <div className="text-sm font-semibold bg-black bg-opacity-50 rounded-xl px-1.5 py-0.5">43059</div>
            </div>

            <div className="icon flex flex-col justify-center items-center gap-1.5">
                <div className="h-[35px] w-[35px] bg-[#222] rounded-full flex items-center justify-center">
                    <Share size={20}/>
                </div>
                <div className="text-sm font-semibold bg-black bg-opacity-50 rounded-xl px-1.5 py-0.5">share</div>
            </div>
        </div>
    );
}

export default AdMeta