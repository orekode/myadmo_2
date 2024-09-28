import { useState } from 'react'
import { ArrowLeft, ChevronDown, ChevronUp, Heart, MessageSquareText, Send, Share, Smile } from 'lucide-react';
import EmojiPicker from 'emoji-picker-react';
import { Head } from '@inertiajs/react';

const ShowHide = ({ children, showText, hideText }) => {
    const [ hide, setHide ] = useState(true);

    return (
        <>
            {!hide && children}
            {children && <div onClick={() => setHide(!hide)} className="cursor-pointer">{hide ? showText : hideText}</div>}
            
        </>
    );
}


const MoreLess = ({content, size=100, color=false, ...params}) => {
    const [hide, setHide] = useState(false)

    return (
        <>
            { (content.length > size) ?
                <div {...params}>
                    {hide ? content : content.slice(0, size) + '...'} <span onClick={() => setHide(!hide)} className={`font-bold cursor-pointer  opacity-80 ${ color ? hide ? 'text-red-400' : 'text-blue-500' : 'text-gray-400'} `}>{hide ? 'less' : 'more'}</span>
                </div>
                :
                content
            }
        </>
    );
}


const AccountInfo = ({toggle=()=>{}, mobile=false}) => {

    const bio = 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nobis, blanditiis necessitatibus. Quaerat reprehenderit quia architecto pariatur porro sed nihil voluptas deleniti, repellat delectus, obcaecati quisquam, accusantium velit non atque labore officiis quidem odit eos aspernatur ipsam hic. Perspiciatis, autem ut!';

    if(mobile) 
    return (
        <div className="h-full w-full max-w-[420px] max-[1050px]:block hidden">

            <div className="flex justify-between">
                <div onClick={toggle} className="flex gap-3 px-4 py-2 rounded rounded-b-none">
                    <div className="h-[35px] w-[35px] rounded-full bg-slate-900 overflow-hidden"></div>
                    <div className="name">
                        <div className="backdrop-blur bg-black bg-opacity-30 p-0.5 px-1 pb-0 rounded-b-none rounded username font-bold">Dragon Heart</div>
                        <div className="backdrop-blur bg-black bg-opacity-30 p-0.5 px-1 pt-0 rounded-t-none rounded fullname text-xs">David Heart</div>
                    </div>
                </div>
            </div>

            <div className="bio text-xs bg-black bg-opacity-30 backdrop-blur px-4 py-2 rounded rounded-tl-none">
                <MoreLess content={bio} size={20} color/>
            </div>

        </div>
    )

    return (
        <div className="bg-[#222] rounded-xl h-full w-full p-4 max-[1050px]:hidden block">

            <div className="flex justify-between">
                <div className="flex gap-3">
                    <div className="h-[50px] w-[50px] rounded-full bg-slate-900 overflow-hidden"></div>
                    <div className="name">
                        <div className="username font-bold text-lg">Dragon Heart</div>
                        <div className="fullname ">David Heart</div>
                    </div>
                </div>
                <div className="btn">
                    <button className='bg-blue-500 px-4 py-2 rounded'>All Videos</button>
                </div>
            </div>

            <div className="bio my-4">
                <MoreLess content={bio}/>
            </div>

        </div>
    );
}

const AdMeta = ({ toggle=()=>{}, mobile=false }) => {

    if(mobile)
    return (
        <div className="scale-90 max-[1050px]:flex absolute z-10 top-0 right-0 h-full hidden flex-col gap-6 px-3 items-center justify-center">
            <div className="icon flex flex-col justify-center items-center gap-1.5">
                <div className="h-[35px] w-[35px] bg-[#222] rounded-full flex items-center justify-center ">
                    <Heart  size={20}/>
                </div>
                <div className="text-sm font-semibold bg-black bg-opacity-50 rounded-xl px-1.5 py-0.5">43059</div>
            </div>
            <div className="icon flex flex-col justify-center items-center gap-1.5">
                <div onClick={toggle} className="h-[35px] w-[35px] bg-[#222] rounded-full flex items-center justify-center">
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
    )

    return (
        <div>
            <div className="max-[1050px]:hidden flex items-center gap-3 max-[650px]:hidden">

                <div className="icon flex items-center gap-1.5">
                    <div className="h-[35px] w-[35px] bg-[#222] rounded-full flex items-center justify-center text-red-400">
                        <Heart  size={20}/>
                    </div>
                    <div className="text-sm font-semibold bg-black bg-opacity-50 rounded-xl px-1.5 py-0.5 text-red-400">43059</div>
                </div>

                <div className="icon flex items-center gap-1.5">
                    <div className="h-[35px] w-[35px] bg-[#222] rounded-full flex items-center justify-center">
                        <MessageSquareText size={20}/>
                    </div>
                    <div className="text-sm font-semibold bg-black bg-opacity-50 rounded-xl px-1.5 py-0.5">43059</div>
                </div>

                <div className="relative flex-grow">
                    <input type="text" className='bg-[#222] w-full h-[30px] rounded-xl border-none outline-none text-gray-500' value="https://www.youtube.com/watch?v=T2mbQ6zsOK8"/>
                    <button className="absolute top-0 right-0 h-full px-3 rounded-xl bg-[#333]">
                        <span className='text-sm font-bold text-gray-200'>Copy Link</span>
                    </button>
                </div>
            </div>

            <div className="absolute"></div>
        </div>
    );
}

const Comment = ({ subComments }) => {
    return (
        <div className="bg-[#222] bg-opacity-50 p-3 px-6 rounded-xl">
            <div className="flex items-center gap-[10px]">
                <div className="icon h-[35px] w-[35px] rounded-full overflow-hidden border"></div>
                <div className="name font-semibold">The User's Name</div>
            </div>

            <div className='mt-1.5'>
                <div className="">
                    <div className="comment">
                        <MoreLess 
                            content={"Lorem ipsum dolor, sit amet consectetur adipisicing elit. Obcaecati aspernatur recusandae reprehenderit et eligendi nam harum natus corporis optio soluta."} 
                        />
                        <div className="text-sm my-3 scale-90">
                            <ShowHide showText={<span className="text-gray-400">View Replies</span>} hideText={<span className="text-gray-400">Hide Replies</span>}>
                                {subComments}
                            </ShowHide>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

const CommentInput = () => {
    const [ inputs, setInput ] = useState('');
    const [ emoji, setEmoji ] = useState(false);

    const addEmoji = (emoji) => {
        setInput(prevInput => prevInput + emoji.emoji);
    };

    return (
        <div className=''>
            <div className="flex items-center gap-1 p-3 w-full">
                <div className="flex flex-grow relative" style={{width: "calc(100% - 50px)"}}>
                    <input value={inputs} onChange={(e) => {setInput(e.target.value); console.log(inputs);}}  type="text" className='bg-[#222] w-full rounded-xl outline-none border border-[#999]'/>
                    <div onClick={()=>setEmoji(!emoji)} className={`absolute text-[#999] cursor-pointer hover:text-yellow-300 ${emoji && 'text-blue-500'} right-2 h-full flex items-center justify-center`}>
                        <Smile strokeWidth={1.3}/>
                    </div>
                </div>

                <div className=" font-bold text-sm max-[430px]:text-xs text-gray-400 hover:text-blue-500 cursor-pointer p-1.5">
                    <Send />
                </div>
            </div>
            {emoji && <EmojiPicker onEmojiClick={addEmoji} width={'100%'} theme='dark'/>}
        </div>
    )
}

const Video = () => {
    const [showComment, setShowComment] = useState(false);

  return (
    <div className={`h-screen w-screen overflow-hidden bg-[#333] text-white max-[740px]:font-reduce`}>
        <Head title="Myadmo" />
        <div className={`grid grid-cols-12 max-[1050px]:flex max-[1050px]:extend-screen scrollbar-none h-full relative transition-all duration-300 left-0 ${showComment && '-left-[420px] max-[420px]:-left-[100vw]'}`} style={{'--i': '420px'}}>
            <div className="col-span-7 max-[950px]:col-span-6 max-[1050px]:w-screen relative z-0">
                <video controls  src="/images/video.webm" className='h-screen w-full mx-auto object-contain bg-black'></video>
                <div className="max-[1050px]:hidden absolute z-10 top-0 right-2 h-full flex flex-col gap-1.5 items-center justify-center">
                    <div className="h-[35px] w-[35px] rounded-full bg-black hover:bg-blue-500 cursor-pointer bg-opacity-70 shadow flex items-center justify-center">
                        <ChevronUp />
                    </div>
                    <div className="h-[35px] w-[35px] rounded-full bg-black hover:bg-blue-500 cursor-pointer bg-opacity-70 shadow flex items-center justify-center">
                        <ChevronDown />
                    </div>
                </div>

                <AdMeta toggle={() => setShowComment(!showComment)} mobile/>

                <div className="absolute bottom-10 left-0 w-full ">
                    <AccountInfo toggle={() => setShowComment(!showComment)} mobile />
                </div>
                
            </div>

            <div className="col-span-5 bg-[#111] bg-opacity-60 backdrop-blur-sm max-[950px]:col-span-6 relative top-0 extended">
                <div className="h-screen w-full bg-[#111] pb-12 overflow-x-hidden overflow-y-scroll scrollbar-track-black scrollbar-thumb-gray-700 scrollbar-none ">
                    <div className="min-[1050px]:hidden w-[50px] py-1.5 pt-3 rounded-full flex items-center justify-center text-red-500" onClick={() => setShowComment(!showComment)}>
                        <ArrowLeft size={20}/>
                    </div>

                    <div className="top border-b border-gray-800 p-6 max-[1050px]:hidden ">
                        <AccountInfo />
                        <div className="my-4"></div>
                        <AdMeta />
                    </div>

                    <div className="btm p-3">
                        <Comment subComments={<Comment />}/>
                    </div>

                    <div className="absolute bottom-0 right-0 w-full">
                        <CommentInput />
                    </div>

                </div>

            </div>
        </div>
    </div>
  )
}

export default Video