import { Uploads, Input, InputError, Loading } from "@/Components";
import { useForm } from "@inertiajs/react";
import { Edit3, ImageUp, X } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import SearchCategory from "./SearchCategory";

const NewCategory = ({ show, setShow, level=2 }) => {

    const [ url, setUrl ] = useState();
    const [ visible, setVisible ] = useState(false);
    const [ showParent, setShowParent ] = useState(false);
    const [ parent, setParent ] = useState("select a parent category")

    const { data, setData, errors, clearErrors, post, reset, processing, recentlySuccessful } = useForm({
        name:   '',
        image:  '',
    });


    const createCategory = (e) => {
        e.preventDefault();
        clearErrors();
        post(route('advert.category.create'), {
            preserveScroll: true,
            onSuccess: () => {
                toast.success("Category created successfully");
                reset("name", "image" ,"parent");
                setShow(false);
                setParent("select a parent category")
                setUrl(null);
            },
            onError: (errors) => {
                
                if(errors.error)
                    toast[errors.type](errors.error);
                
                if(errors.image)
                    toast.warning(errors.image);

            },
        });
    };

    useEffect(() => {
        setTimeout(() => setVisible(show), 300);
    }, [show])



    return (
        <div>
            <div className={`fixed ${visible ? "bg-opacity-10" : "top-full"} left-0 h-screen w-screen p-12 bg-black ${show ? "top-0" : "bg-opacity-0"} shadow`} style={{zIndex: level}}>
                <form onSubmit={createCategory} className="bg-white w-[400px] min-h-[500px] rounded-xl mx-auto p-6 py-3">

                    <div className="top mb-3 text-gray-300 flex items-center justify-between">
                        <span className="font-semibold">New Category</span>
                        <div onClick={()=>setShow(!show)} className="border scale-90 h-[30px] w-[30px] rounded-full flex items-center justify-center">
                            <X size={20}/>
                        </div>
                    </div>

                    <Uploads.UploadFile
                        preState={url}
                        callback={({ url, file}) => {
                            setUrl(url);
                            setData("image", file);
                        }}
                        preUpload={
                            <div className=" rounded-xl flex flex-col items-center justify-center text-center mx-auto">
                                <span className='opacity-30'>
                                    <ImageUp size={180} strokeWidth={0.5}/>
                                </span>
                                <span className='opacity-60'>click to upload a picture</span>
                            </div>
                        }
                        postUpload={
                            <div className="h-[220px] w-[220px] rounded-xl overflow-hidden mx-auto relative">
                                <img src={url} className="h-full w-full object-cover" />
                                <div className="bottom-0 right-0 p-3 absolute z-10">
                                    <div className="h-[40px] w-[40px] rounded-full border-2 border-white shadow bg-blue-500 text-white flex items-center justify-center">
                                        <Edit3 />
                                    </div>
                                </div>
                            </div>
                        }
                    />

                    <div className="inputs relative z-10">
                        
                        <div className={Input.small.box}>
                            <label htmlFor="name" className={Input.small.label}>Category Name</label>
                            <input 
                                name="name" 
                                type="text" 
                                placeholder="e.g Entertainment" 
                                className={Input.small.input}
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                            />
                            <InputError message={errors.name} className="mt-2" />
                        </div>

                        <div className={Input.small.box.replaceAll("mt") + " mt-3 "}>
                            <button type="button" onClick={() => setShowParent(!showParent)} className={Input.small.input}>{parent}</button>
                            <SearchCategory show={showParent} setShow={setShowParent} callback={({ id, name }) => {setData("parent", id); setParent(name)}} level={3}/>
                            <InputError message={errors.parent} className="mt-2" />
                        </div>

                        <button className="text-sm bg-blue-600 text-white px-3 py-2 font-semibold rounded-xl shadow w-full mt-6">Create Category</button>
                    </div>

                </form>
            </div>
            <Loading load={processing}/>
        </div>
    )
}

export default NewCategory