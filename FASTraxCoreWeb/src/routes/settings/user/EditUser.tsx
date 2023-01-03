import {Form, Formik, FormikProps} from 'formik';
import {IUserFormData, User, userShape} from '@app/entities/catalog';
import {useHistory, useRouteMatch} from 'react-router-dom';

import {Loader} from '@app/components/common';
import {RadialItem} from '@app/store/app/types';
import React from 'react';
import {StoreDispatch} from '@app/store/rootReducer';
import UserForm from '@app/views/settings/users/User.Form';
import {addOrUpdateUser} from '@app/store/catalog/users/user.actions';
import {loadUser} from '@app/store/catalog/users/user.actions';
import {useDispatch} from 'react-redux';
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

export interface EditUserRouteProps {}

interface RouteProps {
  id: string;
}

const EditUserRoute: React.FC<EditUserRouteProps> = () => {
  const history = useHistory();
  const dispatch: StoreDispatch = useDispatch();
  const radialMenu = useRadialMenu({rerenderDelayMS: 100});
  const [user, setUser] = React.useState<User>();
  const formikRef = React.useRef<FormikProps<IUserFormData>>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const route = useRouteMatch<RouteProps>();
  const id = route.params.id;

  const handleSubmit = async (user: IUserFormData) => {
    setIsLoading(true);
    dispatch(addOrUpdateUser(user))
      .then((response: any) => {
        formikRef.current?.setStatus(true);
        history.push('/app/setting/user/management');
      })
      .catch(response => {
        formikRef.current?.setErrors(response.data);
      })
      .finally(() => setIsLoading(false));
  };

  React.useEffect(() => {
    dispatch(loadUser(id)).then(user => setUser(user));
  }, [dispatch, id]);

  const handleCancel = React.useCallback(() => {
    if (formikRef.current && formikRef.current.dirty) {
      const willProceed = window.confirm('All information will be reverted. Press OK to proceed');

      if (!willProceed) return;
    }

    formikRef.current?.resetForm();
    history.push('/app/setting/user/management');
    /* eslint-disable react-hooks/exhaustive-deps */
  }, [formikRef]);

  const isSuperAdmin = user && user.userAdmin && user.userAdmin.superAdmin;
  const customerIdSchema = !isSuperAdmin
    ? yup
        .number()
        .positive()
        .nullable(true)
        .required('Customer is required')
        .min(1, 'Customer is required')
    : yup.number().positive().nullable(true);

  React.useEffect(() => {
    const radialItems: RadialItem[] = [
      {onClick: () => formikRef.current?.submitForm(), icon: 'check', title: 'Save'},
      {onClick: handleCancel, icon: 'cross', title: 'Cancel'},
    ];

    radialMenu.generate(radialItems);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [radialMenu]);

  if (!user) return <Loader />;

  return (
    <>
      {isLoading && (
        <LoaderWrapper>
          <Loader />
        </LoaderWrapper>
      )}
      <Formik
        validationSchema={yup.object({...userShape, customerId: customerIdSchema})}
        validateOnChange={false}
        initialValues={user}
        onSubmit={handleSubmit}
        innerRef={formikRef}>
        <Form>
          <React.Suspense fallback={<Loader />}>
            <UserInformation id={id}>
              <UserForm />
            </UserInformation>
          </React.Suspense>
        </Form>
      </Formik>
    </>
  );
};

export default React.memo(EditUserRoute);
