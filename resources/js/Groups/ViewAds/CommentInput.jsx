import EmojiPicker from 'emoji-picker-react';
import { Send, Smile } from 'lucide-react';
import { useState } from 'react';


const CommentInput = () => {
    const [ inputs, setInput ] = useState('');
    const [ emoji, setEmoji ] = useState(false);

    const addEmoji = (emoji) => {
        setInput(prevInput => prevInput + emoji.emoji);
    };

    return (
        <div className=''>
            <div className="flex items-center gap-0.5 p-3 w-full">
                <div className="flex flex-grow relative" style={{width: "calc(100% - 50px)"}}>
                    <input value={inputs} onChange={(e) => {setInput(e.target.value); console.log(inputs);}}  type="text" className='bg-gray-50 w-full rounded-xl outline-none border border-gray-200' placeholder='Type your comment here...'/>
                    <div onClick={()=>setEmoji(!emoji)} className={`absolute text-[#999] cursor-pointer hover:text-yellow-300 ${emoji && 'text-blue-500'} right-2 h-full flex items-center justify-center`}>
                        <Smile strokeWidth={1.3}/>
                    </div>
                </div>

                <div className=" font-bold text-sm max-[430px]:text-xs text-gray-400 hover:text-blue-500 cursor-pointer p-1.5 pr-3 scale-90">
                    <Send />
                </div>
            </div>
            {emoji && <EmojiPicker searchDisabled showPreview={false} onEmojiClick={addEmoji} width={'100%'} thesme='dark'/>}
        </div>
    )
}

export default CommentInput;