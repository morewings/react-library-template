import {defineConfig} from 'vitest/config';
import {playwright} from '@vitest/browser-playwright';
import react from '@vitejs/plugin-react';
import {kitchen} from 'alias-kitchen';

export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: kitchen({recipe: 'vite'}),
    },
    test: {
        globals: true,
        browser: {
            headless: true,
            enabled: true,
            provider: playwright(),
            // https://vitest.dev/guide/browser/playwright
            instances: [{browser: 'firefox'}],
        },
    },
});
