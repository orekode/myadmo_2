import { useState } from "react";


export const BlurBG = ({ thumbnail }) => {
    return (
        <>
            <div className="absolute top-0 left-0 z-0 overflow-hidden h-full w-full">
                <img src={thumbnail} alt="thumbnail" className='h-full w-full object-cover' />
            </div>
            <div className="absolute top-0 left-0 z-10 bg-black bg-opacity-80 backdrop-blur-md overflow-hidden h-full w-full">
            </div>
        </>
    );
}


export const ShowHide = ({ children, showText, hideText }) => {
    const [ hide, setHide ] = useState(true);

    return (
        <>
            {!hide && children}
            {children && <div onClick={() => setHide(!hide)} className="cursor-pointer">{hide ? showText : hideText}</div>}
            
        </>
    );
}


export const MoreLess = ({content, size=100, color=false, ...params}) => {
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
