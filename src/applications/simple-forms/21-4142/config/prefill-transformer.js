export default function prefillTransformer(pages, formData, metadata) {
  return {
    pages,
    formData: {
      veteran: {
        fullName: formData?.veteran?.fullName,
        dateOfBirth: formData?.veteran?.dateOfBirth,
        ssn: formData?.veteran?.ssn,
        address: formData?.veteran?.address,
        homePhone: formData?.veteran?.homePhone,
        email: formData?.veteran?.email,
      },
    },
    metadata,
  };
}
