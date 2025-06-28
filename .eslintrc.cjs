module.exports = {
  extends: ['next/core-web-vitals'],
  overrides: [
    {
      files: ['jest.config.js'],
      extends: ['.eslintrc.js', 'jest.config.eslintrc.js'],
    },
    {
      files: ['**/*.test.ts', '**/*.test.tsx', 'jest.setup.js'],
      env: {
        jest: true,
        node: true,
      },
    },
  ],
}
