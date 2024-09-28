import { ArrowLeft, MessageSquareText, PlusCircle, Video } from 'lucide-react'
import { Head, Link } from '@inertiajs/react'
import { toast } from 'sonner';
import { useEffect } from 'react';




const Profiles = ({ profiles, type, message, callback=()=>{} }) => {

  useEffect(() => {
    if(message && type)
      toast[type](message);
  }, [message]);

  console.log(profiles);

  return (
    <div className='p-12'>
      <Head title='Choose Profile' />
      <div className="absolute top-0 left-0 p-3">
        <div onClick={() => window.history.back()} className="h-[40px] w-[40px] scale-90 border rounded-full flex items-center justify-center">
          <ArrowLeft size={20}/>
        </div>
      </div>

      <div className="top text-center my-3 mb-12">
        <h1 className='text-2xl font-medium'>Please Choose A Business Profile</h1>
        <p className='max-w-[320px] mx-auto text-sm '>Details from your business profile would be used to inform your customers about your organisation</p>
      </div>

      <div className=" flex flex-wrap justify-center gap-6">

        {profiles && profiles.map((item , index) => 
          <div onClick={() => callback(item)} key={index} className="card w-max group hover:cursor-pointer">

            <div className="img h-[150px] w-[150px] overflow-hidden border rounded-full mx-auto col-span-4 flex items-center justify-center group-hover:bg-white group-hover:shadow-md">
              {/* <div className="h-[100px] w-[100px] border rounded-full"> */}
                <img src={item.logo} className='h-full w-full object-cover'/>
              {/* </div> */}
            </div>

            <div className="details p-3 text-sm col-span-8 text-center">
              <div className="name font-bold">{item.name}</div>
              <div className="flex items-center justify-center gap-3">
                <div className="flex items-center gap-0.5">
                  <div className="icon text-red-500 opacity-80">
                    <Video size={17} strokeWidth={3}/>
                  </div>
                  <div className="value font-medium text-gray-500">12<span className='text-xs'>k</span></div>
                </div>

                <div className="flex items-center gap-0.5">
                  <div className="icon text-blue-500 opacity-90">
                    <MessageSquareText size={16} strokeWidth={3}/>
                  </div>
                  <div className="value font-medium text-gray-500">456<span className='text-xs'></span></div>
                </div>
              </div>
            </div>
          </div>
        )}

        <Link href={route('profile.create')}>
          <div className="card w-max group hover:cursor-pointer">
            <div className="img h-[150px] w-[150px] border rounded-full mx-auto group-hover:bg-white group-hover:shadow-md p-3">
              <div className="h-full w-full border-2 border-dashed rounded-full flex items-center justify-center opacity-60">
                <PlusCircle size={40} strokeWidth={0.7} />
              </div>
            </div>

            <div className="details p-3 text-sm col-span-8 text-center">
              <div className="name font-bold opacity-60">click to add a profile</div>
            </div>
          </div>
        </Link>

      </div>
    </div>
  )
}

export default Profiles