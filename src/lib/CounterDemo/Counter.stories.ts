import type {Meta, StoryObj} from '@storybook/react';

import {Counter} from './Counter';

const meta = {
    title: 'Example/Counter',
    component: Counter,
    parameters: {
        // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
        layout: 'fullscreen',
    },
} as Meta<typeof Counter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ExampleCounter: Story = {
    args: {
        initialValue: 0,
    },
};

export const ExampleCounterWithInitialValue: Story = {
    args: {
        initialValue: 11,
    },
};
