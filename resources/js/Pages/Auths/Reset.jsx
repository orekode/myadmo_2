import { InputError, Loading, Nav } from "@/Components";
import { Head, Link, useForm } from "@inertiajs/react";
import { Eye, EyeOff } from "lucide-react";
import { useEffect, useState } from "react";
import { Toaster, toast } from 'sonner'


const styles = {
    box: "flex flex-col mt-4",
    box_flat: "flex items-center gap-3 mt-4",
    label: "text-gray-400 font-light text-sm",
    input: "rounded-xl border border-gray-200 px-4 py-3 text- my-1 placeholder-gray-300",
    split: "grid grid-cols-2 gap-4 max-[500px]:block",
    split_left: "grid grid-cols-12 gap-4",

}



const Reset = ({ email, token }) => {

    const [show, setShow] = useState({
        password: false,
        password_confirmation: false,
    });

    const { data, setData, errors, post, reset, processing, recentlySuccessful } = useForm({
        email,
        token,
        password:              '',
        password_confirmation: '',
    });

    const resetPassword = (e) => {
        e.preventDefault();

        post(route('auth.reset'), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: (errors) => {
                if(errors.error)
                    toast[errors.type](errors.error);
            }
        });
    };


    return (
        <div className="main">
            <Nav />
            <Head title="Log In" />
            <Toaster richColors closeButton position="top-center"/>

            <div className="relative p-12 min-h-screen">
                <div className="mx-auto py-10 border border-gray-200 rounded-xl p-9 px-12 max-w-[550px] relative z-10 bg-white bg-opacity-95 backdrop-blur-3xl">
                    <div className="top">
                        <div className="flex items-center text-center justify-center max-[500px]:items-start max-[500px]:block">

                            <div className="">
                                <h2 className="font-bold text-4xl max-[500px]:text-2xl text-blue-700 mb-1.5">Reset Password</h2>
                                <p className="text-sm text-gray-600 max-w-[320px] mx-auto">create and confirm your new password</p>
                            </div>

                        </div>
                    </div>

                    <form onSubmit={resetPassword} className="mt-9">

                        <div className={styles.box} >
                            <label htmlFor="password" className={styles.label}>Password</label>
                            <div className="relative flex flex-col">
                                <input 
                                    name="password" 
                                    type={show.password ? "text" : "password"}
                                    placeholder="**********" 
                                    className={styles.input + " "} 
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                />
                                <div onClick={() => setShow({...show, password: !show.password})} className="absolute top-0 right-0 h-full flex items-center justify-center px-3 text-gray-500">
                                    {show.password ? 
                                        <EyeOff size={18}/>
                                    :
                                        <Eye size={18}/>
                                    }
                                </div>
                            </div>
                            <InputError message={errors.password} className="mt-2" />
                        </div>

                        <div className={styles.box} >
                            <label htmlFor="password_confirmation" className={styles.label}>Confirm Password</label>
                            <div className="relative flex flex-col">
                                <input 
                                    name="password_confirmation" 
                                    type={show.password_confirmation ? "text" : "password"}
                                    placeholder="**********" 
                                    className={styles.input + " "}
                                    value={data.password_confirmation}
                                    onChange={(e) => setData('password_confirmation', e.target.value)}
                                />
                                <div onClick={() => setShow({...show, password_confirmation: !show.password_confirmation})} className="absolute top-0 right-0 h-full flex items-center justify-center px-3 text-gray-500">
                                    {show.password_confirmation ? 
                                        <EyeOff size={18}/>
                                        :
                                        <Eye size={18}/>
                                    }
                                </div>
                            </div>
                            <InputError message={errors.password_confirmation} className="mt-2" />
                        </div>

                        <button className="bg-blue-600 text-white px-3 py-3 rounded-xl shadow w-full mt-6">Continue</button>

                        <div className="text-center mt-6 text-gray-400 text-sm">
                            Invalid or expired link? {" "}
                            <Link href="/auth/forgot" className="text-blue-600">
                                Resend Link
                            </Link>
                        </div>
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

export default Reset;