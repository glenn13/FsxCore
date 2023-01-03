import '@progress/kendo-theme-default/dist/all.css';
import './assets/css/main-tailwind.css';
import './assets/scss/style.scss';
import './assets/fonts/style.css';
import 'node-waves/src/scss/waves.scss';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import config from '@app/config/default';
import AppLayout from './layouts/AppLayout';
import AdminLayout from './layouts/AdminLayout';
import DefaultLayout from './layouts/DefaultLayout';
import PrivateRoute from './auth/PrivateRoute';
import React from 'react';
import {hot} from 'react-hot-loader/root';
import {useAppStore} from './providers/app.store';
import PrivacyCookiePolicy from '@app/views/account/GDPR/PrivacyAndCookiePolicy';
import TermsAndCondition from '@app/views/account/GDPR/TermsAndCondition';
import AccountVerification from '@app/views/account/AccountVerification';
import {encryptMe} from '@app/utils/encryption.util';
import {RequestHeader} from './entities/RequestHeader';
import {UUID} from '@app/utils/uuid.util';

const browserInfo = require('browser-info');
const publicIp = require('public-ip');

function App() {
  const {authenticated} = useAppStore();
  React.useEffect(() => {
    const requestHeaders = localStorage.getItem('X-HEADERS');

    if(requestHeaders != null) return;

    const {name, fullVersion} = browserInfo();
    const tZoneInfo = Intl.DateTimeFormat().resolvedOptions().timeZone;

    publicIp.v4().then((ipAddress: any) => {
      const requestHeaders: RequestHeader = {
        sessionId: UUID(),
        browser: `${name} ${fullVersion}`,
        clientTimezone: tZoneInfo,
        ipAddress,
      };

      localStorage.setItem('X-HEADERS', encryptMe(requestHeaders));
    });
  }, []);

  return (
    <Router>
      <Switch>
        <PrivateRoute
          path="/app"
          component={AppLayout}
          isAuth={authenticated}
          notAuthRedirectTo="/"
        />
        <PrivateRoute
          path="/admin"
          component={AdminLayout}
          isAuth={authenticated}
          notAuthRedirectTo="/"
        />
        <PrivateRoute
          path="/"
          exact
          component={DefaultLayout}
          isAuth={!authenticated}
          notAuthRedirectTo="/app"
        />
        <Route path="/privacy-and-cookie-policy" component={PrivacyCookiePolicy} />
        <Route path="/terms-and-condition" component={TermsAndCondition} />
        <Route path="/account-verification" component={AccountVerification} />
      </Switch>
    </Router>
  );
}

export default hot(App);
