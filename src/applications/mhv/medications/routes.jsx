import React from 'react';
import { Switch, Route } from 'react-router-dom';
import App from './containers/App';
import PrescriptionDetails from './containers/PrescriptionDetails';
import RxBreadcrumbs from './containers/RxBreadcrumbs';

const routes = (
  <div className="vads-l-grid-container main-content">
    <RxBreadcrumbs />
    <div className="main-content">
      <Switch>
        <Route exact path="/prescriptions/" key="App">
          <App />
        </Route>
        <Route
          exact
          path="/prescriptions/:prescriptionId"
          key="prescriptionDetails"
        >
          <PrescriptionDetails />
        </Route>
      </Switch>
    </div>
  </div>
);

export default routes;
