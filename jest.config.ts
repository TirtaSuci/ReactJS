import type { Config } from 'jest'
import nextJest from 'next/jest.js'

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
})

// Add any custom config to be passed to Jest
const config: Config = {
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',

  modulePaths: ['<rootDir>'],
  collectCoverage: true,
  collectCoverageFrom:
  [
    "**/*.{js,jsx,ts,tsx}",
    "!**/*..d.ts",
    "!**/node_modules/**",
    "!**/*.type.ts",
    "!<rootDir>/.next/**",
    "!<rootDir>/coverage/**",
    "!<rootDir>/*.config.ts",
    "!<rootDir>/src/midellware.ts",
    "!<rootDir>/src/lib/**",
    "!<rootDir>/src/middlewares/**",
  ]
  // Add more setup options before each test is run
  // setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
}

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(config)