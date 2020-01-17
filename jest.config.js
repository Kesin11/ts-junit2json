module.exports = {
  clearMocks: true,
  coverageDirectory: 'coverage',
  reporters: [
    'default',
    'jest-junit',
  ],
  testEnvironment: 'node',
  preset: 'ts-jest',
}