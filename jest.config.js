export default {
  transform: {
    '^.+\\.ts$': 'ts-jest',
    '^.+\\.js$': 'babel-jest',
  },
  transformIgnorePatterns: ['<rootDir>/node_modules/@fluss/(?!core|web)'],
  testEnvironment: 'jsdom',
};
