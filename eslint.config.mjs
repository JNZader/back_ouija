// @ts-check
import eslint from '@eslint/js';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    // Archivos a ignorar
    ignores: [
      'dist/**',
      'node_modules/**',
      'coverage/**',
      '.eslintrc.js',
      'eslint.config.mjs',
      '**/*.spec.ts',
      '**/*.e2e-spec.ts',
      'jest.config.js',
      'prisma/**',
      'generated/**'
    ],
  },
  
  // Configuraciones base recomendadas
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  
  // Prettier al final para que tenga prioridad
  eslintPluginPrettierRecommended,
  
  {
    // Archivos a los que aplica
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.mjs'],
    
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
      },
      ecmaVersion: 2022,
      sourceType: 'module',
      parser: tseslint.parser,
      parserOptions: {
        project: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    
    rules: {
      // Reglas de TypeScript - MÁS FLEXIBLES
      '@typescript-eslint/interface-name-prefix': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': ['warn', { 
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
      }],
      '@typescript-eslint/no-floating-promises': 'off', // Desactivado para evitar warnings
      '@typescript-eslint/no-unsafe-argument': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-unsafe-return': 'off',
      
      // Reglas para NestJS decorators
      '@typescript-eslint/no-extraneous-class': 'off',
      '@typescript-eslint/no-useless-constructor': 'off',
      
      // Prettier - MÁS FLEXIBLE
      /* 'prettier/prettier': ['warn', {
        endOfLine: 'auto', // Acepta cualquier tipo de final de línea
        singleQuote: true,
        trailingComma: 'all',
      }],*/
      'prettier/prettier': 'off',

      // Reglas generales de JavaScript
      'no-console': 'off', // Permitir console.log durante desarrollo
      'no-debugger': 'warn',
      'prefer-const': 'warn',
      'no-var': 'error',
    },
  },
  
  // Configuración específica para archivos de test
  {
    files: ['**/*.spec.ts', '**/*.e2e-spec.ts'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-unsafe-return': 'off',
      'no-console': 'off',
    },
  },
);