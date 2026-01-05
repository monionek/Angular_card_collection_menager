// @ts-check
const eslint = require('@eslint/js');
const { defineConfig } = require('eslint/config');
const tseslint = require('typescript-eslint');
const angular = require('angular-eslint');

module.exports = defineConfig([
  {
    files: ['**/*.ts'],
    extends: [
      eslint.configs.recommended,
      tseslint.configs.recommended,
      tseslint.configs.stylistic,
      angular.configs.tsRecommended,
    ],
    processor: angular.processInlineTemplates,
    rules: {
      /* ===========================
     Angular – selektory
  ============================ */
      '@angular-eslint/directive-selector': [
        'error',
        {
          type: 'attribute',
          prefix: 'MJ',
          style: 'camelCase',
        },
      ],
      '@angular-eslint/component-selector': [
        'error',
        {
          type: 'element',
          prefix: 'MJ',
          style: 'kebab-case',
        },
      ],

      /* ===========================
     TypeScript – wymagania z zadania
  ============================ */

      // 1. Wymagane modyfikatory dostępu
      '@typescript-eslint/explicit-member-accessibility': [
        'error',
        {
          accessibility: 'explicit',
          overrides: {
            constructors: 'no-public',
          },
        },
      ],

      // 2. Jawny typ zwracany przez funkcje i metody
      '@typescript-eslint/explicit-function-return-type': [
        'error',
        {
          allowExpressions: false,
          allowTypedFunctionExpressions: false,
        },
      ],

      // 3. Zakaz używania var
      'no-var': 'error',

      // 4. const zamiast let jeśli możliwe
      'prefer-const': 'error',
    },
  },
  {
    files: ['**/*.html'],
    extends: [angular.configs.templateRecommended, angular.configs.templateAccessibility],
    rules: {},
  },
]);
