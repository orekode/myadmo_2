import { Edit3, ImageUp, Origami } from 'lucide-react'
import { useForm } from "@inertiajs/react";
import { InputError, Loading, Uploads } from "@/Components";

import { useState } from 'react';
import { toast } from 'sonner';

const styles = {
  box: "flex flex-col mt-4",
  box_flat: "flex items-center gap-3 mt-4",
  label: "text-gray-400 font-light text-sm",
  input: "rounded-xl border border-gray-200 px-4 py-3 text- my-1 placeholder-gray-300",
  split: "grid grid-cols-2 gap-4 max-[500px]:block",
  split_left: "grid grid-cols-12 gap-4",
}


const Create = () => {

  const [ coverImage, setCoverImage ] = useState();
  const [ logo, setLogo ] = useState();

  const { data, setData, errors, post, reset, processing, recentlySuccessful } = useForm({
      email:            '',
      password:         '',
      role:             'earner',
  });

  const createProfile = (e) => {
    e.preventDefault();


    errors.coverImage = null
    errors.logo = null

    post(route('profile.create'), {
        preserveScroll: true,
        onSuccess: () => reset(),
        onError: (errors) => {
            
            if(errors.error)
                toast[errors.type](errors.error);

        },
    });
  };

  return (
    <div className='p-3'>

      <form onSubmit={createProfile} encType='multipart/form-data'>
          <div className="cover relative h-[320px]">

            <Uploads.UploadFile 
              callback={({ url, file }) => {setCoverImage(url); setData("coverImage", file )}} 
              name="coverImage" 
              accept="image/*"
              styles={`h-full w-full rounded-xl overflow-hidden  ${coverImage ? 'shadow' : 'p-3 border'}`}
              error={errors.coverImage && errors.coverImage.replaceAll("coverImage", "cover picture")}

              postUpload={
                <div className="h-full w-full rounded-xl overflow-hidden relative">
                  <img src={coverImage} className="h-full w-full object-cover" />
                  <div className="bottom-0 right-0 p-3 absolute z-10">
                    <div className="h-[40px] w-[40px] rounded-full border-2 border-white shadow bg-blue-500 text-white flex items-center justify-center">
                      <Edit3 />
                    </div>
                  </div>
                </div>
              }

              preUpload={
                <div className="border-2 border-dashed rounded-xl h-full w-full text-center flex flex-col items-center justify-center">
                  <span className='opacity-30'>
                    <ImageUp size={150} strokeWidth={0.5}/>
                  </span>
                  <span className='opacity-60'>click to upload a cover picture</span>
                </div>
              }
            />

            <Uploads.UploadFile 
              callback={({ url, file }) => {setLogo(url); setData("logo", file)}}
              name="logo"
              accept="image/*"
              error={errors.logo}
              preUpload={
                <div className="absolute -bottom-[100px] left-12 h-[200px] w-[200px] rounded-full border p-3 bg-white">
                  <div className="border-2 border-dashed rounded-full h-full w-full text-center flex flex-col items-center justify-center">
                    <span className='opacity-30'>
                      <Origami size={50} strokeWidth={0.5}/>
                    </span>
                    <span className='opacity-60 text-xs px-3'>click to upload a logo/profile picture</span>
                  </div>
                </div>
              }
              postUpload={
                <div className="absolute -bottom-[100px] left-12 h-[200px] w-[200px] rounded-full bg-white shadow">
                  <img src={logo} className="h-full w-full object-cover h-[200px] w-[200px] rounded-full" />
                  <div className="bottom-0 right-0 p-3 absolute z-10">
                    <div className="h-[40px] w-[40px] rounded-full border-2 border-white shadow bg-blue-500 text-white flex items-center justify-center">
                      <Edit3 />
                    </div>
                  </div>
                </div>
              }
            />

          </div>
        

        <div className="inputs mt-32 px-12">

          <div className={styles.box}>
            <label htmlFor="name" className={styles.label}>Name of Organization</label>
            <input 
                name="name" 
                type="text" 
                placeholder="Stark Industries" 
                className={styles.input}
                value={data.name}
                onChange={(e) => setData('name', e.target.value)}
            />
            <InputError message={errors.name} className="mt-2" />
          </div>

          <div className={styles.box}>
            <label htmlFor="email" className={styles.label}>Official Email</label>
            <input 
                name="email" 
                type="text" 
                placeholder="info@industries.com" 
                className={styles.input}
                value={data.email}
                onChange={(e) => setData('email', e.target.value)}
            />
            <InputError message={errors.email} className="mt-2" />
          </div>

          <div className={styles.box}>
            <label htmlFor="contact" className={styles.label}>Contact</label>
            <input 
                name="contact" 
                type="text" 
                placeholder="+233508809987" 
                className={styles.input}
                value={data.contact}
                onChange={(e) => setData('contact', e.target.value)}
            />
            <InputError message={errors.contact} className="mt-2" />
          </div>

          <div className={styles.box}>
            <label htmlFor="bio" className={styles.label}>Bio</label>
            <textarea 
                name="bio" 
                type="text" 
                placeholder="Type something short and amazing here..." 
                className={styles.input + " h-[150px]"}
                value={data.bio}
                onChange={(e) => setData('bio', e.target.value)}
            />
            <InputError message={errors.bio} className="mt-2" />
          </div>

        </div>

        <div className="flex items-center justify-end px-12">
          <button className="bg-blue-600 text-white px-3 py-3 rounded-xl shadow w-[200px] mt-6">Continue</button>
        </div>

      </form>
      <Loading load={processing} />
    </div>
  )
}

export default Create