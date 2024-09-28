

export const Md = ({ children, extra, ...props }) => {
    return (
        <button {...props} className={`${extra} shadow-md border-2 border-blue-700 bg-blue-600 hover:bg-blue-700 active:bg-blue-600 text-white font-semibold rounded-xl px-6 py-2`}>{children}</button>
    );
}

export const Sm = ({ children, extra, ...props }) => {
    return (
        <button {...props} className={`${extra} shadow-md border-2 border-blue-700 bg-blue-600 hover:bg-blue-700 active:bg-blue-600 text-white text-sm font-semibold rounded-xl px-4 py-2`}>{children}</button>
    );
}


export const Xs = ({ children, extra, ...props }) => {
    return (
        <button {...props} className={`${extra} shadow-md border-2 border-blue-700 bg-blue-600 hover:bg-blue-700 active:bg-blue-600 text-white text-xs font-semibold rounded-xl px-2 py-1`}>{children}</button>
    );
}

/*
calculate cost of advert based on
1. duration of video ***
2. duration of advert ***
3. number of categories *
4. number of locations ***
5. coverage area of each location ***
5. range of age group *
6. estimate of total users **
7. base cost
*/