module.exports = {
  extends: './.eslintrc.js',
  rules: {
    'jsx-a11y/control-has-associated-label': 1,
    'jsx-a11y/click-events-have-key-events': 2,
    'jsx-a11y/anchor-is-valid': 2,
    'jsx-a11y/label-has-associated-control': 1,
    'jsx-a11y/no-static-element-interactions': 2,
    '@department-of-veterans-affairs/prefer-telephone-component': 2,
    '@department-of-veterans-affairs/telephone-contact-digits': 2,
    '@department-of-veterans-affairs/remove-expanding-group': 1,
    'deprecate/import': [
      'error',
      {
        name: '@department-of-veterans-affairs/component-library/TextInput',
        use: '<va-text-input>',
      },
      {
        name:
          '@department-of-veterans-affairs/component-library/ExpandingGroup',
        use: 'a custom solution',
      },
    ],
  },
};
