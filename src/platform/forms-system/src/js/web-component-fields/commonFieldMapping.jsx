/** @param {WebComponentFieldProps} props */
export default function commonFieldMapping(props) {
  const { label, required, error, uiOptions, childrenProps } = props;

  return {
    class: `rjsf-web-component-field${
      uiOptions?.classNames ? ` ${uiOptions.classNames}` : ''
    }`,
    enableAnalytics: uiOptions?.enableAnalytics,
    error,
    hint: uiOptions?.hint,
    inert: uiOptions?.inert,
    inputmode: uiOptions?.inputmode,
    invalid: uiOptions?.invalid,
    label,
    labelHeaderLevel: uiOptions?.labelHeaderLevel,
    maxlength: childrenProps.schema.maxLength,
    messageAriaDescribedby: uiOptions?.messageAriaDescribedby,
    minlength: childrenProps.schema.minLength,
    name: childrenProps.idSchema.$id,
    pattern: childrenProps.schema.pattern,
    reflectInputError: uiOptions?.reflectInputError,
    required,
    success: uiOptions?.success,
    // returning false results in bugs, so use undefined or true instead
    // default uswds to true (v3 web component)
    uswds: uiOptions?.uswds === false ? undefined : true,
  };
}
