import {renderHook} from 'vitest-browser-react';
import {act} from 'react';

import useLogic from './useLogic';

describe('lib > Counter > useLogic', () => {
    const initialValue = 0;
    test('renders without crashing', async () => {
        const {result} = await renderHook(() => useLogic(initialValue));

        expect(result.current).toMatchSnapshot();
    });
    test('increments value', async () => {
        const initialValue = 1;
        const {result} = await renderHook(() => useLogic(initialValue));

        act(() => {
            result.current.incrementCount();
        });

        expect(result.current.count).toBe(initialValue + 1);
    });
});
