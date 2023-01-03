import * as yup from 'yup';

import {
  ConfirmDialog,
  ConfirmDialogBody,
  ConfirmDialogFooter,
  Loader,
} from '@app/components/common';
import {Form, Formik, FormikProps} from 'formik';
import {RootState, StoreDispatch} from '@app/store/rootReducer';
import {
  loadVehicleCustomFieldsDefault,
  submitVehicle,
  submitVehicleGridDetails,
} from '@app/store/asset/register/vehicle.actions';
import {newVehicle, vehicleShape} from '@app/entities/asset/register/vehicle/vehicle.schema';
import {useDispatch, useSelector} from 'react-redux';

import {Button} from '@progress/kendo-react-buttons';
import {RadialItem} from '@app/store/app/types';
import React from 'react';
import VehicleInformation from '@app/views/asset/register/vehicle/vehicleinformation';
import _ from 'lodash';
import {generateNegativeNumber} from '@app/helpers/randoms';
import {getDefaultAssetStatus} from '@app/services/asset/standardentries/assetStatus.service';
import {setVehicleArmourDetail} from '@app/store/asset/register/vehiclearmourdetail.reducers';
import {setVehicleCustomField} from '@app/store/asset/register/vehiclecustomfield.reducers';
import {setVehicleDepreciationDetail} from '@app/store/asset/register/vehicledepreciationdetail.reducers';
import {setVehicleDocumentAttachment} from '@app/store/asset/register/vehicledocumentattachment.reducers';
import {setVehicleEngineHistory} from '@app/store/asset/register/vehicleenginehistory.reducers';
import {setVehicleFuelMonitoring} from '@app/store/asset/register/vehiclefuelmonitoring.reducers';
import {setVehicleImageAttachment} from '@app/store/asset/register/vehicleimageattachment.reducers';
import {setVehicleLinkedAsset} from '@app/store/asset/register/vehiclelinkedasset.reducers';
import {setVehicleOdometerHistory} from '@app/store/asset/register/vehicleodometerhistory.reducers';
import {setVehicleRegistrationDetail} from '@app/store/asset/register/vehicleregistrationdetail.reducers';
import {setVehicleWarrantyDetail} from '@app/store/asset/register/vehiclewarrantydetail.reducers';
import useDisclosure from '@app/hooks/useDisclosure';
import {useHistory} from 'react-router-dom';
import {useRadialMenu} from '@app/hooks/useRadialMenu';
import { CheckVinIfExistOnNewAsync } from '@app/services/asset/register/register.service';

export interface NewVehicleRouteProps {}

const NewVehicleRoute: React.FC<NewVehicleRouteProps> = () => {
  const history = useHistory();
  const dispatch: StoreDispatch = useDispatch();
  const formikRef = React.useRef<FormikProps<Vehicle>>(null);

  const usersReducer = useSelector((state: RootState) => state.users);

  const {isOpen, onToggle} = useDisclosure({});

  const initRadialItems: RadialItem[] = [
    {title: 'Save', icon: 'check', onClick: () => formikRef.current?.submitForm()},
    {title: 'Save & Print', icon: 'save-print'},
    {title: 'Cancel', icon: 'cross', onClick: () => history.goBack()},
  ];

  const radialMenu = useRadialMenu({rerenderDelayMS: 50});

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [radialMenuItems, setRadialMenuItems] = React.useState<RadialItem[]>(initRadialItems);

  const [tempIds, setTempIds] = React.useState<number[]>([]);
  const [oldVIN, setOldVIN] = React.useState<string>("");
  const [oldVINValid, setOldVINValid] = React.useState<boolean>(false);

  const vinSchema = yup.string().required("VIN / Serial No. is required")
  .test('vin', 'VIN / Serial No. already exist', async function(value) {

    let _isValid: boolean = oldVINValid;

    if(value !== undefined) {
      if(oldVIN.toLocaleLowerCase() !== value?.toLocaleLowerCase()) {
        await CheckVinIfExistOnNewAsync(value || '').then(async response => {
          _isValid = !response;
        });
        setOldVIN(value || '');
        setOldVINValid(_isValid);
      }
    }

    
    return _isValid;
  })

  let _vehicle: Vehicle = newVehicle();
  _vehicle.createdByUserId = usersReducer.current?.id || 0;

  getDefaultAssetStatus().then(async response => {
    formikRef.current?.setFieldValue('assetStatusId', response.data.id);
  });

  const handleSubmit = async (vehicle: Vehicle) => {
    dispatch(submitVehicle(vehicle))
      .then(response => {
        let _vehicleId: number;
        _vehicleId = Number(response.data);
        if (_vehicleId > 0) {
          dispatch(submitVehicleGridDetails(_vehicleId));
          onToggle();
        }
      })
      .catch(e => {
        console.log(e);
        alert('Error occur while saving primary information.');
      });
  };

  React.useEffect(() => {
    radialMenu.generate(radialMenuItems);
  }, [radialMenu, radialMenuItems]);

  /**
   * a. Use this approach since we cannot rely on "id" property for custom field.
   * Fetching the default custom fields for vehicle, the "Id" is coming from dbo.CustomField and
   * we need to change it assign it to our VehicleCustomField.customFieldId since our "Id" field here is our detail "Id" int asset.VehicleCustomField.
   *
   * b. Need to generate tempIds' negative values since this will be our key on adding, editing and deleting in UI.
   *
   * **/
  React.useEffect(() => {
    dispatch(loadVehicleCustomFieldsDefault())
      .then(data => {
        const _mapResult = _.map(data, item => {
          let _tempId = generateNegativeNumber({flat: tempIds});
          let _item: VehicleCustomField = {
            tempId: _tempId,
            id: 0,
            customFieldId: item.id,
            vehicleId: item.vehicleId,
            name: item.name,
            label: item.label,
            accessModuleId: item.accessModuleId,
            customFieldTypeId: item.customFieldTypeId,
            fieldValue: item.fieldValue,
          };

          tempIds.push(_tempId);
          // eslint-disable-next-line react-hooks/exhaustive-deps
          setTempIds(tempIds);

          return _item;
        });
        dispatch(setVehicleCustomField(_mapResult));
      })
      .catch(e => {
        console.log(e);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  /*
   * Added this when a page is being un-mount, all models will be initialize.
   * This is the fix when a user edit a certain record and suddenly click the main menu and load the initial grid view,
   * upon creating new transaction, previous data still mount in the reducer.
   */
  React.useEffect(() => {
    dispatch(setVehicleArmourDetail([]));
    dispatch(setVehicleDepreciationDetail([]));
    dispatch(setVehicleDocumentAttachment([]));
    dispatch(setVehicleEngineHistory([]));
    dispatch(setVehicleFuelMonitoring([]));
    dispatch(setVehicleImageAttachment([]));
    dispatch(setVehicleLinkedAsset([]));
    dispatch(setVehicleOdometerHistory([]));
    dispatch(setVehicleRegistrationDetail([]));
    dispatch(setVehicleWarrantyDetail([]));
  }, [dispatch]);

  return (
    <>
      <Formik
        validationSchema={yup.object({...vehicleShape, vin: vinSchema})}
        validateOnChange={false}
        initialValues={_vehicle}
        onSubmit={handleSubmit}
        innerRef={formikRef}>
        <Form>
          <React.Suspense fallback={<Loader />}>
            <VehicleInformation isEdit={false} isReadOnly={false} />
          </React.Suspense>
        </Form>
      </Formik>
      <ConfirmDialog isOpen={isOpen} type="success" title="Action Complete">
        <ConfirmDialogBody>
          <p>Transaction successfully saved.</p>
        </ConfirmDialogBody>
        <ConfirmDialogFooter>
          <Button
            onClick={() => {
              history.push('/app/asset/register');
            }}
            primary>
            Done
          </Button>
        </ConfirmDialogFooter>
      </ConfirmDialog>
    </>
  );
};

export default NewVehicleRoute;
