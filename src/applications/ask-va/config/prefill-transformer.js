export default function prefillTransformer(pages, formData, metadata) {
  const prefillPersonalInformation = data => {
    return {
      aboutYourself: {
        ...data.personalInformation,
        socialOrServiceNum: {
          serviceNumber: data.personalInformation.serviceNumber,
          ssn: data.personalInformation.socialSecurityNumber,
        },
        ...data.veteranServiceInformation,
      },
    };
  };

  const prefillContactInformation = data => {
    return {
      ...data.contactInformation,
      ...data.avaProfile,
    };
  };

  const prefillFormData = {
    ...prefillPersonalInformation(formData),
    ...prefillContactInformation(formData),
  };

  return {
    metadata,
    formData: prefillFormData,
    pages,
  };
}
