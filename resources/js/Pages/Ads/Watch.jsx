import { VideoBits } from '@/Components';
import AdMeta, { AdMetaMobile } from '@/Groups/ViewAds/AdMeta';
import CommentInput from '@/Groups/ViewAds/CommentInput';
import Comments from '@/Groups/ViewAds/Comments';
import Products from '@/Groups/ViewAds/Products';
import { X } from 'lucide-react';
import { useState } from 'react';



const Watch = ({id, title="This is the advert title", type="video", ratio=1.78, thumbnail='/images/advertise.jpg', advert='/images/video.webm'}) => {
    const [toggle, setToggle ] = useState(false);

  return (
    <div>
        <div className="h-screen grid grid-cols-[1fr_500px] max-[1000px]:grid-cols-[1fr_400px] max-[870px]:block">
            <div className="left flex-grow h-full bg-black relative flex items-center">
                <VideoBits.BlurBG thumbnail={thumbnail} />
                <div style={{aspectRatio: ratio}} className="video h-auto max-h-full w-auto max-w-full mx-auto overflow-hidden z-20 relative">
                    <video src={advert} className='h-full w-full object-cover relative z-0' />
                </div>
                <AdMetaMobile callback={ () => setToggle(!toggle)} />
            </div>
            <div className={`right border-l h-full relative max-[870px]:fixed w-full z-40 bg-white  left-0 ${toggle ? 'max-[870px]:top-0' : 'max-[870px]:top-[200vh]'} `}>
                <div onClick={ () => setToggle(!toggle)} className="absolute top-0 right-0 p-1 5">
                    <div className="h-[25px] w-[25px] opacity-80 rounded-full flex items-center justify-center bg-white shadow-sm text-red-500">
                        <X size={20}/>
                    </div>
                </div>
                <div className="p-3 max-[500px]:p-0 overflow-y-scroll h-screen pb-64 w-full">

                    <AdMeta />
                    <Products />
                    <Comments />

                    <div className="absolute bottom-0 right-0 w-full">
                        <CommentInput />
                    </div>

                </div>
            </div>
        </div>
    </div>
  )
}

export default Watch