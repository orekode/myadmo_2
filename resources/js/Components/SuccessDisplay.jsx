import UseAnimations from 'react-useanimations';
import loading2 from 'react-useanimations/lib/loading2';
import { Check } from "lucide-react";


const SuccessDisplay = ({ title, content, animation=loading2, icon=<Check size={50} strokeWidth={3}/>}) => {
    return (
        <div className="top">
            <div className="flex items-center text-center justify-center max-[500px]:items-start max-[500px]:block">


                <div className="">

                    {icon && 
                        <div className="h-[100px] w-[100px] mx-auto border-2 border-green-500 text-white flex items-center justify-center rounded-full overflow-hidden">
                            <div className="h-full w-full scale-90 bg-green-500 text-white flex items-center justify-center rounded-full overflow-hidden">
                                {icon}
                            </div>
                        </div>
                    }

                    {title && 
                        <h2 className="font-bold text-4xl max-[500px]:text-2xl text-green-400 mb-1.5 mt-2 max-w-[600px]">{title}</h2>
                    }

                    {content && 
                        <p className="text-sm text-gray-600 max-w-[500px] mx-auto mb-2">{content}</p>
                    }

                    {animation && 
                        <div className="icon flex items-center justify-center text-green-400">
                            <UseAnimations animation={animation} fillColor="lightgreen" size={40}/>
                        </div>
                    }

                </div>

            </div>
        </div>
    );
}


export default SuccessDisplay