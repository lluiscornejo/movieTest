// Workaround for babel import aliases
System.config({
  paths: {
    '@Common/*': './src/common/*',
    '@Config/*': './src/application/config/*',
  },
});
