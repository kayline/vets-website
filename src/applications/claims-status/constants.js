import environment from '@department-of-veterans-affairs/platform-utilities/environment';

export const ITEMS_PER_PAGE = 10;

// Date Formats
export const DATE_FORMATS = {
  LONG_DATE: 'MMMM d, yyyy',
};

export const CST_BREADCRUMB_BASE = [
  { href: '/', label: 'VA.gov home' },
  {
    href: '/your-claims',
    label: 'Check your claims and appeals',
    isRouterLink: true,
  },
];

// This should make it a bit easier to turn mocks on and off manually
const SHOULD_USE_MOCKS = true;
// NOTE: This should only be TRUE when developing locally
const CAN_USE_MOCKS = !window.Cypress && environment.isLocalhost();

export const canUseMocks = () => SHOULD_USE_MOCKS && CAN_USE_MOCKS;

// This is used in useDataDogRum
export const isProductionEnv = () => {
  return (
    !environment.BASE_URL.includes('localhost') &&
    !window.DD_RUM?.getInitConfiguration() &&
    !window.Mocha
  );
};

// These are claim types codes for disability compensation claims. Claim type codes listed here
// are used in isDisabilityCompensationClaim() to show the 8 claim phase steps instead of 5.
export const disabilityCompensationClaimTypeCodes = [
  '010INITMORE8',
  '010LCMPPIDES',
  '010LCOMP',
  '010LCOMPBDD',
  '010LCOMPD2D',
  '010LCOMPIDES',
  '010NADIDES8',
  '020BDDNO',
  '020CLMINC',
  '020EPDSUPP',
  '020IDESRRNAD',
  '020NADIDESNO',
  '020NEW',
  '020NEWIDES',
  '020NEWPMC',
  '020NHPNH10',
  '020NI',
  '020PNI',
  '020PREDSUPP',
  '020RRNADIDES',
  '020RSCDTH',
  '020RSCDTHPMC',
  '020SD2D',
  '020SMB',
  '020SUPP',
  '110INITLESS8',
  '110LCMP7IDES',
  '110LCOMP7',
  '110LCOMP7BDD',
  '110LCOMPD2D',
  '110LCOMPIDES',
  '110NADIDES7',
];
