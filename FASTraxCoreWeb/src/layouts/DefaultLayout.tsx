import React from 'react';
import {RouteComponentProps, Switch, Route} from 'react-router-dom';
import LoginRoute from '../routes/login';

interface DefaultLayoutProps extends RouteComponentProps<any> {}

const DefaultLayout: React.FunctionComponent<DefaultLayoutProps> = () => {
  return (
    <>
      <Switch>
        <Route path="/" exact component={LoginRoute} />
      </Switch>
    </>
  );
};

export default DefaultLayout;
