// @ts-check

import eslint from '@eslint/js';
import eslintTS from 'typescript-eslint';
import tsParser from '@typescript-eslint/parser';
import pluginImport from 'eslint-plugin-import';
import pluginSSRFriendly from 'eslint-plugin-ssr-friendly';
import pluginPrettier from 'eslint-plugin-prettier';
import pluginTypescript from '@typescript-eslint/eslint-plugin';
import pluginReactRefresh from 'eslint-plugin-react-refresh';
import configReactRecommended from 'eslint-plugin-react/configs/recommended.js';
import configReactJSXRuntime from 'eslint-plugin-react/configs/jsx-runtime.js';
import pluginReactHooks from 'eslint-plugin-react-hooks';
import {fixupPluginRules} from '@eslint/compat';
import configPrettierRecommended from 'eslint-plugin-prettier/recommended';
import tailwindPlugin from 'eslint-plugin-tailwindcss';

export default [
    eslint.configs.recommended,
    ...eslintTS.configs.recommended,
    ...eslintTS.configs.stylistic,
    ...tailwindPlugin.configs['flat/recommended'],
    configReactRecommended,
    configReactJSXRuntime,
    configPrettierRecommended,
    {
        files: ['**/*.{js,ts,tsx,cjs}'],
        linterOptions: {
            reportUnusedDisableDirectives: 'error',
        },
        languageOptions: {
            parser: tsParser,
            parserOptions: {
                ecmaFeatures: {modules: true},
                ecmaVersion: 'latest',
                project: './tsconfig.linter.json',
            },
        },
        settings: {
            react: {
                version: 'detect',
            },
        },
        plugins: {
            import: pluginImport,
            prettier: pluginPrettier,
            '@typescript-eslint': pluginTypescript,
            'react-refresh': pluginReactRefresh,
            'react-hooks': fixupPluginRules(pluginReactHooks),
            'ssr-friendly': fixupPluginRules(pluginSSRFriendly),
        },
        rules: {
            ...pluginReactHooks.configs.recommended.rules,
            ...pluginSSRFriendly.configs.recommended.rules,
            /**
             * Allow empty arrow functions `() => {}`, while keeping other empty functions restricted
             * @see https://eslint.org/docs/latest/rules/no-empty-function#allow-arrowfunctions
             */
            '@typescript-eslint/no-empty-function': ['error', {allow: ['arrowFunctions']}],
            '@typescript-eslint/ban-ts-comment': 1,
            'no-const-assign': 'error',
            /** Restrict imports from devDependencies since they are not included in library build. peerDependencies are ok */
            'import/no-extraneous-dependencies': [
                'error',
                {
                    devDependencies: false,
                    peerDependencies: true,
                },
            ],
            /**
             * Enforce import order with empty lines between import group
             * @see https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/order.md
             */
            'import/order': [
                'error',
                {
                    groups: ['builtin', 'external', 'internal', ['parent', 'sibling', 'index']],
                    pathGroups: [
                        {
                            pattern: '@/**',
                            group: 'internal',
                        },
                    ],
                    'newlines-between': 'always',
                },
            ],
            /**
             * Disallow combined module and type imports like this `import React, {FC} from 'react'`.
             * Eslint will try to split into type and module imports instead
             * @see https://typescript-eslint.io/rules/consistent-type-imports/
             */
            '@typescript-eslint/consistent-type-imports': 'error',
            'import/no-cycle': 'error',
            'prettier/prettier': [
                'error',
                {
                    semi: true,
                    singleQuote: true,
                    jsxSingleQuote: false,
                    trailingComma: 'es5',
                    bracketSpacing: false,
                    jsxBracketSameLine: true,
                    arrowParens: 'avoid',
                },
            ],
            /* Required by vite */
            'react-refresh/only-export-components': ['warn', {allowConstantExport: true}],
            '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
            /**
             * Allow unused variables with names stating with '_'
             * @see https://eslint.org/docs/latest/rules/no-unused-vars
             * @see https://typescript-eslint.io/rules/no-unused-vars/
             */
            '@typescript-eslint/no-unused-vars': [
                'error',
                {
                    argsIgnorePattern: '^_',
                    varsIgnorePattern: '^_',
                    caughtErrorsIgnorePattern: '^_',
                    ignoreRestSiblings: true,
                    args: 'after-used',
                },
            ],
        },
    },
    /* Allow devDependencies imports for tests and config files */
    {
        files: [
            '**/*.spec.*',
            '**/testUtils/*.{js,jsx,ts,tsx}',
            '*/*.{js,jsx,ts,tsx}',
            '**/setupTests.ts',
            '**/*.stories.*',
            '*.config.{js,ts}',
        ],
        plugins: {
            import: pluginImport,
        },
        rules: {
            'import/no-extraneous-dependencies': [
                'error',
                {
                    devDependencies: true,
                    peerDependencies: true,
                },
            ],
        },
    },
    /* Disable `environment` directory imports for library files */
    {
        files: ['src/lib/**/*.{js,jsx,ts,tsx}'],
        rules: {
            'no-restricted-imports': [
                'error',
                {
                    patterns: [
                        {
                            group: ['**/environment/**'],
                            message: 'Imports from environment directory are forbidden in the library files.',
                        },
                    ],
                },
            ],
        },
    },
    /* Disable `template` directory imports for all files */
    {
        files: ['src/**/*.{js,jsx,ts,tsx}'],
        rules: {
            'no-restricted-imports': [
                'error',
                {
                    patterns: [
                        {
                            group: ['**/templates/**'],
                            message: 'Imports from templates directory are forbidden.',
                        },
                    ],
                },
            ],
        },
    },
    /**
     * Disable rules of hooks for story files in order to have better story code display.
     * @see TemplateName.stories.tsx
     */
    {
        files: ['**/*.stories.*'],
        rules: {
            'react-hooks/rules-of-hooks': 'off',
        },
    },
    {
        ignores: ['**/*.snap'],
    },
];
