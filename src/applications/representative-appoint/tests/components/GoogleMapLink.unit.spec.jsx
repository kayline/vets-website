import React from 'react';
import { render } from '@testing-library/react';
import { expect } from 'chai';
import sinon from 'sinon';
import { $ } from 'platform/forms-system/src/js/utilities/ui';
import GoogleMapLink from '../../components/GoogleMapLink';

describe('GoogleMapLink Component', () => {
  const address = {
    address1: '400 South 18th Street',
    address2: 'Room 119',
    address3: '',
    city: 'Newark',
    state: 'NJ',
    zip: '07102',
  };
  const mockRecordClick = () => {};

  it('should render the Google Maps link with the correct href', () => {
    const { container } = render(
      <GoogleMapLink address={address} recordClick={mockRecordClick} />,
    );

    const googleMapsLink = $('a', container);
    const expectedAddressString =
      '400 South 18th Street Room 119 Newark, NJ 07102';
    expect(googleMapsLink).to.exist;
    expect(googleMapsLink.getAttribute('href')).to.equal(
      `https://maps.google.com?daddr=${expectedAddressString}`,
    );
  });

  it('should call recordClick when the Google Maps link is clicked', () => {
    const recordClickSpy = sinon.spy();
    const { container } = render(
      <GoogleMapLink address={address} recordClick={recordClickSpy} />,
    );

    const googleMapsLink = $('a', container);
    googleMapsLink.click();

    expect(recordClickSpy.calledOnce).to.be.true;
  });
});
