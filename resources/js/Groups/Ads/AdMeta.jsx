import { useEffect, useState } from 'react'

import { ArrowLeft } from 'lucide-react';
import { InputError, Input } from "@/Components";
import { DatePicker } from 'rsuite';
import { addHours, addDays } from 'date-fns';
import { toast } from 'sonner';
import * as DateStyles from 'rsuite/dist/rsuite.min.css';


const AdMeta = ({ callback, back, next, errors={}, meta={} }) => {

    const [ data, setDataObject ] = useState({});
    const [ startDate, setStartDate ] = useState(meta?.startDate);
    const [ endDate,   setEndDate   ] = useState(meta?.endDate);

    const minDate = addHours(new Date(), 2);
    const maxDate = addDays(new Date(), 10);
  
    // Function to disable dates outside the range
    const disableDatesOutsideRange = (date) => {
      return date < minDate || date > maxDate;
    };

    const disabledEndDate = (date) => {
        return date < startDate || date > maxDate;
    }

    const setData = (key, value) => {
        let prevData = data;
        prevData[key] = value;
        setDataObject(prevData);
    }

    const handleNext = () => {

        // check if any field is empty
        if(!startDate || !endDate || Object.keys(data).length < 2 || Object.values(data).every( item => item == null || item == undefined || item == "")) 
            toast.error("Please enter an advert title, description, start date, and end date to create this advertisement.");
        
        else if(startDate > endDate) 
            toast.error("The end date must come after the start date. Please adjust the dates to proceed with creating your advert.")
        
        else {
            next();
            callback({...data, startDate, endDate});
        }
    }

    useEffect(() => {
        if(meta && Object.keys(data).length <= 0) setDataObject(meta);
    }, [meta])

    return (
        <div className='p-12'>
            <div className="w-[500px] border rounded-xl mx-auto">

                <div className="top border-b px-6 py-3 font-medium opacity-80 text-center flex items-center justify-between">
                    <div onClick={() => back()} className="back cursor-pointer">
                        <ArrowLeft />
                    </div>
                    <div className="mid">Advert Info</div>
                    <div onClick={() => handleNext()} className="next bg-blue-600 text-white font-semibold px-3 py-1 rounded-xl cursor-pointer">Next</div>
                </div>

                <div className='relative  min-h-[500px] px-12 py-6'>

                    <div className={Input.styles.box}>
                        <label htmlFor="title" className={Input.styles.label}>Advert Title</label>
                        <input 
                            name="title" 
                            type="text" 
                            placeholder="Interesting Title" 
                            className={Input.styles.input}
                            value={data.title}
                            onChange={(e) => setData('title', e.target.value)}
                        />
                        <InputError message={errors.title} className="mt-2" />
                    </div>

                    <div className={Input.styles.box}>
                        <label htmlFor="description" className={Input.styles.label}>Short Description</label>
                        <textarea 
                            name="description" 
                            type="text" 
                            placeholder="A short and engaging advert description here..." 
                            className={Input.styles.input + " resize-none h-[150px] "}
                            value={data.description}
                            onChange={(e) => setData('description', e.target.value)}
                        />
                        <InputError message={errors.description} className="mt-2" />
                    </div>

                    <div className={Input.styles.split}>

                        <div className={Input.styles.box}>
                            <label htmlFor="startDate" className={Input.styles.label}>Start Date</label>
                            <DatePicker
                                oneTap
                                showMeridian 
                                value={startDate}
                                shouldDisableDate={disableDatesOutsideRange}
                                onChange={(value) => setStartDate(value)}
                                className={Input.styles.input.replaceAll("py", "").replaceAll("px", "") + " remove-all-sub-borders overflow-hidden outline-0 "}
                            />
                            <InputError message={errors.startDate} className="mt-2 j" />
                        </div>

                        <div className={Input.styles.box}>
                            <label htmlFor="endDate" className={Input.styles.label}>End Date</label>
                            <DatePicker
                                oneTap
                                showMeridian
                                value={endDate}
                                shouldDisableDate={disabledEndDate}
                                onChange={(value) => setEndDate(value)}
                                className={Input.styles.input.replaceAll("py", "").replaceAll("px", "") + " remove-all-sub-borders overflow-hidden outline-0 "}
                            />
                            <InputError message={errors.endDate} className="mt-2" />
                        </div>

                    </div>

                    <button className="border-2 mt-6 px-3 py-2 rounded-xl w-full">
                        Import Product
                    </button>

                </div>

            </div>
        </div>
    );
}

export default AdMeta;