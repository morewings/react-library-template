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
