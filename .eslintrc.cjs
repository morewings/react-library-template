module.exports = {
    root: true,
    env: {browser: true, es2020: true, node: true},
    parserOptions: {
        ecmaVersion: 'latest',
        // eslint-disable-next-line no-undef
        tsconfigRootDir: __dirname,
        sourceType: 'module',
        project: './tsconfig.linter.json',
    },
    settings: {
        react: {
            version: 'detect',
        },
    },
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/stylistic-type-checked',
        'plugin:react/recommended',
        'plugin:react/jsx-runtime',
        'plugin:react-hooks/recommended',
        'plugin:ssr-friendly/recommended',
        'plugin:storybook/recommended',
        'plugin:prettier/recommended',
    ],
    parser: '@typescript-eslint/parser',
    plugins: ['import', 'prettier', '@typescript-eslint', 'ssr-friendly', 'react-refresh'],
    rules: {
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
    overrides: [
        /* Allow require imports for internal scripts */
        {
            files: ['*.js', '*.cjs'],
            rules: {
                '@typescript-eslint/no-var-requires': 0,
            },
        },
        /* Allow devDependencies imports for tests and config files */
        {
            files: [
                '**/*.spec.*',
                '**/testUtils/*.*',
                '**/*.js',
                '**/*.cjs',
                '**/setupTests.ts',
                '**/*.stories.*',
                'vite.config.ts',
            ],
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
            files: ['./src/lib/**/*.*'],
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
            files: ['./src/**/*.*'],
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
    ],
};
