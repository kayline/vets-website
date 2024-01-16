import mockUser from '../fixtures/user.json';

class MedicalRecordsSite {
  login = (isMRUser = true) => {
    if (isMRUser) {
      cy.login();
      window.localStorage.setItem('isLoggedIn', true);
      cy.intercept('GET', '/v0/user', mockUser).as('mockUser');
      cy.intercept('GET', '/v0/feature_toggles?*', {
        data: {
          type: 'feature_toggles',
          features: [
            {
              name: 'mhvMedicalRecordsPhrRefreshOnLogin',
              value: false,
            },
            {
              name: 'mhv_medical_records_phr_refresh_on_login',
              value: false,
            },
            {
              name: 'mhvMedicalRecordsToVAGovRelease',
              value: true,
            },
            {
              name: 'mhv_medical_records_to_va_gov_release',
              value: true,
            },
            {
              name: 'mhvMedicalRecordsDisplayDomains',
              value: true,
            },
            {
              name: 'mhv_medical_records_display_domains',
              value: true,
            },
            {
              name: 'mhv_medical_records_allow_txt_downloads',
              value: true,
            },
            {
              name: 'mhv_medical_records_display_vaccines',
              value: true,
            },
          ],
        },
      }).as('featureToggle');
    }
  };

  verifyDownloadedPdfFile = (_prefixString, _clickMoment, _searchText) => {
    if (Cypress.browser.isHeadless) {
      cy.log('browser is headless');
      const downloadsFolder = Cypress.config('downloadsFolder');
      const txtPath1 = `${downloadsFolder}/${_prefixString}-${_clickMoment
        .add(1, 'seconds')
        .format('M-D-YYYY_hhmmssa')}.pdf`;
      const txtPath2 = `${downloadsFolder}/${_prefixString}-${_clickMoment
        .add(1, 'seconds')
        .format('M-D-YYYY_hhmmssa')}.pdf`;
      const txtPath3 = `${downloadsFolder}/${_prefixString}-${_clickMoment
        .add(1, 'seconds')
        .format('M-D-YYYY_hhmmssa')}.pdf`;
      this.internalReadFileMaybe(txtPath1, _searchText);
      this.internalReadFileMaybe(txtPath2, _searchText);
      this.internalReadFileMaybe(txtPath3, _searchText);
    } else {
      cy.log('browser is not headless');
    }
  };

  internalReadFileMaybe = (fileName, searchText) => {
    cy.task('log', `attempting to find file = ${fileName}`);
    cy.task('readFileMaybe', fileName).then(textOrNull => {
      const taskFileName = fileName;
      if (textOrNull != null) {
        cy.task('log', `found the text in ${taskFileName}`);
        cy.readFile(fileName).should('contain', `${searchText}`);
      } else {
        cy.task('log', `found the file ${taskFileName} but did not find text`);
      }
    });
  };
}
export default MedicalRecordsSite;
