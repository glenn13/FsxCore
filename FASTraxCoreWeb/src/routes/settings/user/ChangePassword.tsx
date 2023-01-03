import {Form, Formik, FormikProps} from 'formik';
import {ChangePassword} from '@app/entities/catalog';
import {useHistory} from 'react-router-dom';
import {useSelector, shallowEqual} from 'react-redux';
import {RootState} from '@app/store/rootReducer';

import {Loader} from '@app/components/common';
import {RadialItem} from '@app/store/app/types';
import React from 'react';
import {StoreDispatch} from '@app/store/rootReducer';
import {ChangeUserPassword} from '@app/store/catalog/users/user.actions';
import {useDispatch} from 'react-redux';
import {useRadialMenu} from '@app/hooks/useRadialMenu';
import * as Yup from 'yup';

const UserChangePassword = React.lazy(
  () => import('@app/views/settings/users/User.ChangePassword'),
);

export interface ChangePasswordRouteProps {}

interface RouteProps {
  id: string;
}

const ChangePasswordRoute: React.FC<ChangePasswordRouteProps> = () => {
  const history = useHistory();
  const dispatch: StoreDispatch = useDispatch();
  const radialMenu = useRadialMenu({rerenderDelayMS: 100});
  const formikRef = React.useRef<FormikProps<ChangePassword>>(null);
  const user = useSelector((state: RootState) => state.users.current, shallowEqual);
  const initialValues: ChangePassword = {
    userId: (user && user.id) || 0,
    newPassword: '',
    oldPassword: '',
  };

  const handleSubmit = async (userPass: ChangePassword) => {
    dispatch(ChangeUserPassword(userPass))
      .then((response: any) => {
        formikRef.current?.setStatus(true);
        history.push('/app/setting/user');
      })
      .catch(response => {
        formikRef.current?.setErrors(response.data);
      });
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
  }, [radialMenu]);

  const changePasswordShape = Yup.object({
    newPassword: Yup.string().required('Password is required'),
    confirmPassword: Yup.string().oneOf(
      [Yup.ref('newPassword'), undefined],
      'Passwords must match',
    ),
  });

  return (
    <div className="shadow-lg p-4 bg-white widget-box h-full">
      <Formik
        validateOnChange={false}
        validationSchema={changePasswordShape}
        enableReinitialize
        initialValues={initialValues}
        onSubmit={handleSubmit}
        innerRef={formikRef}>
        <Form>
          <React.Suspense fallback={<Loader />}>
            <UserChangePassword />
          </React.Suspense>
        </Form>
      </Formik>
    </div>
  );
};

export default ChangePasswordRoute;
