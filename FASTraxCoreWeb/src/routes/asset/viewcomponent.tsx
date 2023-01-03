import * as yup from 'yup';

import {
  Loader,
} from '@app/components/common';
import {Form, Formik, FormikProps} from 'formik';
import {RootState, StoreDispatch} from '@app/store/rootReducer';
import {
  loadComponentCustomFields,
  loadComponentDepreciationDetails,
  loadComponentDocumentAttachments,
  loadComponentImageAttachments,
  loadComponentRegistrationDetails,
  loadComponentWarrantyDetails,
  loadComponentTransactionHistory,
} from '@app/store/asset/register/component.actions';
import {useDispatch, useSelector} from 'react-redux';
import { useHistory, useRouteMatch } from 'react-router-dom';
import React from 'react';
import _ from 'lodash';

import {AssetCategoryEnum} from '@app/helpers/asset/enum';
import ComponentInformation from '@app/views/asset/register/component/componentinformation';
import {RadialItem} from '@app/store/app/types';
import {componentShape} from '@app/entities/asset/register/component/component.schema';
import {getComponentFullInfo} from '@app/services/asset/register/component.service';
import useDisclosure from '@app/hooks/useDisclosure';
import {useRadialMenu} from '@app/hooks/useRadialMenu';

interface RouteProps {
  id: string;
}

export interface ViewComponentRouteProps {}

const ViewComponentRoute: React.FC<ViewComponentRouteProps> = () => {
  const history = useHistory();
  const route = useRouteMatch<RouteProps>();
  const dispatch: StoreDispatch = useDispatch();
  const id = route.params.id;
  const formikRef = React.useRef<FormikProps<Component>>(null);
  const [component, setComponent] = React.useState<Component>();
  const [componentDepreciationId, setComponentDepreciationId] = React.useState<number>(0);
  const {isOpen, onToggle} = useDisclosure({});
  const usersReducer = useSelector((state: RootState) => state.users);

  React.useEffect(() => {
    getComponentFullInfo(id).then(response => {
      let _component = response.data;
      _component.assetCategoryId = Number(AssetCategoryEnum.Component);
      _component.modifiedByUserId = usersReducer.current?.id || 0;
      setComponent(_component);
      setComponentDepreciationId(_component.componentDepreciation?.id || 0);
    });

    dispatch(loadComponentCustomFields(id));
    dispatch(loadComponentDocumentAttachments(id));
    dispatch(loadComponentImageAttachments(id));
    dispatch(loadComponentRegistrationDetails(id));
    dispatch(loadComponentWarrantyDetails(id));
    dispatch(loadComponentTransactionHistory(id));
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, id]);

  React.useEffect(() => {
    dispatch(loadComponentDepreciationDetails(componentDepreciationId));
  }, [dispatch, componentDepreciationId]);

  const initRadialItems: RadialItem[] = [
    {title: 'Cancel', icon: 'cross', onClick: () => history.goBack()},
    {title: 'Print', icon: 'print'},
    {title: 'Export', icon: 'excel'},
  ];

  const radialMenu = useRadialMenu({rerenderDelayMS: 50});
  const [radialMenuItems, setRadialMenuItems] = React.useState<RadialItem[]>(initRadialItems);

  const handleSubmit = async (component: Component) => { };

  React.useEffect(() => {
    radialMenu.generate(radialMenuItems);
  }, [radialMenu, radialMenuItems]);

  if (!component) return <Loader />;

  return (
    <>
      <Formik
        validationSchema={yup.object().shape(componentShape)}
        validateOnChange={false}
        initialValues={component}
        onSubmit={handleSubmit}
        innerRef={formikRef}>
        <Form>
          <React.Suspense fallback={<Loader />}>
            <ComponentInformation isEdit={false} isReadOnly={true} />
          </React.Suspense>
        </Form>
      </Formik>
    </>
  );
};

export default ViewComponentRoute;
