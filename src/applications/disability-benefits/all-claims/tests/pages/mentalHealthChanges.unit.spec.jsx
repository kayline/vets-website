import React from 'react';
import { expect } from 'chai';
import sinon from 'sinon';
import { DefinitionTester } from 'platform/testing/unit/schemaform-utils.jsx';
import { mount } from 'enzyme';
import formConfig from '../../config/form';

describe('Mental Changes 781a', () => {
  const {
    schema,
    uiSchema,
  } = formConfig.chapters.disabilities.pages.mentalHealthChanges;

  it('should render', () => {
    const form = mount(
      <DefinitionTester
        definitions={formConfig}
        schema={schema}
        uiSchema={uiSchema}
        data={{
          mentalChanges: {
            other: true,
          },
        }}
        formData={{}}
      />,
    );

    expect(form.find('va-checkbox').length).to.equal(9);
    expect(form.find('textarea').length).to.equal(1);
    form.unmount();
  });

  it('should submit if no options selected', () => {
    const onSubmit = sinon.spy();

    const form = mount(
      <DefinitionTester
        definitions={formConfig}
        schema={schema}
        uiSchema={uiSchema}
        data={{
          mentalChanges: {
            other: false,
          },
        }}
        formData={{}}
        onSubmit={onSubmit}
      />,
    );

    form.find('form').simulate('submit');
    expect(form.find('.usa-input-error-message').length).to.equal(0);
    expect(onSubmit.called).to.be.true;
    form.unmount();
  });
});
