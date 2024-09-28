import { SuccessDisplay, Loading, Nav } from "@/Components";
import { Head, Link, useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { Toaster, toast } from 'sonner'


const Verify = ({ message }) => {

    const {errors, post, reset, processing, recentlySuccessful } = useForm({});

    const resendVerify = (e) => {
        e.preventDefault();

        post(route('verification.send'), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: (errors) => {
                if(errors.error)
                    toast[errors.type](errors.error);

                if (errors.password) {
                    reset('password', 'password');
                }
            },
        });
    };

    const [showSuccess, setShowSuccess] = useState(false);

    const [waitTime, setWaitTime] = useState(0.5 * 60); // Initial wait time in seconds (5 minutes)
    const [timeRemaining, setTimeRemaining] = useState(waitTime);

    useEffect(() => {
        if (timeRemaining > 0) {
            const timer = setTimeout(() => {
                setTimeRemaining(timeRemaining - 1);
            }, 1000); // Decrement the time every second

            return () => clearTimeout(timer);
        }
    }, [timeRemaining]);

    const handleLinkClick = () => {
        // Increment the wait time by 5 minutes on each click
        const newWaitTime = waitTime + 5 * 60;
        setWaitTime(newWaitTime);
        setTimeRemaining(newWaitTime);
    };

    // Helper function to format time as mm:ss
    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
    };

    useEffect(() => {

        if(message)
            toast.info(message);
            message = "";

    }, [message]);


    return (
        <div className="main">
            <Nav />
            <Head title="Account Confirmation" />
            <Toaster richColors closeButton position="top-center"/>

            <div className="relative p-12 min-h-screen">
                <div className="mt-12 py-10  border-gray-200 rounded-xl p-9 px-12 relative z-10 bg-white bg-opacity-95 backdrop-blur-3xl">

                    {!showSuccess ?
                        <>
                            <div className="top">
                                <div className="flex items-center text-center justify-center max-[500px]:items-start max-[500px]:block">

                                    <div className="">
                                        <div className="h-[100px] w-[100px] mx-auto border-2 rounded-full border-blue-600 mb-3">
                                            <img src="/images/shield.png" alt="" className="object-contain h-full w-full scale-75" />
                                        </div>
                                        <h2 className="font-bold text-4xl max-[500px]:text-2xl text-blue-700 mb-1.5">Account Verification</h2>
                                        <p className="text-sm text-gray-600 max-w-[400px]">A verification link has been sent to your email. Please click the link to verify your account and complete your registration.</p>
                                    </div>

                                </div>
                            </div>
                            <form onSubmit={resendVerify} className="my-3 flex flex-col text-center">
                                {timeRemaining > 0 ? (
                                    <span className="text-gray-500">
                                        {formatTime(timeRemaining)}
                                    </span>
                                ) : (
                                    <button className="text-blue-600">
                                        Resend Link
                                    </button>
                                )}
                            </form>
                        </>
                    :
                        <form onClick={() => setShowSuccess(!showSuccess)} action="" className="mt- flex flex-col">
                            <SuccessDisplay title="Verification Successful" content={"On Myadmo, you can earn MyAdmo points through your online activities and redeem them for exciting products in our marketplace"}/>
                        </form>
                    }

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

export default Verify;