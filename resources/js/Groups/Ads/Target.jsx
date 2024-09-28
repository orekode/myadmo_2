import { useState } from 'react'

import { ArrowLeft, Box, Combine, MapPinned, Megaphone, TargetIcon, X } from 'lucide-react';
import { InputError, Input, LocationCoverage } from "@/Components";
import { DatePicker, RangeSlider } from 'rsuite';
import { addHours, addDays } from 'date-fns';
import { toast } from 'sonner';
import SearchCategory from './SearchCategory';
import * as DateStyles from 'rsuite/dist/rsuite.min.css';
import { removeItemAtIndex } from '@/Utils/structures';
import { useEffect } from 'react';
import { useRef } from 'react';

const Target = ({ callback, back, errors={}, target }) => {

    const [ data, setDataObject ] = useState();
    const [ age, setAge ] = useState([18, 40]);
    const [ categories, setCategories ] = useState([]);
    const [ locations, setLocations ] = useState([]);
    const [ showCategory, setShowCategory ] = useState(false);

    const btnRef = useRef();


    const setData = (key, value) => {
        let prevData = data;
        prevData[key] = value;
        setDataObject(prevData);
    }

    const handleNext = () => {

        console.log(data);

        // check if any field is empty
        if(locations.length <= 0 || categories.length <= 0 || Object.keys(data).length < 2 || Object.values(data).every( item => item == null || item == undefined || item == "")) 
            toast.error("Please enter an advert category, age group, start date, and end date to create this advertisement.");
        
        else {
            // next();
            callback({...data, categories, locations});
        }
    }

    useEffect(() => {
        if(!data) {
            setDataObject({
                age_group: [18, 40],
                gender: 'all',
            });
        }
    }, [data]);

    useEffect(() => {
        setDataObject(target ?? {
            age_group: [18, 40],
            gender: 'all',
        });
        setLocations(target?.locations   ?? []);
        setCategories(target?.categories ?? []);
        setAge(target?.age_group         ?? [18, 40]);
    }, []);


    return (

        <div className='max-w-[700px] mx-auto'>

            <div className='p-12 grd grid-cols-12 gap-12 max-[870px]:grid-cols-6 max-[500px]:px-6'>

                <div className="border rounded-xl col-span-5 max-[1120px]:col-span-6">

                    <div className="top border-b px-6 py-3 font-medium opacity-80 text-center flex items-center justify-between">
                        <div onClick={() => back()} className="back cursor-pointer">
                            <ArrowLeft />
                        </div>
                        <div className="mid">Target Audience</div>
                        <div onClick={() => handleNext()} className="next bg-blue-600 text-white font-semibold px-3 py-1 rounded-xl cursor-pointer">Create Ad</div>
                    </div>

                    <div className='relative h-max py-6 px-12 max-[1120px]:px-6'>

                        <div className={Input.small.box.replaceAll("mt") + " mt-3 "}>
                            <button ref={btnRef} type="button" onClick={() => setShowCategory(!showCategory)} className={Input.small.input}>{data?.category_name ?? "Add Target Category"}</button>
                            <SearchCategory 
                                show={showCategory} 
                                setShow={setShowCategory} 
                                callback={(category) => {
                                    if (categories.length < 5) {
                                        setCategories([...categories, category]);
                                        return
                                    }

                                    toast.error("Advert can only have four (4) categories");

                                }} 
                                level={3}
                            />
                            <InputError message={errors.parent} className="mt-2" />

                            <div className="flex justify-center items-center flex-wrap pt-3 gap-3">

                                {categories.map((category, index) => 
                                    <div key={index} className="h-[80px] w-[80px] border rounded-full flex items-center justify-center relative">
                                        <div className='h-full w-full overflow-hidden rounded-full'>
                                            <img src={category.image} className='h-full w-full object-cover'/>
                                        </div>
                                        <div onClick={() => removeItemAtIndex(categories, index, setCategories)} className="h-[25px] w-[25px] rounded-full flex items-center justify-center absolute -top-1 -right-1 bg-white border">
                                            <X  size={20} strokeWidth={0.98}/>
                                        </div>
                                    </div>
                                )}

                                {Array.from({length: 5 - categories.length}, (_, index) => 
                                    <div onClick={() => btnRef.current.click()} key={index} className="h-[80px] w-[80px] border rounded-full flex items-center justify-center">
                                        <Combine size={40} strokeWidth={0.9}/>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className={Input.styles.box}>
                            <label htmlFor="age_group" className={Input.styles.label + ' mb-3 '}>Age Group ({age[0]} - {age[1]})</label>
                            <RangeSlider
                                min={18}
                                max={105}
                                defaultValue={[18, 40]}
                                // value={data.age_group}
                                onChange={(value) => {setData('age_group', value); setAge(value);}}
                                constraint={([start, end]) => start >= 18 && end <= 105}
                                
                            />
                            <InputError message={errors.age_group} className="mt-2" />
                        </div>

                        <div className={Input.styles.box}>
                            <label htmlFor="gender" className={Input.styles.label + ' mb-3 '}>Gender</label>
                            <select 
                                name="gender" 
                                type="text" 
                                placeholder="Male/Female" 
                                className={Input.styles.input}
                                // value={data?.gender}
                                onChange={(e) => setData('gender', e.target.value)}
                            >
                            {
                                [
                                    {value: "all", label: "All Gender"},
                                    {value: "male", label: "Male"},
                                    {value: "female", label: "Female"},
                                    {value: "undisclosed", label: "Preffered not to say"},
                                ]
                                .map( item => 
                                    <option value={item.value}>{item.label}</option>
                                )
                            }
                            </select>
                            <InputError message={errors.gender} className="mt-2" />
                        </div>

                        <div className="col-span-7 max-[1120px]:col-span-6 mt-3">
                            <LocationCoverage callback={(location) => setLocations([ ...locations, location]) }/>
                            <div className="">

                                <h1 className='font-bold'>Target Locations</h1>

                                <div className="grid-box-lg gap-6">
                                    {locations.map( (item, index) => 

                                        <div className="border rounded-xl flex items-center p-3 gap-3 relative">
                                            <div onClick={() => removeItemAtIndex(locations, index, setLocations)} className="bg-white absolute -top-2 -right-2 h-[27px] w-[27px] border rounded-full flex items-center justify-center bg-white">
                                                <X size={15}/>
                                            </div>
                                            <div className="h-[50px] w-[50px] border rounded-xl flex items-center justify-center overflow-hidden">
                                                <MapPinned size={40} strokeWidth={0.9}/>
                                            </div>
                                            <div className="">
                                                <div className="font-medium text-[1rem] leading-none">{item.name.slice(0, 20)}{item.name.length > 20 && "..."}</div>
                                                <div className="font-medium text-[0.9rem] text-gray-600 my-0.5">Coverage: {item?.radius / 1000} km </div>
                                                <div className="font-medium text-[0.7rem] text-gray-400">Lat: {item?.lat.toFixed(3)}, Lng: {item?.lng.toFixed(3)} </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                </div>


            </div>

        </div>
    );
}

export default Target;