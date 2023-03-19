/** @type {import('ts-jest').JestConfigWithTsJest} */
export default {
  clearMocks: true,
  coverageDirectory: 'coverage',
  reporters: [
    'default',
    'jest-junit',
  ],
  testEnvironment: 'node',
  preset: 'ts-jest/presets/default-esm',
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
}