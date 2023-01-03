import React from 'react';
import Layout from '../../components/layout';
import {Content} from '../../components/common';

export const UnAuthorized: React.FC<{}> = () => {
  return (
    <Layout isDefault={false}>
      <Content>
        <div>Unauthorized</div>
      </Content>
    </Layout>
  );
};

export default UnAuthorized;
