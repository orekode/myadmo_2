import { Text } from 'lucide-react';
import Comment from './Comment';



const Comments = () => {
    return (
        <div className="p-3">
            <div className="font-semibold flex gap-1.5 mb-2">
                <Text size={20} />
                Comments
            </div>

            <Comment subComments={<Comment />}/>
        </div>
    );
}

export default Comments;