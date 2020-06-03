module.exports = {
  extends: ['plugin:@typescript-eslint/recommended'],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'prettier'],
  globals: {
    describe: false,
    afterEach: false,
    it: false,
    expect: false,
    jest: false,
    window: false,
    navigator: false,
    fetch: false,
    document: false,
  },
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      typescript: {},
    },
  },
  rules: {
    '@typescript-eslint/indent': [2, 2],
    '@typescript-eslint/no-explicit-any': 'off',
    'import/extensions': 'off',
    'max-len': [2, { code: 140 }],
  },
};
