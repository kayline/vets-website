import React from 'react';
import SkinDeep from 'skin-deep';
import { expect } from 'chai';
import { within } from '@testing-library/react';

import { $ } from '@department-of-veterans-affairs/platform-forms-system/ui';

import ClaimDetailLayout from '../../components/ClaimDetailLayout';
import { renderWithRouter } from '../utils';

describe('<ClaimDetailLayout>', () => {
  it('should render loading indicator', () => {
    const tree = SkinDeep.shallowRender(<ClaimDetailLayout loading />);

    expect(tree.everySubTree('va-loading-indicator')).not.to.be.empty;
  });

  it('should render unavailable warning', () => {
    const claim = null;

    const tree = SkinDeep.shallowRender(<ClaimDetailLayout claim={claim} />);
    expect(tree.everySubTree('ClaimsUnavailable')).to.have.lengthOf(1);
  });

  it('should render when the claim was submitted', () => {
    const claim = {
      attributes: {
        claimType: 'Compensation',
        claimDate: '2023-11-23',
        contentions: [{ name: 'Condition 1' }, { name: 'Condition 2' }],
      },
    };

    const screen = renderWithRouter(<ClaimDetailLayout claim={claim} />);

    expect(screen.getByRole('heading', { level: 1 })).to.contain.text(
      'Received on November 23, 2023',
    );
  });

  it('should render adding details info if open', () => {
    const claim = {
      attributes: {
        closeDate: null,
        contentions: [{ name: 'Condition 1' }, { name: 'Condition 2' }],
        status: 'INITIAL_REVIEW',
      },
    };

    const tree = SkinDeep.shallowRender(
      <ClaimDetailLayout currentTab="Status" claim={claim} />,
    );

    expect(tree.everySubTree('AddingDetails')).not.to.be.empty;
  });

  it('should not render adding details info if closed', () => {
    const claim = {
      attributes: {
        closeDate: '2023-04-28',
        contentions: [{ name: 'Condition 1' }, { name: 'Condition 2' }],
        status: 'COMPLETE',
      },
    };

    const tree = SkinDeep.shallowRender(
      <ClaimDetailLayout currentTab="Status" claim={claim} />,
    );

    expect(tree.everySubTree('AddingDetails')).to.be.empty;
  });

  it('should render 3 tabs', () => {
    const claim = {
      attributes: {
        claimType: 'Compensation',
        claimDate: '2010-05-05',
        contentions: [{ name: 'Condition 1' }, { name: 'Condition 2' }],
      },
    };

    const { container } = renderWithRouter(
      <ClaimDetailLayout currentTab="Files" claim={claim} />,
    );

    const tabList = $('.tabs', container);
    expect(within(tabList).getAllByRole('listitem').length).to.equal(3);
  });

  it('should render normal info', () => {
    const claim = {
      attributes: {
        claimType: 'Compensation',
        claimDate: '2010-05-05',
        contentions: [{ name: 'Condition 1' }, { name: 'Condition 2' }],
      },
    };

    const tree = SkinDeep.shallowRender(
      <ClaimDetailLayout currentTab="Status" claim={claim}>
        <div className="child-content" />
      </ClaimDetailLayout>,
    );

    expect(tree.everySubTree('AddingDetails')).to.be.empty;
    expect(tree.everySubTree('.child-content')).not.to.be.empty;
  });

  it('should render message', () => {
    const claim = {
      attributes: {
        contentions: [{ name: 'Condition 1' }, { name: 'Condition 2' }],
      },
    };
    const message = {
      title: 'Test',
      body: 'Testing',
    };

    const tree = SkinDeep.shallowRender(
      <ClaimDetailLayout message={message} claim={claim} />,
    );

    expect(tree.subTree('Notification')).not.to.be.false;
  });
});
