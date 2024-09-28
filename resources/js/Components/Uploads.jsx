import { useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';

export const UploadFile = ({ children, callback = () => {}, error, preUpload, postUpload, preState = true, styles="", ...props }) => {

    const inputRef = useRef();
    const [upload, setUpload] = useState();

    const handleUpload = (event) => {
      const file = event.target.files[0]
      setUpload({file, url: URL.createObjectURL(file)})
    }

    useEffect(() => {
        if(upload)
            callback(upload);
    }, [upload]);

    useEffect(() => {
        error && toast.warning(error);
    }, [error]);

    console.log(preState && upload, preState);

    return (
      <div onClick={()=>inputRef.current.click()} className={styles + " relative "}>
        { (upload && preState) ? postUpload : preUpload }
        <input onInput={handleUpload} ref={inputRef} type="file" className={props.cover ? 'opacity-0 absolute top-0 left-0 h-full' : 'hidden'} {...props} />
      </div>
    );
}