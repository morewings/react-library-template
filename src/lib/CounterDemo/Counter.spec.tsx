import {render} from 'vitest-browser-react';
import {userEvent} from 'vitest/browser';

import {Counter} from './Counter';

const user = userEvent.setup();

describe('Container', () => {
    test('renders without crashing', async () => {
        const value = 6;
        const {getByText} = await render(<Counter initialValue={6} />);
        await expect.element(getByText(value.toString())).toBeInTheDocument();
    });
    test('changes counter value on button click', async () => {
        const initialValue = 1;
        const {getByText, getByRole} = await render(<Counter initialValue={initialValue} />);

        await user.click(getByRole('button'));

        expect(getByText(`${initialValue + 1}`)).toBeInTheDocument();
    });
});
