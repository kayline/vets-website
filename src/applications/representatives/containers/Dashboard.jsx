import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router';

import LoginViewWrapper from './LoginViewWrapper';

const Dashboard = ({ POApermissions = true }) => {
  const breadcrumbs = [
    { link: '/', label: 'Home' },
    { link: '/dashboard', label: 'Dashboard' },
  ];

  return (
    <LoginViewWrapper breadcrumbs={breadcrumbs} POApermissions={POApermissions}>
      <h1>Accredited Representative Portal</h1>
      <Link
        to="/poa-requests"
        className="vads-c-action-link--green vads-u-margin-bottom--2"
      >
        Manage power of attorney requests
      </Link>
      <div className="placeholder-container">
        <div className="notif vads-u-background-color--gray-lightest vads-u-margin-bottom--2" />
        <div className="primary vads-u-background-color--gray-lightest vads-u-margin-bottom--2" />
        <div className="etc vads-u-background-color--gray-lightest" />
      </div>
    </LoginViewWrapper>
  );
};

Dashboard.propTypes = {
  POApermissions: PropTypes.bool,
};

export default Dashboard;
