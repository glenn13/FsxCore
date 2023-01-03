import * as yup from 'yup';

import React, {useEffect, useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {Formik} from 'formik';
import {RadialItem} from '@app/store/app/types';
import {ReactQueryDevtools} from 'react-query-devtools';
import RoleForm from './Role.Form';
import {RootState} from '@app/store/rootReducer';
import Toast from '@app/components/common/Alert/Toast';
import {roleShape} from '@app/entities/catalog/Role';
import {setStatus} from '@app/store/common/status.reducer';
import {submitRole} from '@app/store/catalog/roles/role.actions';
import {useRadialMenu} from '@app/hooks/useRadialMenu';

export interface IRoleDetailProps {
  id?: number;
  isEdit?: boolean;
  initialValues: any;
}

const RoleDetail: React.FC<IRoleDetailProps> = ({isEdit, ...props}) => {
  const radialMenu = useRadialMenu({rerenderDelayMS: 100});
  const dispatch = useDispatch();
  const {status} = useSelector((state: RootState) => {
    return {
      status: state.status,
    };
  });

  const formikRef = useRef<any>();
  const toastRef = useRef<any>();
  const initialMenu: RadialItem[] = [
    {title: 'save', icon: 'check', onClick: () => formikRef.current?.handleSubmit()},
  ];
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [radialMenuItems, setRadialMenuItems] = React.useState<RadialItem[]>(initialMenu);

  const validationSchema = yup.object().shape(roleShape);

  const handleOnSubmit = (values: any) => {
    dispatch(submitRole(values));
  };

  const handleClose = () => dispatch(setStatus(''));

  useEffect(() => {
    radialMenu.generate(radialMenuItems);
  }, [radialMenu, radialMenuItems]);

  return (
    <Formik
      innerRef={formikRef}
      initialValues={props.initialValues}
      validationSchema={validationSchema}
      onSubmit={handleOnSubmit}>
      {() => (
        <div className="flex flex-col bg-gray-100">
          {status !== '' && (
            <Toast
              title="System Notification"
              ref={toastRef}
              message={status}
              type="info"
              onClose={handleClose}
            />
          )}
          <RoleForm />
          <ReactQueryDevtools initialIsOpen={false} />
        </div>
      )}
    </Formik>
  );
};

export default RoleDetail;
