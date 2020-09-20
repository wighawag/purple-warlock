module.exports = {
  semi: true,
  trailingComma: 'all',
  singleQuote: true,
  printWidth: 120,
  tabWidth: 2,
  useTabs: false,
  trailingComma: 'es5',
  bracketSpacing: false,
  arrowParens: 'always',
  pluginSearchDirs: ['./'], // required somehow (pnpm/prettier issue ?)
  plugins: ['prettier-plugin-svelte', 'prettier-plugin-solidity'],
  overrides: [
    {
      files: '*.sol',
      options: {
        printWidth: 120,
        tabWidth: 4,
        singleQuote: false,
        bracketSpacing: false,
        explicitTypes: 'always',
      },
    },
  ],
};
