module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node', // Or 'jsdom' if needed
    collectCoverage: true,
    coverageDirectory: 'coverage', // Optionally configure coverage reports
    testMatch: ['**/tests/**/*.ts?(x)', '**/?(*.)+(spec|test).ts?(x)'],
    // Any additional Jest configuration
};