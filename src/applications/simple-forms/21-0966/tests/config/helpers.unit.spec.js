import { expect } from 'chai';
import { createInitialState } from '@department-of-veterans-affairs/platform-forms-system/exports';
import {
  contactInformationStepperTitle,
  preparerIsSurvivingDependent,
  preparerIsThirdPartyToTheVeteran,
  preparerIsThirdPartyToASurvivingDependent,
  preparerIsThirdParty,
  preparerIsVeteran,
  benefitSelectionTitle,
  personalInformationStepperTitle,
  benefitSelectionStepperTitle,
  initializeFormDataWithPreparerIdentification,
  statementOfTruthFullNamePath,
  getAlertType,
  getSuccessAlertTitle,
  getSuccessAlertText,
  getInfoAlertTitle,
  getInfoAlertText,
  getAlreadySubmittedTitle,
  getAlreadySubmittedText,
  getNextStepsTextSecondParagraph,
  getNextStepsLinks,
} from '../../config/helpers';
import {
  preparerIdentifications,
  veteranBenefits,
  survivingDependentBenefits,
  benefitPhrases,
} from '../../definitions/constants';
import formConfig from '../../config/form';

describe('form helper functions', () => {
  it('provides the correct information for a veteran', () => {
    const formData = {
      preparerIdentification: 'VETERAN',
    };

    expect(preparerIsVeteran({ formData })).to.equal(true);
    expect(preparerIsSurvivingDependent({ formData })).to.equal(false);
    expect(preparerIsThirdPartyToTheVeteran({ formData })).to.equal(false);
    expect(preparerIsThirdPartyToASurvivingDependent({ formData })).to.equal(
      false,
    );
    expect(preparerIsThirdParty({ formData })).to.equal(false);
    expect(benefitSelectionStepperTitle({ formData })).to.match(/Your/i);
    expect(benefitSelectionTitle({ formData })).to.match(/you/i);
    expect(personalInformationStepperTitle({ formData })).to.match(/Your/i);
    expect(contactInformationStepperTitle({ formData })).to.match(/Your/i);
  });

  it('provides the correct information for a surviving dependent', () => {
    const formData = {
      preparerIdentification: 'SURVIVING_DEPENDENT',
    };

    expect(preparerIsVeteran({ formData })).to.equal(false);
    expect(preparerIsSurvivingDependent({ formData })).to.equal(true);
    expect(preparerIsThirdPartyToTheVeteran({ formData })).to.equal(false);
    expect(preparerIsThirdPartyToASurvivingDependent({ formData })).to.equal(
      false,
    );
    expect(preparerIsThirdParty({ formData })).to.equal(false);
    expect(benefitSelectionStepperTitle({ formData })).to.match(/Your/i);
    expect(benefitSelectionTitle({ formData })).to.match(/you/i);
    expect(personalInformationStepperTitle({ formData })).to.match(/Your/i);
    expect(contactInformationStepperTitle({ formData })).to.match(/Your/i);
  });

  it('provides the correct information for a third party to the veteran', () => {
    const formData = {
      preparerIdentification: 'THIRD_PARTY_VETERAN',
    };

    expect(preparerIsVeteran({ formData })).to.equal(false);
    expect(preparerIsSurvivingDependent({ formData })).to.equal(false);
    expect(preparerIsThirdPartyToTheVeteran({ formData })).to.equal(true);
    expect(preparerIsThirdPartyToASurvivingDependent({ formData })).to.equal(
      false,
    );
    expect(preparerIsThirdParty({ formData })).to.equal(true);
    expect(benefitSelectionStepperTitle({ formData })).to.match(/Veteran/i);
    expect(benefitSelectionTitle({ formData })).to.match(/Veteran/i);
    expect(personalInformationStepperTitle({ formData })).to.match(/Veteran/i);
    expect(contactInformationStepperTitle({ formData })).to.match(/Veteran/i);
  });

  it('provides the correct information for a third party to the surviving dependent', () => {
    const formData = {
      preparerIdentification: 'THIRD_PARTY_SURVIVING_DEPENDENT',
    };

    expect(preparerIsVeteran({ formData })).to.equal(false);
    expect(preparerIsSurvivingDependent({ formData })).to.equal(false);
    expect(preparerIsThirdPartyToTheVeteran({ formData })).to.equal(false);
    expect(preparerIsThirdPartyToASurvivingDependent({ formData })).to.equal(
      true,
    );
    expect(preparerIsThirdParty({ formData })).to.equal(true);
    expect(benefitSelectionStepperTitle({ formData })).to.match(/Claimant/i);
    expect(benefitSelectionTitle({ formData })).to.match(/Claimant/i);
    expect(personalInformationStepperTitle({ formData })).to.match(/Claimant/i);
    expect(contactInformationStepperTitle({ formData })).to.match(/Claimant/i);
  });

  it('provides a reasonble default', () => {
    const formData = {
      preparerIdentification: '',
    };

    expect(preparerIsVeteran({ formData })).to.equal(false);
    expect(preparerIsSurvivingDependent({ formData })).to.equal(false);
    expect(preparerIsThirdPartyToTheVeteran({ formData })).to.equal(false);
    expect(preparerIsThirdPartyToASurvivingDependent({ formData })).to.equal(
      false,
    );
    expect(preparerIsThirdParty({ formData })).to.equal(false);
    expect(benefitSelectionStepperTitle({ formData })).to.match(/Your/i);
    expect(benefitSelectionTitle({ formData })).to.match(/you/i);
    expect(personalInformationStepperTitle({ formData })).to.match(/Your/i);
    expect(contactInformationStepperTitle({ formData })).to.match(/Your/i);
  });
});

describe('initializeFormDataWithPreparerIdentification', () => {
  it('returns an initialized formData object with preparerIdentification selection', () => {
    expect(
      initializeFormDataWithPreparerIdentification(
        preparerIdentifications.veteran,
      ),
    ).to.deep.equal({
      ...createInitialState(formConfig).data,
      preparerIdentification: preparerIdentifications.veteran,
    });
  });
});

describe('statementOfTruthFullNamePath', () => {
  it('returns the required signature formData path for third parties', () => {
    const formData = {
      preparerIdentification: preparerIdentifications.thirdPartyVeteran,
    };

    expect(statementOfTruthFullNamePath({ formData })).to.equal(
      'thirdPartyPreparerFullName',
    );

    formData.preparerIdentification =
      preparerIdentifications.thirdPartySurvivingDependent;

    expect(statementOfTruthFullNamePath({ formData })).to.equal(
      'thirdPartyPreparerFullName',
    );
  });

  it('returns the required signature formData path for veterans', () => {
    const formData = {
      preparerIdentification: preparerIdentifications.veteran,
    };

    expect(statementOfTruthFullNamePath({ formData })).to.equal(
      'veteranFullName',
    );
  });

  it('returns the required signature formData path for non-third party surviving dependents', () => {
    const formData = {
      preparerIdentification: preparerIdentifications.survivingDependent,
    };

    expect(statementOfTruthFullNamePath({ formData })).to.equal(
      'survivingDependentFullName',
    );
  });
});

describe('confirmation page helper functions', () => {
  describe('success alert', () => {
    describe('One intent selected and filed', () => {
      [
        veteranBenefits.compensation,
        veteranBenefits.pension,
        survivingDependentBenefits.survivors,
      ].forEach(selectedIntent => {
        const data = {
          benefitSelection: {
            [selectedIntent]: true,
          },
        };
        const expirationDate = 'expiration-date';

        it('shows a success alert', () => {
          expect(getAlertType(data, {})).to.equal('success');
        });

        it('successfully gets the success alert title', () => {
          expect(getSuccessAlertTitle(data, {})).to.equal(
            'You’ve submitted your intent to file',
          );
        });

        it('successfully gets the success alert text', () => {
          expect(getSuccessAlertText(data, {}, expirationDate)).to.equal(
            `Your intent to file for ${
              benefitPhrases[selectedIntent.toLowerCase()]
            } will expire on ${expirationDate}.`,
          );
        });
      });
    });

    describe('Two intents selected and filed', () => {
      const data = {
        benefitSelection: {
          [veteranBenefits.compensation]: true,
          [veteranBenefits.pension]: true,
        },
      };
      const expirationDate = 'expiration-date';

      it('shows a success alert', () => {
        expect(getAlertType(data, {})).to.equal('success');
      });

      it('successfully gets the success alert title', () => {
        expect(getSuccessAlertTitle(data, {})).to.equal(
          'You’ve submitted your intent to file',
        );
      });

      it('successfully gets the success alert text', () => {
        expect(getSuccessAlertText(data, {}, expirationDate)).to.equal(
          `Your intent to file for disability compensation and pension claims will expire on ${expirationDate}.`,
        );
      });
    });

    describe('Two intents selected, one filed and one already on file', () => {
      const data = {
        benefitSelection: {
          [veteranBenefits.compensation]: true,
          [veteranBenefits.pension]: true,
        },
      };
      const expirationDate = 'expiration-date';

      [veteranBenefits.compensation, veteranBenefits.pension].forEach(
        alreadySubmittedIntentType => {
          const alreadySubmittedIntents = {
            [alreadySubmittedIntentType]: {
              creationDate: '2021-03-16T19:15:21.000-05:00',
              expirationDate: '2022-03-16T19:15:20.000-05:00',
              type: alreadySubmittedIntentType,
              status: 'active',
            },
          };
          const newlySelectedIntent = [
            veteranBenefits.compensation,
            veteranBenefits.pension,
          ].filter(intent => intent !== alreadySubmittedIntentType)[0];

          it('shows a success alert', () => {
            expect(getAlertType(data, alreadySubmittedIntents)).to.equal(
              'success',
            );
          });

          it('successfully gets the success alert title', () => {
            expect(
              getSuccessAlertTitle(data, alreadySubmittedIntents),
            ).to.equal(
              `You’ve submitted your intent to file for ${
                benefitPhrases[newlySelectedIntent.toLowerCase()]
              }`,
            );
          });

          it('successfully gets the success alert text', () => {
            expect(
              getSuccessAlertText(
                data,
                alreadySubmittedIntents,
                expirationDate,
              ),
            ).to.equal(`Your intent to file will expire on ${expirationDate}.`);
          });
        },
      );
    });

    describe('One intent selected, already on file, so nothing new is filed', () => {
      [
        veteranBenefits.compensation,
        veteranBenefits.pension,
        survivingDependentBenefits.survivors,
      ].forEach(selectedIntent => {
        const data = {
          benefitSelection: {
            [selectedIntent]: true,
          },
        };
        const expirationDate = '2024-09-22T19:15:20.000-05:00';
        const alreadySubmittedIntents = {
          [selectedIntent.toLowerCase()]: {
            creationDate: '2021-03-16T19:15:21.000-05:00',
            expirationDate,
            type: selectedIntent,
            status: 'active',
          },
        };

        it('shows an info alert', () => {
          expect(getAlertType(data, alreadySubmittedIntents)).to.equal('info');
        });

        it('successfully gets the info alert title', () => {
          expect(getInfoAlertTitle()).to.equal(
            'You’ve already submitted an intent to file',
          );
        });

        it('successfully gets the info alert text', () => {
          const dateOptions = {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          };
          expect(getInfoAlertText(data, alreadySubmittedIntents)).to.equal(
            `Our records show that you already have an intent to file for ${
              benefitPhrases[selectedIntent.toLowerCase()]
            } and it will expire on ${new Date(
              expirationDate,
            ).toLocaleDateString('en-US', dateOptions)}.`,
          );
        });
      });
    });

    describe('Two intents selected, both already on file, so nothing new is filed', () => {
      const data = {
        benefitSelection: {
          [veteranBenefits.compensation]: true,
          [veteranBenefits.pension]: true,
        },
      };
      const expirationDate = 'expiration-date';
      const alreadySubmittedIntents = {
        compensation: {
          creationDate: '2021-03-16T19:15:21.000-05:00',
          expirationDate,
          type: veteranBenefits.compensation,
          status: 'active',
        },
        pension: {
          creationDate: '2021-03-16T19:15:21.000-05:00',
          expirationDate,
          type: veteranBenefits.pension,
          status: 'active',
        },
      };

      it('shows an info alert', () => {
        expect(getAlertType(data, alreadySubmittedIntents)).to.equal('info');
      });

      it('successfully gets the info alert title', () => {
        expect(getInfoAlertTitle()).to.equal(
          'You’ve already submitted an intent to file',
        );
      });

      it('successfully gets the info alert text', () => {
        expect(getInfoAlertText(data, alreadySubmittedIntents)).to.equal(
          'Our records show that you already have an intent to file for disability compensation and for pension claims.',
        );
      });
    });
  });

  describe('next steps', () => {
    describe('One intent selected and filed', () => {
      [
        veteranBenefits.compensation,
        veteranBenefits.pension,
        survivingDependentBenefits.survivors,
      ].forEach(selectedIntent => {
        const data = {
          benefitSelection: {
            [selectedIntent]: true,
          },
        };
        const expirationDate = 'expiration-date';

        it('successfully gets the already submitted title', () => {
          expect(getAlreadySubmittedTitle(data, {})).to.equal(null);
        });

        it('successfully gets the already submitted text', () => {
          expect(getAlreadySubmittedText(data, {})).to.equal(null);
        });

        it('successfully gets the second paragraph of the next steps text', () => {
          expect(
            getNextStepsTextSecondParagraph(data, {}, expirationDate),
          ).to.equal(
            `Your intent to file for ${
              benefitPhrases[selectedIntent.toLowerCase()]
            } expires on ${expirationDate}. You’ll need to file your claim by this date to get retroactive payments (payments for the time between when you submit your intent to file and when we approve your claim).`,
          );
        });

        it('successfully gets the next steps links', () => {
          const result = getNextStepsLinks(data);
          expect(result.length).to.equal(1);
          expect(result).to.contain(selectedIntent);
        });
      });
    });

    describe('Two intents selected and filed', () => {
      const data = {
        benefitSelection: {
          [veteranBenefits.compensation]: true,
          [veteranBenefits.pension]: true,
        },
      };
      const expirationDate = 'expiration-date';

      it('successfully gets the already submitted title', () => {
        expect(getAlreadySubmittedTitle(data, {})).to.equal(null);
      });

      it('successfully gets the already submitted text', () => {
        expect(getAlreadySubmittedText(data, {})).to.equal(null);
      });

      it('successfully gets the second paragraph of the next steps text', () => {
        expect(
          getNextStepsTextSecondParagraph(data, {}, expirationDate),
        ).to.equal(
          'You’ll need to file your claims within 1 year to get retroactive payments (payments for the time between when you submit your intent to file and when we approve your claim).',
        );
      });

      it('successfully gets the next steps links', () => {
        const result = getNextStepsLinks(data);
        expect(result.length).to.equal(2);
        expect(result).to.contain(veteranBenefits.compensation);
        expect(result).to.contain(veteranBenefits.pension);
      });
    });

    describe('Two intents selected, one filed and one already on file', () => {
      const data = {
        benefitSelection: {
          [veteranBenefits.compensation]: true,
          [veteranBenefits.pension]: true,
        },
      };
      const dateOptions = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      };
      const alreadySubmittedExpirationDate = '2022-03-16T19:15:20.000-05:00';
      const formattedAlreadySubmittedExpirationDate = new Date(
        alreadySubmittedExpirationDate,
      ).toLocaleDateString('en-us', dateOptions);

      [veteranBenefits.compensation, veteranBenefits.pension].forEach(
        alreadySubmittedIntentType => {
          const alreadySubmittedIntents = {
            [alreadySubmittedIntentType]: {
              creationDate: '2021-03-16T19:15:21.000-05:00',
              expirationDate: alreadySubmittedExpirationDate,
              type: alreadySubmittedIntentType,
              status: 'active',
            },
          };

          it('successfully gets the already submitted title', () => {
            expect(
              getAlreadySubmittedTitle(data, alreadySubmittedIntents),
            ).to.equal(
              `You’ve already submitted an intent to file for ${
                benefitPhrases[alreadySubmittedIntentType.toLowerCase()]
              }`,
            );
          });

          it('successfully gets the already submitted text', () => {
            expect(
              getAlreadySubmittedText(data, alreadySubmittedIntents),
            ).to.equal(
              `Our records show that you already have an intent to file for ${
                benefitPhrases[alreadySubmittedIntentType.toLowerCase()]
              }. Your intent to file for ${
                benefitPhrases[alreadySubmittedIntentType.toLowerCase()]
              } expires on ${formattedAlreadySubmittedExpirationDate}. You’ll need to submit your claim by this date in order to receive payments starting from your effective date.`,
            );
          });

          it('successfully gets the second paragraph of the next steps text', () => {
            expect(
              getNextStepsTextSecondParagraph(data, alreadySubmittedIntents),
            ).to.equal(
              'You’ll need to file your claims within 1 year to get retroactive payments (payments for the time between when you submit your intent to file and when we approve your claim).',
            );
          });

          it('successfully gets the next steps links', () => {
            const result = getNextStepsLinks(data);
            expect(result.length).to.equal(2);
            expect(result).to.contain(veteranBenefits.compensation);
            expect(result).to.contain(veteranBenefits.pension);
          });
        },
      );
    });

    describe('One intent selected, already on file, so nothing new is filed', () => {
      [
        veteranBenefits.compensation,
        veteranBenefits.pension,
        survivingDependentBenefits.survivors,
      ].forEach(selectedIntent => {
        const data = {
          benefitSelection: {
            [selectedIntent]: true,
          },
        };
        const dateOptions = {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        };
        const expirationDate = '2024-09-22T19:15:20.000-05:00';
        const formattedExpirationDate = new Date(
          expirationDate,
        ).toLocaleDateString('en-us', dateOptions);
        const alreadySubmittedIntents = {
          [selectedIntent.toLowerCase()]: {
            creationDate: '2021-03-16T19:15:21.000-05:00',
            expirationDate,
            type: selectedIntent,
            status: 'active',
          },
        };

        it('successfully gets the already submitted title', () => {
          expect(getAlreadySubmittedTitle(data, {})).to.equal(null);
        });

        it('successfully gets the already submitted text', () => {
          expect(getAlreadySubmittedText(data, {})).to.equal(null);
        });

        it('successfully gets the second paragraph of the next steps text', () => {
          expect(
            getNextStepsTextSecondParagraph(data, alreadySubmittedIntents),
          ).to.equal(
            `Your intent to file for ${
              benefitPhrases[selectedIntent.toLowerCase()]
            } expires on ${formattedExpirationDate}. You’ll need to file your claim by this date to get retroactive payments (payments for the time between when you submit your intent to file and when we approve your claim).`,
          );
        });

        it('successfully gets the next steps links', () => {
          const result = getNextStepsLinks(data);
          expect(result.length).to.equal(1);
          expect(result).to.contain(selectedIntent);
        });
      });
    });

    describe('Two intents selected, both already on file, so nothing new is filed', () => {
      const data = {
        benefitSelection: {
          [veteranBenefits.compensation]: true,
          [veteranBenefits.pension]: true,
        },
      };
      const dateOptions = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      };
      const expirationDate = '2022-03-16T19:15:21.000-05:00';
      const formattedExpirationDate = new Date(
        expirationDate,
      ).toLocaleDateString('en-us', dateOptions);
      const alreadySubmittedIntents = {
        compensation: {
          creationDate: '2021-03-16T19:15:21.000-05:00',
          expirationDate,
          type: veteranBenefits.compensation,
          status: 'active',
        },
        pension: {
          creationDate: '2021-03-16T19:15:21.000-05:00',
          expirationDate,
          type: veteranBenefits.pension,
          status: 'active',
        },
      };

      it('successfully gets the already submitted title', () => {
        expect(getAlreadySubmittedTitle(data, {})).to.equal(null);
      });

      it('successfully gets the already submitted text', () => {
        expect(getAlreadySubmittedText(data, {})).to.equal(null);
      });

      it('successfully gets the second paragraph of the next steps text', () => {
        expect(
          getNextStepsTextSecondParagraph(data, alreadySubmittedIntents),
        ).to.equal(
          `Your intent to file for disability compensation expires on ${formattedExpirationDate} and your intent to file for pension claims expires on ${formattedExpirationDate}. You’ll need to file your claims by these dates to get retroactive payments (payments for the time between when you submit your intent to file and when we approve your claim).`,
        );
      });

      it('successfully gets the next steps links', () => {
        const result = getNextStepsLinks(data);
        expect(result.length).to.equal(2);
        expect(result).to.contain(veteranBenefits.compensation);
        expect(result).to.contain(veteranBenefits.pension);
      });
    });
  });
});
