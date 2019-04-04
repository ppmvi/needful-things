module.exports = {
  'env': {
    'browser': true,
    'node': true
  },
  'extends': [
    'standard',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:vue/recommended'
  ],
  'plugins': [
    'vue'
  ],
  'rules': {
    'import/no-unresolved': 0,

    'indent': ['error', 2, { 'MemberExpression': 'off' }],

    'generator-star-spacing': 'off',

    'no-tabs': 'off',

    'prefer-promise-reject-errors': ['error', {
      'allowEmptyReject': true
    }],

    'no-multi-spaces': ['error', {
      exceptions: {
        'ImportDeclaration': true
      }
    }],

    'semi': ['error', 'always'],

    'space-before-function-paren': ['error', 'never'],

    'no-trailing-spaces': ['error', {
      'skipBlankLines': true
    }]
  },
  "overrides": [
    {
        "files": ["*.vue"],
        "rules": {
            "indent": "off",
            "vue/script-indent": ["error", 4, { "baseIndent": 1 }]
        }
    }
  ]
}
