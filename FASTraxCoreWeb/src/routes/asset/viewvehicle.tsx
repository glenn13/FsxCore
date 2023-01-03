import * as yup from 'yup';

import {
  Loader,
} from '@app/components/common';
import {Form, Formik, FormikProps} from 'formik';
import {RootState, StoreDispatch} from '@app/store/rootReducer';
import {
  loadVehicleArmourDetails,
  loadVehicleCustomFields,
  loadVehicleDepreciationDetails,
  loadVehicleDocumentAttachments,
  loadVehicleEngineHistory,
  loadVehicleFuelMonitoring,
  loadVehicleImageAttachments,
  loadVehicleLinkedAssets,
  loadVehicleOdometerHistory,
  loadVehicleRegistrationDetails,
  loadVehicleWarrantyDetails,
  loadVehicleTransactionHistory,
} from '@app/store/asset/register/vehicle.actions';
import {useDispatch, useSelector} from 'react-redux';
import { useHistory, useRouteMatch } from 'react-router-dom';
import React from 'react';
import _ from 'lodash';

import {AssetCategoryEnum} from '@app/helpers/asset/enum';
import {RadialItem} from '@app/store/app/types';
import VehicleInformation from '@app/views/asset/register/vehicle/vehicleinformation';
import {getVehicleFullInfo} from '@app/services/asset/register/vehicle.service';
import useDisclosure from '@app/hooks/useDisclosure';
import {useRadialMenu} from '@app/hooks/useRadialMenu';
import {vehicleShape} from '@app/entities/asset/register/vehicle/vehicle.schema';

interface RouteProps {
  id: string;
}

export interface ViewVehicleRouteProps {}

const ViewVehicleRoute: React.FC<ViewVehicleRouteProps> = () => {
  const history = useHistory();
  const route = useRouteMatch<RouteProps>();
  const dispatch: StoreDispatch = useDispatch();
  const id = route.params.id;
  const formikRef = React.useRef<FormikProps<Vehicle>>(null);
  const [vehicle, setVehicle] = React.useState<Vehicle>();
  const [vehicleDepreciationId, setVehicleDepreciationId] = React.useState<number>(0);
  const usersReducer = useSelector((state: RootState) => state.users);

  const {isOpen, onToggle} = useDisclosure({});

  React.useEffect(() => {
    getVehicleFullInfo(id).then(response => {
      let _vehicle = response.data;
      _vehicle.assetCategoryId = Number(AssetCategoryEnum.Vehicle);
      _vehicle.modifiedByUserId = usersReducer.current?.id || 0;
      setVehicle(_vehicle);
      setVehicleDepreciationId(_vehicle.vehicleDepreciation?.id || 0);
    });

    dispatch(loadVehicleCustomFields(id));
    dispatch(loadVehicleArmourDetails(id));
    dispatch(loadVehicleDocumentAttachments(id));
    dispatch(loadVehicleEngineHistory(id));
    dispatch(loadVehicleFuelMonitoring(id));
    dispatch(loadVehicleImageAttachments(id));
    dispatch(loadVehicleOdometerHistory(id));
    dispatch(loadVehicleRegistrationDetails(id));
    dispatch(loadVehicleWarrantyDetails(id));
    dispatch(loadVehicleLinkedAssets(id));
    dispatch(loadVehicleTransactionHistory(id));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, id]);

  React.useEffect(() => {
    dispatch(loadVehicleDepreciationDetails(vehicleDepreciationId));
  }, [dispatch, vehicleDepreciationId]);

  const initRadialItems: RadialItem[] = [
    {title: 'Cancel', icon: 'cross', onClick: () => history.goBack()},
    {title: 'Print', icon: 'print'},
    {title: 'Export', icon: 'excel'},
  ];

  const radialMenu = useRadialMenu({rerenderDelayMS: 50});
  const [radialMenuItems, setRadialMenuItems] = React.useState<RadialItem[]>(initRadialItems);

  const handleSubmit = async (vehicle: Vehicle) => { };

  React.useEffect(() => {
    radialMenu.generate(radialMenuItems);
  }, [radialMenu, radialMenuItems]);

  if (!vehicle) return <Loader />;

  return (
    <>
      <Formik
        validationSchema={yup.object().shape(vehicleShape)}
        validateOnChange={false}
        initialValues={vehicle}
        onSubmit={handleSubmit}
        innerRef={formikRef}>
        <Form>
          <React.Suspense fallback={<Loader />}>
            <VehicleInformation isEdit={false} isReadOnly={true} />
          </React.Suspense>
        </Form>
      </Formik>
    </>
  );
};

export default ViewVehicleRoute;
