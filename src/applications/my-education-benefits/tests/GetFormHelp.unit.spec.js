import React from 'react';
import { expect } from 'chai';
// import { isReactComponent } from 'platform/utilities/ui';
import GetFormHelp from '../components/GetFormHelp';

describe('GetFormHelp component', () => {
  it('renders the Get Help footer', () => {
    expect(<GetFormHelp showMebDgi40Features />);
  });
});
