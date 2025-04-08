[![CI](https://github.com/morewings/react-library-template/actions/workflows/merge-jobs.yml/badge.svg)](https://github.com/morewings/react-library-template/actions/workflows/merge-jobs.yml)
[![Storybook deploy](https://github.com/morewings/react-library-template/actions/workflows/pages.yml/badge.svg)](https://github.com/morewings/react-library-template/actions/workflows/pages.yml)
[![Use this template](https://img.shields.io/badge/use%20this-template-blue?logo=githu)](https://github.com/morewings/react-library-template/generate)

# React Library Template

[![NPM library Create React App template logo](./design/logo.jpg)](#)

This template repository is your shortcut to building awesome React components and libraries!

Forget about the tedious setup – we've got you covered. Focus on writing your code, and let this template handle the rest.

## Features

- **TypeScript & JavaScript**: Write your code in the language you prefer.
- **Blazing fast**: **pnpm** for speedy package management and **Vite** for lightning-fast builds.
- **Husky** enforces pre-commit hooks, **Eslint** and **Stylelint** will keep your code tidy and consistent.
- **Jest** and **react-testing-library** help you write robust tests.
- **Storybook** lets you create interactive demos and docs for your components.
- **Optional Tailwind CSS**: If you're into it, you can easily enable Tailwind CSS for styling.

See it in action: [Demo Storybook](https://morewings.github.io/react-library-template/)

This template is your starting point for building high-quality React libraries. Clone it, customize it, and let's build something amazing!

## Quickstart

### Prerequisites

1. Install **Node** >= 20.x.
2. Install **pnpm**. E.g. `corepack prepare pnpm@latest --activate`.


### Installation

Manually clone repo or use `degit`.

```shell script
# With CSS Modules config
npx degit github:morewings/react-library-template my-library
# With Tailwind CSS config
npx degit github:morewings/react-library-template#tailwind my-library
cd ./my-library
pnpm i
```


## Enable Tailwind CSS

You can find all changes at this [PR](https://github.com/morewings/react-library-template/pull/161) and [tailwind](https://github.com/morewings/react-library-template/tree/tailwind) branch.

## Improve tree shaking

The default settings allow modern bundlers such as Vite and esbuild successfully tree-shake unused modules from the bundle.
Unfortunately there are problems with Next.js and Webpack not capable to tree-shake single file ES Module.

In order to fix this enable `preserveModules` setting in Rollup options.

```ts
import {defineConfig} from 'vite';

export default defineConfig(() => ({
    // ...
    build: {
        lib: {
            // ...
            fileName: (format, entryName) => {
                // Create entry file(s) inside the bundle
                if (entryName === 'src/lib/index') {
                    return `index.${format === 'es' ? 'js' : 'cjs'}`;
                // Organize external dependencies which included in the bundle
                } else if (entryName.includes('node_modules')) {
                    return `external/module.${format === 'es' ? 'js' : 'cjs'}`
                }
                // Keep other modules in places
                return `${entryName}.${format === 'es' ? 'js' : 'cjs'}`;
            },
            // Change bundle formats to ES Modules and commonJS.
            // UMD bundle will not work with preserveModules:true
            formats: ['es', 'cjs'],
        },
        rollupOptions: {
            // ...
            output: {
                // ...
                preserveModules: true,
            },
        },
    },
}));

```

You can find all changes at corresponding [PR](https://github.com/morewings/react-library-template/pull/352) and [tree-shaking](https://github.com/morewings/react-library-template/tree/tree-shaking) branch.
