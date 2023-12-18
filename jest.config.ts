export default {
    preset: 'ts-jest',
    testEnvironment: 'jest-environment-jsdom',
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
        // process `*.tsx` files with `ts-jest`
    },
    moduleNameMapper: {
        '\\.(gif|ttf|eot|svg|png)$': 'identity-obj-proxy',
        '\\.css$': 'identity-obj-proxy',
    },
    modulePathIgnorePatterns: ['<rootDir>/templates/'],
};
