import { Uploads, Input, InputError, Btn } from "@/Components";
import { Head, Link, useForm } from "@inertiajs/react";
import { ArrowLeft, ChevronLeftCircle, ChevronRight, ChevronRightCircle, Edit3, ImageUp, Search, X } from "lucide-react";
import { useEffect, useState, useCallback } from "react";
import axios from 'axios';
import UseAnimations from 'react-useanimations';
import infinity from 'react-useanimations/lib/infinity';
import debounce from 'lodash/debounce';
import { toast } from "sonner";
import { SearchModal } from "../../Components";
import NewCategory from "./NewCategory";

const SearchCategory = ({ show, setShow, level = 2, callback }) => {

    return (
        <>
            <SearchModal
                show={show}
                setShow={setShow}
                level={level}

                target={'categories'}
                route={route('categories.search')}
                notFoundResponse={<>
                    <div>No Categories Found</div>
                    <Btn.Sm onClick={() => setNew(true)}>New Category</Btn.Sm>
                </>}
                error={"Unable to retrieve advert categories at this time, please refresh or try again later"}
        

                title={"Search Categories"}
                ResultElement={({ data }) => 
                    <div className="group" onClick={() => {callback(data); setShow(!show)}}>
                        <div className="w-full h-[200px] rounded-xl border-2 overflow-hidden group-hover:border-blue-500">
                            <img src={data.image} className="h-full w-full object-cover" />
                        </div>
                        <div className="details p-1.5">
                            <span>{data.name}</span>
                        </div>
                    </div>
                }

            />
        </>
    );
}


export default SearchCategory;
