import { ArrowLeft, Image, SquarePlay } from 'lucide-react';
import { Uploads } from "@/Components";

const Upload = ({ callback, back, next }) => {

    return (
        <div className='p-12'>
            <div className="w-[500px] border rounded-xl mx-auto">

                <div className="top border-b px-6 py-3 font-medium opacity-80 text-center flex items-center justify-between">
                    <div onClick={() => back()} className="back cursor-pointer">
                        <ArrowLeft />
                    </div>
                    <div className="mid">Upload Advert</div>
                    {next && 
                        <div onClick={() => next()} className="next bg-blue-600 text-white font-semibold px-3 py-1 rounded-xl cursor-pointer">
                            Next
                        </div>
                    }
                </div>
                
                <Uploads.UploadFile
                    cover
                    callback={(upload) => {callback(upload)}}
                    styles="h-full w-full"
                    accept="image/*,video/*"
                    preUpload={
                        <div className="h-[500px] flex flex-col items-center justify-center">
                            <div className="icons flex items-center">

                                <div className="icon relative left-10 -rotate-[5deg]">
                                    <SquarePlay size={100} strokeWidth={0.5} fill='white'/>
                                </div>

                                <div className="icon relative top-5 right-5 rotate-[15deg]">
                                    <Image size={100} strokeWidth={0.5} fill='white'/>
                                </div>

                            </div>
                            <div className="font-semibold mt-6 text-xl">Drag photos and videos here</div>
                            <button className="bg-blue-500 px-6 py-2 mt-4 text-center font-medium text-white text-sm rounded-xl">Select from computer</button>
                        </div>
                    }
                />

            </div>
        </div>
    );
}

export default Upload;