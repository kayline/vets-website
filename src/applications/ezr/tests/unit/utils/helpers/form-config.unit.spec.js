import { expect } from 'chai';
import {
  includeSpousalInformation,
  isMissingVeteranDob,
  isMissingVeteranGender,
  isSigiEnabled,
  hasDifferentHomeAddress,
  spouseDidNotCohabitateWithVeteran,
  spouseAddressDoesNotMatchVeterans,
  includeDependentInformation,
  includeInsuranceInformation,
  collectMedicareInformation,
} from '../../../../utils/helpers/form-config';
import {
  DEPENDENT_VIEW_FIELDS,
  INSURANCE_VIEW_FIELDS,
} from '../../../../utils/constants';

describe('ezr form config helpers', () => {
  context('when `isMissingVeteranDob` executes', () => {
    context('when viewfield is `null`', () => {
      const formData = { 'view:userDob': null };
      it('should return `true`', () => {
        expect(isMissingVeteranDob(formData)).to.be.true;
      });
    });

    context('when viewfield is populated', () => {
      const formData = { 'view:userDob': '1990-01-01' };
      it('should return `false`', () => {
        expect(isMissingVeteranDob(formData)).to.be.false;
      });
    });
  });

  context('when `isMissingVeteranGender` executes', () => {
    context('when gender is `null`', () => {
      const formData = { 'view:userGender': null };
      it('should return `true`', () => {
        expect(isMissingVeteranGender(formData)).to.be.true;
      });
    });

    context('when viewfield is populated', () => {
      const formData = { 'view:userGender': 'F' };
      it('should return `false`', () => {
        expect(isMissingVeteranGender(formData)).to.be.false;
      });
    });
  });

  context('when `isSigiEnabled` executes', () => {
    context('when value is `true`', () => {
      const formData = { 'view:isSigiEnabled': true };
      it('should return `true`', () => {
        expect(isSigiEnabled(formData)).to.be.true;
      });
    });

    context('when value is `false`', () => {
      const formData = { 'view:isSigiEnabled': false };
      it('should return `false`', () => {
        expect(isSigiEnabled(formData)).to.be.false;
      });
    });
  });

  context('when `hasDifferentHomeAddress` executes', () => {
    context('when mailing matches home address', () => {
      const formData = { 'view:doesMailingMatchHomeAddress': true };
      it('should return `false`', () => {
        expect(hasDifferentHomeAddress(formData)).to.be.false;
      });
    });

    context('when mailing does not match home address', () => {
      const formData = { 'view:doesMailingMatchHomeAddress': false };
      it('should return `true`', () => {
        expect(hasDifferentHomeAddress(formData)).to.be.true;
      });
    });
  });

  context('when `includeSpousalInformation` executes', () => {
    context('when marital status is `never married`', () => {
      const formData = { maritalStatus: 'never married' };
      it('should return `false`', () => {
        expect(includeSpousalInformation(formData)).to.be.false;
      });
    });

    context('when marital status is `married`', () => {
      const formData = { maritalStatus: 'married' };
      it('should return `true`', () => {
        expect(includeSpousalInformation(formData)).to.be.true;
      });
    });

    context('when marital status is `separated`', () => {
      const formData = { maritalStatus: 'separated' };
      it('should return `true`', () => {
        expect(includeSpousalInformation(formData)).to.be.true;
      });
    });
  });

  context('when `spouseDidNotCohabitateWithVeteran` executes', () => {
    context('when Veteran was not married or legally separarted', () => {
      const formData = { maritalStatus: 'not married' };
      it('should return `false`', () => {
        expect(spouseDidNotCohabitateWithVeteran(formData)).to.be.false;
      });
    });

    context('when spouse did cohabitate with Veteran', () => {
      const formData = { maritalStatus: 'married', cohabitedLastYear: true };
      it('should return `false`', () => {
        expect(spouseDidNotCohabitateWithVeteran(formData)).to.be.false;
      });
    });

    context('when spouse did not cohabitate with Veteran', () => {
      const formData = { maritalStatus: 'married', cohabitedLastYear: false };
      it('should return `true`', () => {
        expect(spouseDidNotCohabitateWithVeteran(formData)).to.be.true;
      });
    });
  });

  context('when `spouseAddressDoesNotMatchVeterans` executes', () => {
    context('when Veteran was not married or legally separarted', () => {
      const formData = { maritalStatus: 'not married' };
      it('should return `false`', () => {
        expect(spouseAddressDoesNotMatchVeterans(formData)).to.be.false;
      });
    });

    context('when spouse address matches Veteran', () => {
      const formData = { maritalStatus: 'married', sameAddress: true };
      it('should return `false`', () => {
        expect(spouseAddressDoesNotMatchVeterans(formData)).to.be.false;
      });
    });

    context('when spouse address does not match Veteran', () => {
      const formData = { maritalStatus: 'married', sameAddress: false };
      it('should return `true`', () => {
        expect(spouseAddressDoesNotMatchVeterans(formData)).to.be.true;
      });
    });
  });

  context('when `includeDependentInformation` executes', () => {
    context('when skip value is `true`', () => {
      const formData = { [DEPENDENT_VIEW_FIELDS.skip]: true };
      it('should return `false`', () => {
        expect(includeDependentInformation(formData)).to.be.false;
      });
    });

    context('when skip value is `false`', () => {
      const formData = { [DEPENDENT_VIEW_FIELDS.skip]: false };
      it('should return `true`', () => {
        expect(includeDependentInformation(formData)).to.be.true;
      });
    });
  });

  context('when `collectMedicareInformation` executes', () => {
    context('when Veteran is enrolled in Medicare', () => {
      const formData = { isEnrolledMedicarePartA: true };
      it('should return `true`', () => {
        expect(collectMedicareInformation(formData)).to.be.true;
      });
    });

    context('when Veteran is not enrolled in Medicare', () => {
      const formData = { isEnrolledMedicarePartA: false };
      it('should return `false`', () => {
        expect(collectMedicareInformation(formData)).to.be.false;
      });
    });
  });

  context('when `includeInsuranceInformation` executes', () => {
    context('when skip value is `true`', () => {
      const formData = { [INSURANCE_VIEW_FIELDS.skip]: true };
      it('should return `false`', () => {
        expect(includeInsuranceInformation(formData)).to.be.false;
      });
    });

    context('when skip value is `false`', () => {
      const formData = { [INSURANCE_VIEW_FIELDS.skip]: false };
      it('should return `true`', () => {
        expect(includeInsuranceInformation(formData)).to.be.true;
      });
    });
  });
});
