module.exports = {
  verbose: true,
  preset: 'react-native',
  testEnvironment: 'node',
  transform: {
    '^.+\\.(ts)$': 'ts-jest',
  },
  testMatch: [
    '<rootDir>/src/**/__tests__/**/*.{js,ts}',
    '<rootDir>/src/**/*.{spec,test}.{js,ts}',
  ],
};
