import { Input } from "@/Components";
import { useForm } from "@inertiajs/react";
import { ChevronLeftCircle, ChevronRightCircle, X } from "lucide-react";
import { useEffect, useState, useCallback } from "react";
import axios from 'axios';
import debounce from 'lodash/debounce';
import { toast } from "sonner";
import { PreLoading } from "./Loading";

const initFilterCallback = (query) => {
    return {
        filters: {
            name: {
                $contains: query
            }
        }
    }
}

const SearchModal = ({ 
    // modal visibility
    show, 
    setShow, 
    level = 2, 
    
    // elements to display when data collection is retrieved
    title, 
    ResultElement,  
    collectionClass="grid-box-sm gap-3", 
    
    // request parameters, response and callback
    route, 
    notFoundResponse,
    filterCallback=initFilterCallback, 
    target, 
    error,

}) => {

    const [visible, setVisible] = useState(false);
    const [collection, setCollection] = useState([]);
    const [loading, setLoading] = useState(true);
    const [pagination, setPagination] = useState({ perPage: 15, lastPage: 1, currentPage: 1 });

    const { data, setData } = useForm({});

    useEffect(() => {
        if (show) {
            fetchCollection(); // Fetch default collection on component mount
        }

        setTimeout(() => setVisible(show), 300);
    }, [show]);

    const fetchCollection = async (query = '', page = 1) => {
        try {
            setLoading(true);
            const response = await axios.get(route, {
                params: { 
                    ...filterCallback(query),
                    page // Pass the page parameter to the backend
                } 
            });
            if(response?.data && response?.data[target]) {
                setCollection(response.data[target]);
                setPagination({
                    perPage: response.data.perPage,
                    lastPage: response.data.lastPage,
                    currentPage: response.data.currentPage
                });
            } else {
                toast.error(error);
            }
        } catch (error) {
            toast.error(error);
            console.error('Error fetching categories:', error);
        } finally {
            setLoading(false);
        }
    };

    // Using useCallback to ensure debounce function is stable across renders
    const debouncedFetchCollection = useCallback(
        debounce((query) => fetchCollection(query, pagination.currentPage), 300), 
        [pagination.currentPage]
    );

    const handleSearch = (e) => {
        const query = e.target.value;
        setData('name', query);

        debouncedFetchCollection(query); // Trigger backend search with query using debounce
    };

    const handlePageChange = (newPage) => {
        fetchCollection(data.name, newPage);
    };

    return (
        <div>
            <div className={`fixed ${visible ? "bg-opacity-10" : "top-full"} left-0 h-screen w-screen p-6 bg-black ${show ? "top-0" : "bg-opacity-0"} shadow`} style={{ zIndex: level }}>

                <div className="bg-white w-[650px] h-max rounded-xl mx-auto py-3">
                    <div className="top text-gray-300 flex items-center justify-between px-6">
                        <span className="font-semibold">{title}</span>
                        <div onClick={() => setShow(!show)} className="borderr scale-90 h-[30px] w-[30px] rounded-full flex items-center justify-center">
                            <X size={20} />
                        </div>
                    </div>

                    <div className="inputs flex items-center gap-3 px-6 py-3 border-b">
                        <div className={Input.small.box.replaceAll("mt", " flex-grow ")}>
                            <input 
                                name="name" 
                                type="text" 
                                placeholder="Type your search here..." 
                                className={Input.styles.input}
                                value={data.name}
                                onChange={handleSearch}
                            />
                        </div>
                    </div>

                    <div className="h-[65vh] overflow-y-scroll p-6">
                        {loading ? (
                            <PreLoading fillColor="blue" size={50} />
                        ) : (
                            collection.length > 0 ? (
                                <div className={collectionClass}>
                                    {collection.map(item => (
                                        <ResultElement key={item.id} data={item} />
                                    ))}
                                </div>
                            ) : (
                                <div className="h-full w-full flex items-center justify-center flex-col">
                                    <span>{notFoundResponse}</span>
                                </div>
                            )
                        )}
                    </div>

                    <div className="pagination-controls flex justify-center items-center gap-2 py-4">
                        <button
                            type="button" 
                            className={`text-gray-500 hover:text-gray-600`}
                            onClick={() => handlePageChange(pagination.currentPage - 1)} 
                            disabled={pagination.currentPage === 1}
                        >
                            <ChevronLeftCircle strokeWidth={1.5} size={30}/>
                        </button>
                        {[...Array(pagination.lastPage)].map((_, index) => (
                            <button
                                type="button" 
                                key={index} 
                                className={`h-[30px] w-[30px] font-semibold flex items-center justify-center rounded-full ${pagination.currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                                onClick={() => handlePageChange(index + 1)}
                            >
                                {index + 1}
                            </button>
                        ))}
                        <button
                            type="button" 
                            className={`text-gray-500 hover:text-gray-600`}
                            onClick={() => handlePageChange(pagination.currentPage + 1)} 
                            disabled={pagination.currentPage === pagination.lastPage}
                        >
                            <ChevronRightCircle strokeWidth={1.5} size={30}/>
                        </button>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default SearchModal;
