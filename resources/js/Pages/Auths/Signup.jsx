import { InputError, Loading, Nav, Input } from "@/Components";
import { Head, Link, useForm } from "@inertiajs/react";
import { Eye, EyeOff } from "lucide-react";
import { useEffect, useState } from "react";
import { Toaster, toast } from 'sonner'





const Signup = ({ locations = [] }) => {

    const [show, setShow] = useState({
        password: false,
        password_confirmation: false,
    });

    const { data, setData, errors, post, reset, processing, recentlySuccessful } = useForm({
        first_name:       '',
        last_name:        '',
        email:            '',
        terms:            '',
        contact:          '',
        location:         1,
        dob:              '',
        gender:           'male',
        password:         '',
        password_confirmation: '',
        lat:              '',
        lng:              '',
    });

    const createUser = (e) => {
        e.preventDefault();

        post(route('auth.new'), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: (errors) => {

                if(errors.error)
                    toast[errors.type](errors.error);

                if (errors.password) {
                    reset('password', 'password');
                    reset('password', 'password_confirmation');
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
            <Head title="Sign Up" />
            <Toaster richColors closeButton position="top-center"/>

            <div className="relative p-12">
                <div className="mx-auto border border-gray-200 rounded-xl p-9 px-12 max-w-[550px] relative z-10 bg-white bg-opacity-95 backdrop-blur-3xl">
                    <div className="top">
                        <div className="flex items-center max-[500px]:items-start max-[500px]:block">

                            <div className="">
                                <h2 className="font-bold text-4xl max-[500px]:text-2xl text-blue-700">Welcome Aboard!</h2>
                                <p className="pr-6 text-sm text-gray-600">Provide the details bellow to enjoy ad-free browsing and earn from your online activities!</p>
                            </div>

                        </div>
                    </div>

                    <form onSubmit={createUser} className="mt-3">

                        <div className={Input.styles.split}>
                            <div className={Input.styles.box}>
                                <label htmlFor="first_name" className={Input.styles.label}>First Name</label>
                                <input 
                                    name="first_name" 
                                    type="text" 
                                    placeholder="John" 
                                    className={Input.styles.input} 
                                    value={data.first_name}
                                    onChange={(e) => setData('first_name', e.target.value)}
                                />
                                <InputError message={errors.first_name} className="mt-2" />
                            </div>

                            <div className={Input.styles.box}>
                                <label htmlFor="last_name" className={Input.styles.label}>Last Name</label>
                                <input 
                                    name="last_name" 
                                    type="text" 
                                    placeholder="Doe" 
                                    className={Input.styles.input} 
                                    value={data.last_name}
                                    onChange={(e) => setData('last_name', e.target.value)}
                                />
                                <InputError message={errors.last_name} className="mt-2" />
                            </div>
                        </div>

                        <div className={Input.styles.split}>
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

                            <div className={Input.styles.box}>
                                <label htmlFor="contact" className={Input.styles.label}>Contact</label>
                                <input 
                                    name="contact" 
                                    type="tel" 
                                    placeholder="050000009877" 
                                    className={Input.styles.input} 
                                    value={data.contact}
                                    onChange={(e) => setData('contact', e.target.value)}
                                />
                                <InputError message={errors.contact} className="mt-2" />

                            </div>
                        </div>


                        <div className={Input.styles.split}>

                            <div className={Input.styles.box + ""}>
                                <label htmlFor="dob" className={Input.styles.label}>Date of Birth</label>
                                <input 
                                    name="dob" 
                                    type="date" 
                                    placeholder="23" 
                                    className={Input.styles.input} 
                                    value={data.dob}
                                    onChange={(e) => setData('dob', e.target.value)}
                                />
                                <InputError message={errors.dob} className="mt-2" />
                            </div>

                            <div className={Input.styles.box}>
                                <label htmlFor="gender" className={Input.styles.label}>Gender</label>
                                <select 
                                    name="gender" 
                                    type="text" 
                                    placeholder="JohnDoe@gmail.com" 
                                    className={Input.styles.input} 
                                    value={data.gender}
                                    onChange={(e) => setData('gender', e.target.value)}
                                >
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                </select>
                                <InputError message={errors.gender} className="mt-2" />
                            </div>
                        </div>

                        <div className={Input.styles.box}>
                            <label htmlFor="location" className={Input.styles.label}>Location</label>
                            <select 
                                name="location" 
                                type="text" 
                                placeholder="Accra" 
                                className={Input.styles.input} 
                                onChange={(e) => setData('location', e.target.value)}
                            >
                                {locations.map(item => 
                                    <option value={item.id}>{item.name}</option>
                                )}
                            </select>
                            <InputError message={errors.location} className="mt-2" />
                        </div>

                        <div className={Input.styles.split}>
                            <div className={Input.styles.box + '  '} >
                                <label htmlFor="password" className={Input.styles.label}>Password</label>
                                <div className="relative flex flex-col">
                                    <input 
                                        name="password" 
                                        type={show.password ? "text" : "password"}
                                        placeholder="**********" 
                                        className={Input.styles.input + " "} 
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

                            <div className={Input.styles.box} >
                                <label htmlFor="password_confirmation" className={Input.styles.label}>Confirm Password</label>
                                <div className="relative flex flex-col">
                                    <input 
                                        name="password_confirmation" 
                                        type={show.password_confirmation ? "text" : "password"}
                                        placeholder="**********" 
                                        className={Input.styles.input + " "}
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
                        </div>


                        <div className={Input.styles.box_flat} >
                            <input 
                                name="terms" 
                                type="checkbox" 
                                className={Input.styles.input + 'h-[20px] w-[20px] relative'} 
                                value={data.terms}
                                onChange={() => setData('terms', !data.terms)}
                            />
                            <label htmlFor="terms" className={Input.styles.label}>I agree to and have read the myadmo <Link href="/auth/signup" className="text-blue-600">terms and conditions</Link></label>
                        </div>
                        <InputError message={errors.terms} className="mt-2" />
                        

                        <button className="bg-blue-600 text-white px-3 py-3 rounded-xl shadow w-full mt-9 flex items-center justify-center">
                            <span>Continue</span>
                        </button>

                        <div className="text-center mt-6">Already have account yet? <Link href="/auth/login" className="text-blue-600">Log in</Link></div>
                    </form>
                </div>
                <div className="h-full w-full overflow-hidden absolute top-0 left-0 z-0">
                    <div className="h-[400px] w-[400px] absolute bottom-0 left-0">
                        <img src="/images/relax.png" alt="" className="object-cover" />
                    </div>

                    <div className="h-[400px] w-[400px] absolute bottom-0 right-0">
                        <img src="/images/girl-2.png" alt="" className="object-cover" />
                    </div>
                </div>
            </div>
            <Loading load={processing} />
        </div>
    );
}

export default Signup;