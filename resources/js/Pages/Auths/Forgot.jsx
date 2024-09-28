import { InputError, Loading, Nav, Input } from "@/Components";
import { Head, Link, useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { Toaster, toast } from 'sonner'



const Forgot = () => {
    const { data, setData, errors, post, reset, processing, recentlySuccessful } = useForm({
        email:            '',
        password:         '',
        role:             '',
    });

    const sendLInk = (e) => {
        e.preventDefault();

        post(route('auth.sendLink'), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: (errors) => {
                if(errors.error)
                    toast[errors.type](errors.error);
            }
        });
    };

    return (
        <div onSubmit={sendLInk} className="main">
            <Nav />
            <Head title="Log In" />
            <Toaster richColors closeButton position="top-center"/>

            <div className="relative p-12 min-h-screen">
                <div className="mx-auto py-10 border border-gray-200 rounded-xl p-9 px-12 max-w-[550px] relative z-10 bg-white bg-opacity-95 backdrop-blur-3xl">
                    <div className="top">
                        <div className="flex items-center text-center justify-center max-[500px]:items-start max-[500px]:block">

                            <div className="">
                                <h2 className="font-bold text-4xl max-[500px]:text-2xl text-blue-700 mb-1.5">Account Recovery</h2>
                                <p className="text-sm text-gray-600 max-w-[320px] mx-auto">your password reset link would be sent to the email provided bellow</p>
                            </div>

                        </div>
                    </div>

                    <form action="" className="mt-9">

                        <div className={Input.styles.box}>
                            {/* <label htmlFor="email" className={Input.styles.label}>Email</label> */}
                            <input 
                                name="email" 
                                type="text" 
                                placeholder="Enter your email here..." 
                                className={Input.styles.input}
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                            />
                            <InputError message={errors.email} className="mt-2" />
                        </div>

                        <button className="bg-blue-600 text-white px-3 py-3 rounded-xl shadow w-full mt-6">Continue</button>

                    </form>

                </div>
                <div className="h-full w-full overflow-hidden absolute top-0 left-0 z-0 hidden">
                    <div className="h-[400px] w-[400px] absolute bottom-0 left-0">
                        <img src="/images/guy-3.png" alt="" className="object-cover" />
                    </div>

                    <div className="h-[400px] w-[400px] absolute bottom-0 right-0">
                        <img src="/images/girl-3.png" alt="" className="object-cover" />
                    </div>
                </div>
            </div>
            <Loading load={processing} />
        </div>
    );
}

export default Forgot;