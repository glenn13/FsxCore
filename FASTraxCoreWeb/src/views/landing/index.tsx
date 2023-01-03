import React from 'react';
import {flowRight as compose} from 'lodash';
import {connect, ConnectedProps} from 'react-redux';
import {withRouter, RouteComponentProps} from 'react-router-dom';

import Layout from '../../components/layout';
import authService from '../../services/auth.service';
import {RootState, StoreDispatch} from '../../store/rootReducer';
import {Banner, Content} from '../../components/common';
import {updateCurrentProject} from '../../store/catalog/projects/actions';

const mapState = (state: RootState) => ({
  users: state.users,
  projects: state.projects,
});

const mapDispatch = (dispatch: StoreDispatch) => ({
  init: (id: number) => dispatch(updateCurrentProject(id)),
});

const connector = connect(mapState, mapDispatch);

type ReduxProps = ConnectedProps<typeof connector>;

interface ILandingProps extends RouteComponentProps<any>, ReduxProps {}

export const Landing: React.FC<ILandingProps> = ({projects, init}) => {
  React.useEffect(() => {
    if (!projects.current && authService.currentProject.value.id)
      init(authService.currentProject.value.id);
  }, [init, projects]);

  return (
    <Layout>
      <Banner title="My Panel" subTitle="Shows the statistical data" />
      <Content>
        <div>dfdf</div>
      </Content>
    </Layout>
  );
};

export default compose(withRouter, connector)(Landing);
