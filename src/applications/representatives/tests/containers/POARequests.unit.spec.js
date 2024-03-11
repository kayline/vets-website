import { render } from '@testing-library/react';
import { expect } from 'chai';
import React from 'react';

import POARequests from '../../containers/POARequests';
import { mockPOARequests } from '../../mocks/mockPOARequests';

describe('POARequests page', () => {
  it('renders', () => {
    render(<POARequests />);
  });

  it('renders header', () => {
    const { getByText } = render(<POARequests />);
    expect(getByText('Power of attorney requests')).to.exist;
  });

  it('renders content when has POA permissions', () => {
    const { getByText } = render(<POARequests />);
    expect(getByText('Power of attorney requests')).to.exist;
  });

  describe('POA requests table', () => {
    it('renders table headers', () => {
      const { getByTestId, getByText } = render(<POARequests />);
      expect(getByTestId('poa-requests-table')).to.exist;
      expect(getByText('Claimant')).to.exist;
      expect(getByText('Submitted')).to.exist;
      expect(getByText('Description')).to.exist;
      expect(getByText('Status')).to.exist;
      expect(getByText('Actions')).to.exist;
    });

    it('renders table with mockPOARequests', () => {
      const { getByTestId } = render(<POARequests poaPermissions />);
      mockPOARequests.forEach(poaRequest => {
        expect(getByTestId(`${poaRequest.id}-claimant`)).to.contain.text(
          poaRequest.name,
        );
        expect(getByTestId(`${poaRequest.id}-submitted`)).to.contain.text(
          poaRequest.date,
        );
        expect(getByTestId(`${poaRequest.id}-description`)).to.contain.text(
          poaRequest.description,
        );
        expect(getByTestId(`${poaRequest.id}-status`)).to.contain.text(
          poaRequest.status,
        );
        if (poaRequest.status === 'Pending') {
          expect(getByTestId(`${poaRequest.id}-accept-button`)).to.exist;
          expect(getByTestId(`${poaRequest.id}-decline-button`)).to.exist;
        }
      });
    });
  });
});
