module.exports = {
  "parser": "vue-eslint-parser",
  "parserOptions": {
    "parser": "babel-eslint",
    "ecmaFeatures": {
      "modules": true
    }
  },
  "extends": [
    // add more generic rulesets here, such as:
    // 'eslint:recommended',
    "plugin:vue/recommended"
  ],
  "plugins": ["eslint-plugin-vue"],
  "globals": { "describe": true, "it": true, "expect": true }
}
