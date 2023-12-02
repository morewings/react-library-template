import {useState} from 'react';

const useLogic = (initialState: number) => {
    const [count, setCount] = useState(initialState);
    return {
        count,
        incrementCount: () => setCount(count + 1),
    };
};

export default useLogic;
