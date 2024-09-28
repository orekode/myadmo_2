
import { InputError, Loading, Nav, Input } from "@/Components";
import { Head, Link, useForm } from "@inertiajs/react";
import { useEffect } from "react";
import { toast } from 'sonner';






const Login = () => {

    const { data, setData, errors, post, reset, processing, recentlySuccessful } = useForm({
        email:            '',
        password:         '',
        role:             'earner',
    });

    const signIn = (e) => {
        e.preventDefault();

        post(route('auth.login'), {
            preserveScroll: true,
            onSuccess: (result) => {
                sessionStorage.setItem("token", result.props.token.plainTextToken);
                window.axios.defaults.headers.common['Authorization'] = `Bearer ${sessionStorage.getItem("token")}`;
                toast.success("Sign in successfull!");
                reset();
            },
            onError: (errors) => {
                
                if(errors.error)
                    toast[errors.type](errors.error);

                if (errors.password) {
                    reset('password', 'password');
                }
            },
        });
    };

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setData('lat', position.coords.latitude);
                    setData('lng', position.coords.longitude);
                }
            );
        } 
    }, []);

    return (
        <div className="main">
            <Nav />
            <Head title="Log In" />
            
            <div className="relative p-12 min-h-screen">
                <div className="mx-auto py-10 border border-gray-200 rounded-xl p-9 px-12 max-w-[550px] relative z-10 bg-white bg-opacity-95 backdrop-blur-3xl">
                    <div className="top">
                        <div className="flex items-center text-center justify-center max-[500px]:items-start max-[500px]:block">

                            <div className="">
                                <h2 className="font-bold text-4xl max-[500px]:text-2xl text-blue-700 mb-1.5">Welcome Back!</h2>
                                <p className="text-sm text-gray-600">Provide your login credentials to access your account.</p>
                            </div>

                        </div>
                    </div>

                    <form onSubmit={signIn} action="" className="mt-9">

                        <div className={Input.styles.box}>
                            <label htmlFor="email" className={Input.styles.label}>Email</label>
                            <input 
                                name="email" 
                                type="text" 
                                placeholder="JohnDoe@gmail.com" 
                                className={Input.styles.input}
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                            />
                            <InputError message={errors.email} className="mt-2" />
                        </div>

                        <div className={Input.styles.box} >
                            <label htmlFor="password" className={Input.styles.label}>Password</label>
                            <input 
                                name="password" 
                                type="password" 
                                placeholder="*********" 
                                className={Input.styles.input}
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                            />
                            <div className="text-end text-sm text-blue-600 leading-none"><Link href="/auth/forgot">Forgot Password?</Link></div>
                            <InputError message={errors.password} className="mt-2" />
                        </div>

                        <div className={Input.styles.box}>
                            <label htmlFor="role" className={Input.styles.label}>Account Type</label>
                            <select 
                                name="role" 
                                type="text" 
                                className={Input.styles.input}
                                onChange={(e) => setData('role', e.target.value)}
                            >
                                <option value="earner">Earner</option>
                                <option value="advertiser">Advertiser</option>
                                <option value="blogger">Blogger</option>
                            </select>
                            <InputError message={errors.role} className="mt-2" />
                        </div>

                        <button className="bg-blue-600 text-white px-3 py-3 rounded-xl shadow w-full mt-6">Continue</button>

                        <div className="text-center mt-6">Don't have account yet? <Link href="/auth/signup" className="text-blue-600">Sign up</Link></div>
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

export default Login;