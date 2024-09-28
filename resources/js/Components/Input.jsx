

export const styles = {
    box: "flex flex-col mt-4",
    box_flat: "flex items-center gap-3 mt-4",
    label: "text-gray-400 font-light text-sm",
    input: "rounded-xl border border-gray-200 px-4 py-3 text- my-1 placeholder-gray-300",
    split: "grid grid-cols-2 gap-4 max-[500px]:block",
    split_left: "grid grid-cols-12 gap-4",
}

export const small = {
    ...styles,
    input: "rounded-xl border border-gray-200 px-4 py-2 text-sm my-1 placeholder-gray-300",
}