import type {FC} from 'react';
import {useEffect} from 'react';
import {throttle} from 'lodash';

import useLogic from './useLogic';

export type Props = {
    /** Set initial value */
    initialValue?: number;
};

export const TemplateName: FC<Props> = ({initialValue = 0}) => {
    const {count, incrementCount} = useLogic(initialValue);

    useEffect(() => {
        const runner = throttle(() => {
            console.log('throttle');
        }, 10);
        runner();
    }, []);
    return (
        <div className="w-60 border border-slate-300 p-6 text-center">
            <h2 className="mb-3 text-2xl">Counter</h2>
            <button
                className="mb-6 rounded-lg bg-teal-600 px-6 py-3 text-base text-white drop-shadow-md active:relative active:left-0.5 active:top-0.5 active:drop-shadow-none"
                type="button"
                onClick={incrementCount}>
                Increment by one
            </button>
            <div>
                Total value: <strong>{count}</strong>
            </div>
        </div>
    );
};
