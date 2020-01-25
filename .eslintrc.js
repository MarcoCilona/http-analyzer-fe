module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
    '@vue/typescript'
  ],
  rules: {
    'no-console': 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'comma-dangle': 'off',
    'indent': ['error', 2, { "SwitchCase": 1 }],
    'lines-between-class-members': 'off',
    'max-len': 'off',
    'linebreak-style': 'off',
    'no-underscore-dangle': 'off',
    'sort-keys': ['error', 'asc', {'caseSensitive': true, 'natural': false}],
    'sort-vars': ['error', {'ignoreCase': true}],
  },
  parserOptions: {
    parser: '@typescript-eslint/parser'
  }
}
