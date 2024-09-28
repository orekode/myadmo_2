import { SuccessDisplay } from "@/Components";
import Nav from "@/Components/Nav";
import { Head, Link } from "@inertiajs/react";
import { useEffect, useState } from "react";


const styles = {
    box: "flex flex-col mt-4",
    box_flat: "flex items-center gap-3 mt-4",
    label: "text-gray-400 font-light text-sm",
    input: "rounded-xl border border-gray-200 px-4 py-3 text-xl my-1 placeholder-gray-300 w-[70px] text-center",
    split: "grid grid-cols-2 gap-4 max-[500px]:block",
    split_left: "grid grid-cols-12 gap-4",

}


const Verify = () => {

    const [showSuccess, setShowSuccess] = useState(false);

    useEffect(() => {
        const inputs = document.querySelectorAll("input[name^='code']");
        
        inputs.forEach((input, index) => {
            input.addEventListener("input", () => {
                if (input.value.length === 1 && index < inputs.length - 1) {
                    inputs[index + 1].focus();
                }
            });

            input.addEventListener("keydown", (e) => {
                if (e.key === "Backspace" && input.value.length === 0 &&  index > 0) {
                    inputs[index - 1].focus();
                }
            });

        });
    }, []);



    return (
        <div className="main">
            <Nav />
            <Head title="Account Confirmation" />
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
                            <form action="" className="my-3 flex flex-col">

                                <div className="flex items-center justify-center gap-3">
                                    {Array.from({ length: 6 }, (_, index) => (
                                        <div className={styles.box} key={index}>
                                            <input name={`code[${index}]`} type="text" maxLength={1} placeholder="X" className={styles.input} />
                                        </div>
                                    ))}
                                </div>

                                <button onClick={() => setShowSuccess(!showSuccess)} className="w-[420px] self-center bg-blue-600 text-white px-3 py-3 rounded-xl shadow  mt-9">Continue</button>

                                <div className="text-center mt-6 text-blue-600">Resend Link</div>
                            </form>
                        </>
                    :
                        <form onClick={() => setShowSuccess(!showSuccess)} action="" className="mt-6 flex flex-col">
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
        </div>
    );
}

export default Verify;