export function transform(formConfig, form) {
  return JSON.stringify({
    educationBenefitsClaim: {
      form: form.data,
    },
  });
}
