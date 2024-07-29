import React from 'react';
import { render } from '@testing-library/react';
import { expect } from 'chai';

import GeneralErrorAlert from '../../../../components/FormAlerts/GeneralErrorAlert';

describe('CG <DowntimeWarning>', () => {
  it('should render `va-alert` with status of `error`', () => {
    const { container } = render(<GeneralErrorAlert />);
    const selector = container.querySelector('va-alert');
    expect(selector).to.exist;
    expect(selector).to.have.attr('status', 'error');
  });
});
