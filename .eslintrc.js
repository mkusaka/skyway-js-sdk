module.exports = {
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: ['prettier'],
  extends: [
    'eslint:recommended',
    'prettier',
    'prettier/@typescript-eslint',
    'plugin:@typescript-eslint/recommended',
  ],
  rules: {
    // prettier
    'prettier/prettier': [
      'error',
      {
        trailingComma: 'es5',
        singleQuote: true,
      },
    ],
    // rules
    'no-console': 'off',
    'no-unused-vars': 'error',
    'no-multiple-empty-lines': ['error', { max: 1 }],
    'no-prototype-builtins': 'off',
    'no-var': 'error',
    'prefer-const': 'error',
  },
  env: {
    browser: true,
    node: true,
    es6: true,
    mocha: true,
  },
  globals: {
    RTCRtpTransceiver: true,
  },
  parser: '@typescript-eslint/parser',
};
