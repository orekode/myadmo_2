

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