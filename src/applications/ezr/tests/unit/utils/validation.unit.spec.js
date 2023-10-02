import { expect } from 'chai';
import sinon from 'sinon';

import {
  validateCurrency,
  validateDependentDate,
} from '../../../utils/validation';

describe('ezr validation utils', () => {
  describe('when `validateDependentDate` executes', () => {
    context('when form data is valid', () => {
      it('should not set error message', () => {
        const errors = {
          addError: sinon.spy(),
        };
        validateDependentDate(errors, '2010-01-01', {
          dateOfBirth: '2009-12-31',
        });
        expect(errors.addError.called).to.be.false;
      });
    });

    context('when birth date is after dependent date', () => {
      it('should set error message', () => {
        const errors = {
          addError: sinon.spy(),
        };
        validateDependentDate(errors, '2010-01-01', {
          dateOfBirth: '2011-01-01',
        });
        expect(errors.addError.called).to.be.true;
      });
    });
  });

  describe('when `validateCurrency` executes', () => {
    context('when form data is valid', () => {
      it('should not set error message', () => {
        const errors = {
          addError: sinon.spy(),
        };
        validateCurrency(errors, '234.23');
        expect(errors.addError.called).to.be.false;
      });
    });

    context('when value has three decimals', () => {
      it('should set error message', () => {
        const errors = {
          addError: sinon.spy(),
        };
        validateCurrency(errors, '234.234');
        expect(errors.addError.called).to.be.true;
      });
    });

    context('when value has trailing whitespace', () => {
      it('should set error message', () => {
        const errors = {
          addError: sinon.spy(),
        };
        validateCurrency(errors, '234234 ');
        expect(errors.addError.called).to.be.true;
      });
    });

    context('when value has leading whitespace', () => {
      it('should set error message', () => {
        const errors = {
          addError: sinon.spy(),
        };
        validateCurrency(errors, ' 234234');
        expect(errors.addError.called).to.be.true;
      });
    });

    context('when value includes dollar sign', () => {
      it('should not set error message', () => {
        const errors = {
          addError: sinon.spy(),
        };
        validateCurrency(errors, '$234,234');
        expect(errors.addError.called).to.be.false;
      });
    });
  });
});
