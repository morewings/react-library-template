import type {Meta, StoryObj} from '@storybook/react';

import {TemplateName} from './TemplateName';

const meta = {
    title: 'Example/TemplateName',
    component: TemplateName,
    parameters: {
        // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
        layout: 'fullscreen',
    },
} as Meta<typeof TemplateName>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        initialValue: 0,
    },
};
