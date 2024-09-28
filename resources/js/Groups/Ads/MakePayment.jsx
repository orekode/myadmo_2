import { useState } from 'react'

import { ArrowLeft, X } from 'lucide-react';
import axios from 'axios';
import { PreLoading, default as Loading } from '@/Components/Loading';
import { Btn } from '@/Components';
import { useEffect } from 'react';
import { usePage } from '@inertiajs/react';
import { PaystackButton } from 'react-paystack'
import { toast } from 'sonner';
import { mediaCheck } from '@/Utils/files';
import { paymentProps, verifyPayment } from '@/Utils/payment';


const MakePayment = ({ advert, callback, back }) => {

    console.log(advert);

    const { currency, payment_currency, auth } = usePage().props;

    const [ adCost, setAdCost ] = useState();

    const [ adKey , setAdKey ] = useState();

    const [ load , setLoad ] = useState(false);

    const fetchCost = async () => {

        let typeCheck = await mediaCheck(advert.file);

        const result = await window.axios.post(route("advert.cost"), {
            ...advert,
            ...typeCheck,
        }, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

        if(result.data.success && result.data.cost > 0) {
            setAdCost(result.data.cost);
        }
        else {
            console.log(result);
        }

    }

    const uploadAdvert = async (reference) => {

        let rtrn = true;

        setLoad(true);

        try {

            let typeCheck = await mediaCheck(advert.file);
    
            const result = await window.axios.post(route("advert.upload"), {
                ...advert,
                ...typeCheck,
                reference
            }, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
    
            if(result.data.success) {
                toast.success("Advert Uploaded Successfully");
            }
            else {
                // await uploadAdvert(reference);
                rtrn = false;
            }

        }
        catch(error) {
            console.log(error);
        }

        setLoad(false);

        return rtrn;

    }

    useEffect(() => {
        if(!adCost) fetchCost();
    }, []);

    const componentProps = paymentProps({ 
        user: auth.user, 
        cost: adCost, 
        currency: payment_currency,
        onSuccess ({ reference }) {
            if (verifyPayment(reference)) {
                if(!uploadAdvert(reference)){
                    toast.success("Your advert is being processed and will be uploaded shortly once the review is complete. Thank you for your patience!")
                }
                else {
                    location.href = '/profile';
                }
                
            }
        }
    });


    return (
        <div className='max-w-[700px] mx-auto'>
            <Loading load={load} />
            <div className='p-12 grd grid-cols-12 gap-12 max-[870px]:grid-cols-6 max-[500px]:px-6'>

                <div className="border rounded-xl col-span-5 max-[1120px]:col-span-6">

                    <div className="top border-b px-6 py-3 font-medium opacity-80 text-center flex items-center justify-between">
                        <div onClick={() => back()} className="back cursor-pointer">
                            <ArrowLeft />
                        </div>
                        <div className="mid">Make Payment</div>
                        <div onClick={() => handleNext()} className="next bg-blue-600 text-white font-semibold px-3 py-1 rounded-xl cursor-pointer"></div>
                    </div>

                    <div className='relative h-max py-6 px-12 max-[1120px]:px-6'>
                        <PreLoading load={!adCost} text="Calculating Cost..." size={70}/>

                        {adCost && 
                            <div className="flex justify-center items-center mt-10">
                                <div className="self-start font-normal text-xl">
                                    {currency ?? 'ghc'}
                                </div>
                                <div className='font-medium text-center text-7xl'>
                                    {adCost.toFixed(2).toString().padStart(5, "0")}
                                </div>
                            </div>
                        }

                        <div className={`w-full ${adCost ? 'mt-14' : 'opacity-10 mt-12'}`}>
                            <PaystackButton className='shadow-md border-2 border-blue-700 bg-blue-600 hover:bg-blue-700 active:bg-blue-600 text-white font-semibold rounded-xl px-6 py-2 w-full'  {...componentProps}>
                                <span>Make Payment</span>
                            </PaystackButton>
                        </div>
                    </div>

                </div>


            </div>

        </div>
    );
}

export default MakePayment;