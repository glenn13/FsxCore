import {Form, Formik, FormikProps} from 'formik';
import {IUserFormData, userShape} from '@app/entities/catalog';

import {Loader} from '@app/components/common';
import {RadialItem} from '@app/store/app/types';
import React from 'react';
import {StoreDispatch} from '@app/store/rootReducer';
import UserForm from '@app/views/settings/users/User.Form';
import {addOrUpdateUser} from '@app/store/catalog/users/user.actions';
import {initialUser} from '@app/store/catalog/users/user.reducers';
import {setProjectSiteByUser} from '@app/store/catalog/projectsites/projectsites.reducer';
import {useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';
import {useRadialMenu} from '@app/hooks/useRadialMenu';
import * as yup from 'yup';
import styled from 'styled-components';

const LoaderWrapper = styled.div`
  position: fixed;
  z-index: 100;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background: #ffffff57;
`;

const UserInformation = React.lazy(() => import('@app/views/settings/users/User.Information'));

export interface NewUserRouteProps {}

const NewUserRoute: React.FC<NewUserRouteProps> = () => {
  const history = useHistory();
  const dispatch: StoreDispatch = useDispatch();
  const radialMenu = useRadialMenu({rerenderDelayMS: 100});
  const [user] = React.useState(() => initialUser);
  const formikRef = React.useRef<FormikProps<IUserFormData>>(null);
  const [isLoading, setIsLoading] = React.useState(false);

  const isSuperAdmin = user && user.userAdmin && user.userAdmin.superAdmin;
  const customerIdSchema = !isSuperAdmin
    ? yup
        .number()
        .positive()
        .nullable(true)
        .required('Customer is required')
        .min(1, 'Customer is required')
    : yup.number().positive().nullable(true);

  const handleSubmit = async (user: IUserFormData) => {
    setIsLoading(true);
    dispatch(addOrUpdateUser(user))
      .then(() => {
        formikRef.current?.setStatus(true);
        history.push('/app/setting/user/management');
      })
      .catch(response => {
        formikRef.current?.setErrors(response.data);
      })
      .finally(() => setIsLoading(false));
  };

  const handleCancel = React.useCallback(() => {
    if (formikRef.current && formikRef.current.dirty) {
      const willProceed = window.confirm('All information will be reverted. Press OK to proceed');

      if (!willProceed) return;
    }

    formikRef.current?.resetForm();
    history.push('/app/setting/user');
    /* eslint-disable react-hooks/exhaustive-deps */
  }, [formikRef]);

  React.useEffect(() => {
    const radialItems: RadialItem[] = [
      {onClick: () => formikRef.current?.submitForm(), icon: 'check', title: 'Save'},
      {onClick: handleCancel, icon: 'cross', title: 'Cancel'},
    ];

    radialMenu.generate(radialItems);

    //clear
    dispatch(setProjectSiteByUser([]));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [radialMenu]);

  return (
    <>
      {isLoading && (
        <LoaderWrapper>
          <Loader />
        </LoaderWrapper>
      )}
      <Formik
        validateOnChange={false}
        validationSchema={yup.object({...userShape, customerId: customerIdSchema})}
        initialValues={user}
        onSubmit={handleSubmit}
        innerRef={formikRef}>
        <Form>
          <React.Suspense fallback={<Loader />}>
            <UserInformation>
              <UserForm />
            </UserInformation>
          </React.Suspense>
        </Form>
      </Formik>
    </>
  );
};

export default NewUserRoute;
