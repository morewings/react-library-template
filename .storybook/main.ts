import type {StorybookConfig} from '@storybook/react-vite';
import {withoutVitePlugins} from '@storybook/builder-vite';

const config: StorybookConfig = {
    stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
    addons: ['@storybook/addon-links', '@storybook/addon-essentials', '@storybook/addon-interactions'],
    framework: {
        name: '@storybook/react-vite',
        options: {},
    },
    async viteFinal(config) {
        return {
            ...config,
            plugins: await withoutVitePlugins(config.plugins, ['vite:dts']),
        };
    },
    typescript: {
        reactDocgen: 'react-docgen-typescript',
    },
};
export default config;
