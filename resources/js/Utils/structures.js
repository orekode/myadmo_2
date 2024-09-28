


export const removeItemAtIndex = (arr, index, callback = () => {}) => {
    if (index < 0 || index >= arr.length) {
        return arr;  // Return the original array if index is out of bounds
    }

    // Create a copy of the array using the spread operator or `slice()`
    let newArr = [...arr];  // or use arr.slice() for older browser support

    // Remove the item at the given index
    newArr.splice(index, 1);
    callback(newArr);
    return newArr;  // Return the modified copy
}
