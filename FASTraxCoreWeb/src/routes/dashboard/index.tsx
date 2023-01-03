import React from 'react';
import {Content, Banner} from '../../components/common';
import UnderConstruction from '../../components/layout/UnderConstruction';
import {makeStyles} from '@material-ui/styles';
import Layout from '../../components/layout';
import Dashboard from '../../views/dashboard';

export interface DashboardRouteProps {}
// const Button = withAuth(ButtonComp);

export interface KGridProps {
  result: any;
  dataState: any;
}

const useStyles = makeStyles({
  root: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
});

const DashboardRoute: React.FC<DashboardRouteProps> = () => {
  return (
    <div>
      <Dashboard />
    </div>
  );
};

export default DashboardRoute;
