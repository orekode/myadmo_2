import { VideoBits } from '@/Components';


const Comment = ({ subComments }) => {
    return (
        <div className=" p-3 px-0 rounded-xl">
            <div className="flex items-center gap-[10px]">
                <div className="icon h-[35px] w-[35px] rounded-full overflow-hidden border"></div>
                <div className="name font-semibold">The User's Name</div>
            </div>

            <div className='mt-1.5'>
                <div className="">
                    <div className="comment">
                        <VideoBits.MoreLess 
                            content={"Lorem ipsum dolor, sit amet consectetur adipisicing elit. Obcaecati aspernatur recusandae reprehenderit et eligendi nam harum natus corporis optio soluta."} 
                        />
                        <div className="text-sm scale-95">
                            <VideoBits.ShowHide showText={<span className="text-gray-400">View Replies</span>} hideText={<span className="text-gray-400">Hide Replies</span>}>
                                {subComments}
                            </VideoBits.ShowHide>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Comment;