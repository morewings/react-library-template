import {resolve} from 'path';

import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import {kitchen} from 'alias-kitchen';
import external from '@yelo/rollup-node-external';
import dts from 'vite-plugin-dts';
import postcssPresetEnv from 'postcss-preset-env';

// https://vitejs.dev/config/
export default defineConfig({
    resolve: {
        alias: kitchen({recipe: 'rollup'}),
    },
    plugins: [react(), dts({rollupTypes: true, exclude: ['**/*.stories.(ts|tsx)']})],
    build: {
        sourcemap: true,
        lib: {
            // Could also be a dictionary or array of multiple entry points
            entry: resolve(__dirname, 'src/lib/index.ts'),
            name: 'Library name',
            fileName: (format, entryName) => {
                if (entryName === 'src/lib/index') {
                    // Create entry file(s) inside the bundle
                    return `index.${format === 'es' ? 'js' : 'cjs'}`;
                } else if (entryName.includes('node_modules')) {
                    // Organize external dependencies which included in the bundle
                    return `external/module.${format === 'es' ? 'js' : 'cjs'}`;
                }
                // Keep other modules in places
                return `${entryName}.${format === 'es' ? 'js' : 'cjs'}`;
            },
            // Change bundle formats to ES Modules and commonJS.
            // UMD bundle will not work with preserveModules:true
            formats: ['es', 'cjs'],
        },
        rollupOptions: {
            // make sure to externalize deps that shouldn't be bundled
            // into your library
            external: external(),
            output: {
                preserveModules: true,
            },
        },
    },
    css: {
        modules: {
            localsConvention: 'camelCase',
        },
        postcss: {
            plugins: [postcssPresetEnv({stage: 1})],
        },
    },
});
