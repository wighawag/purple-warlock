module.exports = {
  // pluginSearchDirs: [
  //   './node_modules/.pnpm/prettier-plugin-solidity@1.0.0-alpha.59/node_modules',
  //   './node_modules/.pnpm/prettier-plugin-svelte@1.4.1_prettier@2.1.2+svelte@3.29.4/node_modules',
  // ],
  // plugins: [
  //   './node_modules/.pnpm/prettier-plugin-solidity@1.0.0-alpha.59/node_modules/prettier-plugin-solidity',
  //   './node_modules/.pnpm/prettier-plugin-svelte@1.4.1_prettier@2.1.2+svelte@3.29.4/node_modules/prettier-plugin-svelte',
  // ],
  singleQuote: true,
  bracketSpacing: false,
  overrides: [
    {
      files: '*.sol',
      options: {
        printWidth: 120,
        tabWidth: 4,
        singleQuote: false,
        explicitTypes: 'always',
      },
    },
  ],
};
