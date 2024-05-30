import React from 'react';
import { expect } from 'chai';
import {
  createTestStore,
  renderWithStoreAndRouter,
} from '../../tests/mocks/setup';
import CCRequestLayout from '../layout/CCRequestLayout';

describe('VAOS Component: VARequestLayout', () => {
  const initialState = {
    appointments: {
      facilityData: {
        '983': {
          address: {
            line: ['2360 East Pershing Boulevard'],
            city: 'Cheyenne',
            state: 'WY',
            postalCode: '82001-5356',
          },
          name: 'Cheyenne VA Medical Center',
          telecom: [
            {
              system: 'phone',
              value: '307-778-7550',
            },
          ],
        },
      },
    },
    featureToggles: {
      vaOnlineSchedulingAfterVisitSummary: true,
      vaOnlineSchedulingAppointmentDetailsRedesign: true,
    },
  };

  describe('When viewing upcomming CC appointment details', () => {
    it('should display CC request layout', async () => {
      // Arrange
      const store = createTestStore(initialState);
      const appointment = {
        comment: 'This is a test:Additional information',
        contact: {
          telecom: [
            {
              system: 'email',
              value: 'user@va.gov',
            },
            {
              system: 'phone',
              value: '1234567890',
            },
          ],
        },
        location: {
          stationId: '983',
          clinicName: 'Clinic 1',
          clinicPhysicalLocation: 'CHEYENNE',
        },
        videoData: {},
        vaos: {
          isCommunityCare: true,
          isCompAndPenAppointment: false,
          isCOVIDVaccine: false,
          isPendingAppointment: true,
          isUpcomingAppointment: false,
          apiData: {
            serviceType: 'primaryCare',
          },
        },
        status: 'proposed',
      };

      // Act
      const screen = renderWithStoreAndRouter(
        <CCRequestLayout data={appointment} />,
        {
          store,
        },
      );

      // Assert
      expect(
        screen.getByRole('heading', {
          level: 1,
          name: /Request for community care appointment/i,
        }),
      );

      expect(
        screen.getByText(
          /We.ll try to schedule your appointment in the next 2 business days/i,
        ),
      );
      expect(
        screen.container.querySelector(
          'va-link[text="Review your appointments"]',
        ),
      ).to.be.null;
      expect(
        screen.container.querySelector(
          'va-link[text="Schedule a new appointment"]',
        ),
      ).to.be.null;

      expect(
        screen.getByRole('heading', {
          level: 2,
          name: /Preferred date and time/i,
        }),
      );

      expect(screen.getByRole('heading', { level: 2, name: /Type of care/i }));
      expect(screen.getByText(/Primary care/i));

      expect(
        screen.getByRole('heading', { level: 2, name: /Scheduling facility/i }),
      );
      expect(
        screen.getByRole('heading', {
          level: 2,
          name: /Preferred community care provider/i,
        }),
      );
      expect(
        screen.getByRole('heading', {
          level: 2,
          name: /Language you.d prefer the provider speak/i,
        }),
      );

      expect(screen.container.querySelector('va-icon[icon="directions"]')).not
        .to.exist;

      expect(
        screen.getByRole('heading', {
          level: 2,
          name: /Details you.d like to share with your provider/i,
        }),
      );
      expect(screen.getByText(/Reason:/i));
      expect(screen.getByText(/This is a test/i));
      expect(screen.getByText(/Other details:/i));
      expect(screen.getByText(/Additional information/i));

      expect(
        screen.getByRole('heading', {
          level: 2,
          name: /Your contact details/i,
        }),
      );
      expect(
        screen.getByText((content, element) => {
          return (
            element.tagName.toLowerCase() === 'span' &&
            content === 'Email: user@va.gov'
          );
        }),
      );
      expect(screen.getByText(/Phone number/));
      expect(
        screen.container.querySelector('va-telephone[contact="1234567890"]'),
      ).to.be.ok;

      expect(screen.container.querySelector('va-button[text="Print"]')).to.be
        .ok;
      expect(screen.container.querySelector('va-button[text="Cancel request"]'))
        .to.be.ok;
    });
  });

  describe('When scheduling an CC appointment request', () => {
    it('should display CC request layout', async () => {
      // Arrange
      const store = createTestStore(initialState);
      const appointment = {
        comment: 'This is a test:Additional information',
        contact: {
          telecom: [
            {
              system: 'email',
              value: 'user@va.gov',
            },
            {
              system: 'phone',
              value: '1234567890',
            },
          ],
        },
        location: {
          stationId: '983',
          clinicName: 'Clinic 1',
          clinicPhysicalLocation: 'CHEYENNE',
        },
        videoData: {},
        vaos: {
          isCommunityCare: true,
          isCompAndPenAppointment: false,
          isCOVIDVaccine: false,
          isPendingAppointment: true,
          isUpcomingAppointment: false,
          apiData: {
            serviceType: 'primaryCare',
          },
        },
        status: 'proposed',
      };

      // Act
      const screen = renderWithStoreAndRouter(
        <CCRequestLayout data={appointment} />,
        {
          store,
          path: '/?confirmMsg=true',
        },
      );

      // Assert
      expect(
        screen.getByRole('heading', {
          level: 1,
          name: /We have received your request/i,
        }),
      );

      expect(
        screen.getByText(
          /We.ll try to schedule your appointment in the next 2 business days/i,
        ),
      );
      expect(
        screen.container.querySelector(
          'va-link[text="Review your appointments"]',
        ),
      ).to.be.ok;
      expect(
        screen.container.querySelector(
          'va-link[text="Schedule a new appointment"]',
        ),
      ).to.be.ok;

      expect(
        screen.getByRole('heading', {
          level: 2,
          name: /Preferred date and time/i,
        }),
      );

      expect(screen.getByRole('heading', { level: 2, name: /Type of care/i }));
      expect(screen.getByText(/Primary care/i));

      expect(
        screen.getByRole('heading', { level: 2, name: /Scheduling facility/i }),
      );
      expect(
        screen.getByRole('heading', {
          level: 2,
          name: /Preferred community care provider/i,
        }),
      );
      expect(
        screen.getByRole('heading', {
          level: 2,
          name: /Language you.d prefer the provider speak/i,
        }),
      );

      expect(screen.container.querySelector('va-icon[icon="directions"]')).not
        .to.exist;

      expect(
        screen.getByRole('heading', {
          level: 2,
          name: /Details you.d like to share with your provider/i,
        }),
      );
      expect(screen.getByText(/Reason:/i));
      expect(screen.getByText(/This is a test/i));
      expect(screen.getByText(/Other details:/i));
      expect(screen.getByText(/Additional information/i));

      expect(
        screen.getByRole('heading', {
          level: 2,
          name: /Your contact details/i,
        }),
      );
      expect(
        screen.getByText((content, element) => {
          return (
            element.tagName.toLowerCase() === 'span' &&
            content === 'Email: user@va.gov'
          );
        }),
      );
      expect(screen.getByText(/Phone number/));
      expect(
        screen.container.querySelector('va-telephone[contact="1234567890"]'),
      ).to.be.ok;

      expect(screen.container.querySelector('va-button[text="Print"]')).to.be
        .ok;
      expect(screen.container.querySelector('va-button[text="Cancel request"]'))
        .to.be.ok;
    });
  });
});
