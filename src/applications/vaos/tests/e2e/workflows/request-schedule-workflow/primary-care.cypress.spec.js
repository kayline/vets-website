// @ts-check
import moment from 'moment';
import { APPOINTMENT_STATUS, PRIMARY_CARE } from '../../../../utils/constants';
import MockAppointmentResponse from '../../fixtures/MockAppointmentResponse';
import {
  mockAppointmentGetApi,
  mockAppointmentCreateApi,
  mockAppointmentsGetApi,
  mockEligibilityApi,
  mockFacilitiesApi,
  mockFeatureToggles,
  mockSchedulingConfigurationApi,
  mockVamcEhrApi,
  vaosSetup,
  mockEligibilityCCApi,
} from '../../vaos-cypress-helpers';
import MockUser from '../../fixtures/MockUser';
import AppointmentListPageObject from '../../page-objects/AppointmentList/AppointmentListPageObject';
import TypeOfCarePageObject from '../../page-objects/TypeOfCarePageObject';
import VAFacilityPageObject from '../../page-objects/VAFacilityPageObject';
import MockEligibilityResponse from '../../fixtures/MockEligibilityResponse';
import MockFacilityResponse from '../../fixtures/MockFacilityResponse';
import DateTimeRequestPageObject from '../../page-objects/DateTimeRequestPageObject';
import TypeOfVisitPageObject from '../../page-objects/TypeOfVisitPageObject';
import ContactInfoPageObject from '../../page-objects/ContactInfoPageObject';
import ReviewPageObject from '../../page-objects/ReviewPageObject';
import ConfirmationPageObject from '../../page-objects/ConfirmationPageObject';
import ReasonForAppointmentPageObject from '../../page-objects/ReasonForAppointmentPageObject';
import TypeOfFacilityPageObject from '../../page-objects/TypeOfFacilityPageObject';
import { getTypeOfCareById } from '../../../../utils/appointment';

const typeOfCareId = getTypeOfCareById(PRIMARY_CARE).idV2;
const { cceType } = getTypeOfCareById(PRIMARY_CARE);

describe('VAOS request schedule flow - Primary care', () => {
  beforeEach(() => {
    vaosSetup();

    const response = new MockAppointmentResponse({
      id: 'mock1',
      localStartTime: moment(),
      status: APPOINTMENT_STATUS.proposed,
      serviceType: 'primaryCare',
    });
    mockAppointmentGetApi({
      response,
    });
    mockAppointmentCreateApi({ response });
    mockAppointmentsGetApi({ response: [] });
    mockFeatureToggles();
    mockVamcEhrApi();
  });

  describe('When veteran is not CC eligible', () => {
    describe('And one facility supports online scheduling', () => {
      beforeEach(() => {
        const mockEligibilityResponse = new MockEligibilityResponse({
          facilityId: '983',
          typeOfCareId,
          isEligible: true,
        });

        mockFacilitiesApi({
          response: MockFacilityResponse.createResponses({
            facilityIds: ['983'],
          }),
        });
        mockEligibilityApi({ response: mockEligibilityResponse });
        mockEligibilityCCApi({ cceType, isEligible: false });
        mockSchedulingConfigurationApi({
          facilityIds: ['983'],
          typeOfCareId,
          isDirect: false,
          isRequest: true,
        });
      });

      describe('And veteran does have a home address', () => {
        it('should submit form', () => {
          // Arrange
          const mockUser = new MockUser({ addressLine1: '123 Main St.' });

          // Act
          cy.login(mockUser);

          AppointmentListPageObject.visit().scheduleAppointment();

          TypeOfCarePageObject.assertUrl()
            .assertAddressAlert({ exist: false })
            .selectTypeOfCare(/Primary care/i)
            .clickNextButton();

          VAFacilityPageObject.assertUrl()
            .assertSingleLocation({ locationName: /Facility 983/i })
            .clickNextButton();

          DateTimeRequestPageObject.assertUrl()
            .assertHeading({ name: /When would you like an appointment/i })
            .selectFirstAvailableDate()
            .clickNextButton();

          ReasonForAppointmentPageObject.assertUrl()
            .assertHeading({ name: /What.s the reason for this appointment/i })
            .selectReasonForAppointment()
            .typeAdditionalText({
              label: /Add any details you.d like to share with your provider/,
              content: 'This is a test',
            })
            .clickNextButton();

          TypeOfVisitPageObject.assertUrl()
            .assertHeading({
              name: /How do you want to attend this appointment/i,
            })
            .selectVisitType('In person')
            .clickNextButton();

          ContactInfoPageObject.assertUrl()
            .assertHeading({ name: /How should we contact you/i })
            .typeEmailAddress('veteran@va.gov')
            .typePhoneNumber('5555555555')
            .clickNextButton();

          ReviewPageObject.assertUrl()
            .assertHeading({ name: /Review and submit your request/ })
            .clickRequestButton();

          ConfirmationPageObject.assertUrl({ isDirect: false });

          // Assert
          cy.axeCheckBestPractice();
        });
      });

      describe('And veteran does not have a home address', () => {
        it('should submit form', () => {
          // Arrange
          const mockUser = new MockUser();

          // Act
          cy.login(mockUser);

          AppointmentListPageObject.visit().scheduleAppointment();

          TypeOfCarePageObject.assertUrl()
            .assertAddressAlert({ exist: true })
            .selectTypeOfCare(/Primary care/i)
            .clickNextButton();

          VAFacilityPageObject.assertUrl()
            .assertSingleLocation({ locationName: /Facility 983/i })
            .clickNextButton();

          DateTimeRequestPageObject.assertUrl()
            .assertHeading({ name: /When would you like an appointment/i })
            .selectFirstAvailableDate()
            .clickNextButton();

          ReasonForAppointmentPageObject.assertUrl()
            .assertHeading({ name: /What.s the reason for this appointment/i })
            .selectReasonForAppointment()
            .typeAdditionalText({
              label: /Add any details you.d like to share with your provider/,
              content: 'This is a test',
            })
            .clickNextButton();

          TypeOfVisitPageObject.assertUrl()
            .assertHeading({
              name: /How do you want to attend this appointment/i,
            })
            .selectVisitType(/In person/i)
            .clickNextButton();

          ContactInfoPageObject.assertUrl()
            .assertHeading({ name: /How should we contact you/i })
            .typeEmailAddress('veteran@va.gov')
            .typePhoneNumber('5555555555')
            .clickNextButton();

          ReviewPageObject.assertUrl().clickRequestButton();

          ConfirmationPageObject.assertUrl({ isDirect: false });

          // Assert
          cy.axeCheckBestPractice();
        });
      });
    });

    describe('And more than one facility supports online scheduling', () => {
      beforeEach(() => {
        const mockEligibilityResponse = new MockEligibilityResponse({
          facilityId: '983',
          typeOfCareId,
          isEligible: true,
        });

        mockFacilitiesApi({
          response: MockFacilityResponse.createResponses({
            facilityIds: ['983', '984'],
          }),
        });
        mockEligibilityApi({ response: mockEligibilityResponse });
        mockEligibilityCCApi({ cceType, isEligible: false });
        mockSchedulingConfigurationApi({
          facilityIds: ['983', '984'],
          typeOfCareId,
          isDirect: false,
          isRequest: true,
        });
      });

      describe('And veteran does have a home address', () => {
        it('should submit form', () => {
          // Arrange
          const mockUser = new MockUser({ addressLine1: '123 Main St.' });

          // Act
          cy.login(mockUser);

          AppointmentListPageObject.visit().scheduleAppointment();

          TypeOfCarePageObject.assertUrl()
            .assertAddressAlert({ exist: false })
            .selectTypeOfCare(/Primary care/i)
            .clickNextButton();

          VAFacilityPageObject.assertUrl()
            .selectLocation(/Facility 983/i)
            .clickNextButton();

          DateTimeRequestPageObject.assertUrl()
            .assertHeading({ name: /When would you like an appointment/i })
            .selectFirstAvailableDate()
            .clickNextButton();

          ReasonForAppointmentPageObject.assertUrl()
            .assertHeading({ name: /What.s the reason for this appointment/i })
            .selectReasonForAppointment()
            .typeAdditionalText({
              label: /Add any details you.d like to share with your provider/,
              content: 'This is a test',
            })
            .clickNextButton();

          TypeOfVisitPageObject.assertUrl()
            .assertHeading({
              name: /How do you want to attend this appointment/i,
            })
            .selectVisitType('In person')
            .clickNextButton();

          ContactInfoPageObject.assertUrl()
            .assertHeading({ name: /How should we contact you/i })
            .typeEmailAddress('veteran@va.gov')
            .typePhoneNumber('5555555555')
            .clickNextButton();

          ReviewPageObject.assertUrl()
            .assertHeading({ name: /Review and submit your request/ })
            .clickRequestButton();

          ConfirmationPageObject.assertUrl({ isDirect: false });

          // Assert
          cy.axeCheckBestPractice();
        });
      });

      describe('And veteran does not have a home address', () => {
        it('should submit form', () => {
          // Arrange
          const mockUser = new MockUser();

          // Act
          cy.login(mockUser);

          AppointmentListPageObject.visit().scheduleAppointment();

          TypeOfCarePageObject.assertUrl()
            .assertAddressAlert({ exist: true })
            .selectTypeOfCare(/Primary care/i)
            .clickNextButton();

          VAFacilityPageObject.assertUrl()
            .selectLocation(/Facility 983/i)
            .clickNextButton();

          DateTimeRequestPageObject.assertUrl()
            .assertHeading({ name: /When would you like an appointment/i })
            .selectFirstAvailableDate()
            .clickNextButton();

          ReasonForAppointmentPageObject.assertUrl()
            .assertHeading({ name: /What.s the reason for this appointment/i })
            .selectReasonForAppointment()
            .typeAdditionalText({
              label: /Add any details you.d like to share with your provider/,
              content: 'This is a test',
            })
            .clickNextButton();

          TypeOfVisitPageObject.assertUrl()
            .assertHeading({
              name: /How do you want to attend this appointment/i,
            })
            .selectVisitType(/In person/i)
            .clickNextButton();

          ContactInfoPageObject.assertUrl()
            .assertHeading({ name: /How should we contact you/i })
            .typeEmailAddress('veteran@va.gov')
            .typePhoneNumber('5555555555')
            .clickNextButton();

          ReviewPageObject.assertUrl().clickRequestButton();

          ConfirmationPageObject.assertUrl({ isDirect: false });

          // Assert
          cy.axeCheckBestPractice();
        });
      });
    });
  });

  describe('When veteran is CC eligible', () => {
    beforeEach(() => {
      const mockEligibilityResponse = new MockEligibilityResponse({
        facilityId: '983',
        typeOfCareId,
        isEligible: true,
      });

      mockFacilitiesApi({
        response: MockFacilityResponse.createResponses({
          facilityIds: ['983', '984'],
        }),
      });
      mockEligibilityApi({ response: mockEligibilityResponse });
      mockEligibilityCCApi({ cceType });
      mockSchedulingConfigurationApi({
        facilityIds: ['983', '984'],
        typeOfCareId,
        isDirect: false,
        isRequest: true,
      });
    });

    describe('And no clinics support direct schedule, clinic supports requests', () => {
      it('should submit form', () => {
        // Arrange
        const mockUser = new MockUser({ addressLine1: '123 Main St.' });

        // Act
        cy.login(mockUser);

        AppointmentListPageObject.visit().scheduleAppointment();

        TypeOfCarePageObject.assertUrl()
          .assertAddressAlert({ exist: false })
          .selectTypeOfCare(/Primary care/i)
          .clickNextButton();

        TypeOfFacilityPageObject.assertUrl()
          .selectTypeOfFacility(/VA medical center or clinic/i)
          .clickNextButton();

        VAFacilityPageObject.assertUrl()
          .selectLocation(/Facility 983/i)
          .clickNextButton();

        DateTimeRequestPageObject.assertUrl()
          .assertHeading({ name: /When would you like an appointment/i })
          .selectFirstAvailableDate()
          .clickNextButton();

        ReasonForAppointmentPageObject.assertUrl()
          .assertHeading({ name: /What.s the reason for this appointment/i })
          .selectReasonForAppointment()
          .typeAdditionalText({
            label: /Add any details you.d like to share with your provider/,
            content: 'This is a test',
          })
          .clickNextButton();

        TypeOfVisitPageObject.assertUrl()
          .assertHeading({
            name: /How do you want to attend this appointment/i,
          })
          .selectVisitType('In person')
          .clickNextButton();

        ContactInfoPageObject.assertUrl()
          .assertHeading({ name: /How should we contact you/i })
          .typeEmailAddress('veteran@va.gov')
          .typePhoneNumber('5555555555')
          .clickNextButton();

        ReviewPageObject.assertUrl()
          .assertHeading({ name: /Review and submit your request/ })
          .clickRequestButton();

        ConfirmationPageObject.assertUrl({ isDirect: false });

        // Assert
        cy.axeCheckBestPractice();
      });
    });
  });
});
