/*
 * @Description: 文件内容
 * @Author: dali
 * @Date: 2022-05-17 15:03:48
 * @LastEditors: dali
 * @LastEditTime: 2022-05-17 16:38:33
 */
module.exports = {
  "extends": [
    'stylelint-config-standard-scss',
    'stylelint-config-recommended-vue',
    'stylelint-config-recommended-vue/scss',
  ],
  rules: {
    'indentation': 2,
    "scss/at-import-partial-extension": "always",
    'selector-pseudo-element-no-unknown': [
      true,
      {
        ignorePseudoElements: ['v-deep','/deep/']
      }
    ],
    "no-missing-end-of-source-newline": null,
    "selector-max-compound-selectors": 3,
    "at-rule-no-unknown":null,
  }
}