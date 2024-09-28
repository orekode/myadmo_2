
import UseAnimations from 'react-useanimations';
import loading2 from 'react-useanimations/lib/loading2';
import infinity from 'react-useanimations/lib/infinity';

const Loading = ({ load }) => {
  if(load)
  return (
      <div className="fixed top-0 left-0 h-screen w-screen bg-black bg-opacity-20 flex items-center justify-center z-50">
          <div className="icon flex items-center justify-center text-green-400">
              <UseAnimations animation={loading2} fillColor="blue" size={50}/>
          </div>
      </div>
  )
}

export const PreLoading = ({ load=true, text="Loading...", ...props }) => {
    if(load)
    return (
        <div className="h-full w-full flex items-center justify-center flex-col">
            <UseAnimations animation={infinity} {...props}/>
            <span className="pl-3">{text}</span>
        </div>
    );
}

export default Loading