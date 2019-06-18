module.exports = api => {
  const isTest = api.env('test');

  return {
    presets: [
      ['@babel/preset-env', { modules: api.env('module') ? false : 'auto' }],
      // This must come after env! otherwise interfaces might remain in the mjs files
      '@babel/preset-typescript',
      '@babel/preset-react',
      isTest && 'jest'
    ].filter(Boolean),
    plugins: [
      '@babel/plugin-proposal-class-properties',
      '@babel/plugin-syntax-dynamic-import',
      isTest && '@babel/plugin-transform-runtime'
    ].filter(Boolean)
  };
};
