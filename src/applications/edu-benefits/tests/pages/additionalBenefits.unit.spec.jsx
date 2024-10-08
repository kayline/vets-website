// Could be renamed to militaryServiceadditionalBenefits, but for consistency...

import React from 'react';
import { findDOMNode } from 'react-dom';
import { expect } from 'chai';
import ReactTestUtils from 'react-dom/test-utils';

import { DefinitionTester } from 'platform/testing/unit/schemaform-utils.jsx';
import fullSchema5490 from 'vets-json-schema/dist/22-5490-schema.json';
import additionalBenefitsPage from '../../pages/additionalBenefits';

describe('Edu additionalBenefits page', () => {
  it('should show fund source when checked', () => {
    const { schema, uiSchema } = additionalBenefitsPage(fullSchema5490, {
      fields: ['civilianBenefitsAssistance', 'civilianBenefitsSource'],
    });
    const form = ReactTestUtils.renderIntoDocument(
      <DefinitionTester schema={schema} data={{}} uiSchema={uiSchema} />,
    );

    const formDOM = findDOMNode(form);

    expect(formDOM.querySelectorAll('input').length).to.equal(2);
    ReactTestUtils.Simulate.change(
      formDOM.querySelector('#root_civilianBenefitsAssistanceYes'),
      {
        target: {
          checked: true,
        },
      },
    );

    expect(formDOM.querySelectorAll('input').length).to.equal(3);
  });
});
