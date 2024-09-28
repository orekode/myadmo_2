import { useState } from 'react'
import { ArrowLeft, Image, RectangleHorizontal, RectangleVertical, Square } from 'lucide-react';


const Ratio = ({ callback, back, next, image, initRatio=1 }) => {

    const [ ratio, setRatio ]   = useState(initRatio);
    const url = image ? URL.createObjectURL(image) : "";

    return (
        <div className='p-12'>
            <div className="w-[500px] border rounded-xl mx-auto">

                <div className="top border-b px-6 py-3 font-medium opacity-80 text-center flex items-center justify-between">
                    <div onClick={() => back()} className="back cursor-pointer">
                        <ArrowLeft />
                    </div>
                    <div className="mid">Select Ratio</div>
                    <div onClick={() => {callback(ratio); next()}} className="next bg-blue-600 text-white font-semibold px-3 py-1 rounded-xl cursor-pointer">Next</div>
                </div>

                <div className='relative flex items-center h-[500px]'>

                    <div style={{aspectRatio: ratio}} className="h-auto max-h-full w-auto max-w-full mx-auto overflow-hidden">
                        {image?.type?.includes("image") ?
                            <img   src={url} className='h-full w-full object-cover relative z-0'/> :
                            <video src={url} className='h-full w-full object-cover relative z-0'/>
                        }
                    </div>

                    <div className="absolute bottom-0 left-0 w-full z-10 p-3">
                        <div className="bg-white w-max mx-auto flex items-center gap-3 p-3 rounded-xl shadow-xl">
                            {[
                                {
                                    icon: <RectangleVertical size={30} strokeWidth={1.2}/>,
                                    ratio: 9 / 16,
                                    ratioText: "9:16"
                                },
                                {
                                    icon: <Square size={30} strokeWidth={1.2}/>,
                                    ratio: 1 / 1,
                                    ratioText: "1:1"
                                },
                                {
                                    icon: <RectangleHorizontal size={30} strokeWidth={1.2}/>,
                                    ratio: 16 / 9,
                                    ratioText: "16:9"
                                },
                                {
                                    icon: <Image size={30} strokeWidth={1.2}/>,
                                    ration: null,
                                    ratioText: "original"
                                },
                            ].map( item => 

                                <div onClick={() => setRatio(item.ratio)} className={`icon flex items-center justify-center flex-col text-center border-2 h-[60px] w-[60px] p-3 pt-1.5 pb-0 rounded-xl ${ratio == item.ratio && "border-blue-500"}`}>
                                    <div className="mx-auto">
                                        {item.icon}
                                    </div>
                                    <div className='text-xs font-bold'>{item.ratioText}</div>
                                </div>
                            )}
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
}

export default Ratio;