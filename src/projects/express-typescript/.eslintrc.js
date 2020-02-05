module.exports = {
  extends: [
		'plugin:@typescript-eslint/recommended'
	],

	parser: '@typescript-eslint/parser',
	plugins: [
		'@typescript-eslint',
		'@typescript-eslint/eslint-plugin',
	],
  env: {
    // 这里填入你的项目用到的环境
    // 它们预定义了不同环境的全局变量，比如：
    //
    browser: true,
    node: true,
    // mocha: true,
    // jest: true,
    // jquery: true
  },
  globals: {
    // 这里填入你的项目需要的全局变量
    // false 表示这个全局变量不允许被重新赋值，比如：
    //
    // myGlobal: false
  },
  rules: {
    "no-console": "error",
    "no-unused-vars": "error",
    "no-use-before-define": "error",
    "linebreak-style": ["error", "unix"],
    "quotes": ["error", "single"],
    "semi": ["error", "never"],
    "curly": ["error", "all"],
    "default-case": "error",
    "no-else-return": "error",
    "no-empty-function": "error",
    "no-implicit-coercion": "error",
    "no-invalid-this": "error",
    "no-loop-func": "error",
    "no-multi-spaces": "error",
    "no-new-func": "error",
    "no-useless-return": "error",
    "global-require": "error",
    "no-path-concat": "error",
    "no-sync": "error",
    "array-bracket-spacing": ["error", "never"],
    "block-spacing": ["error", "always"],
    "brace-style": ["error", "1tbs"],
    "camelcase": "error",
    "comma-dangle": ["error", "always-multiline"],
    "comma-spacing": ["error", { "before": false, "after": true }],
    "comma-style": ["error", "last"],
    "key-spacing": ["error", { "beforeColon": false, "afterColon": true }],
    "lines-around-comment": ["error",{ "beforeBlockComment": true }],
    "no-multi-assign": "error",
    "max-params": [1, 4],
    "no-multiple-empty-lines": ["error", { "max": 2 }],
    "no-shadow-restricted-names": "error",
    "no-undef-init": "error",
    "keyword-spacing": "error",
    "space-before-blocks": ["error", "always"],
    "@typescript-eslint/no-namespace": 0,
    "@typescript-eslint/no-explicit-any": 0,
    "@typescript-eslint/explicit-function-return-type": 0,
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        moduleDirectory: ['node_modules', 'src'],
      },
    },
  }
};