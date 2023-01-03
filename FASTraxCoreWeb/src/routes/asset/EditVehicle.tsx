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
  loadVehicleArmourDetails,
  loadVehicleCustomFieldsOnEdit,
  loadVehicleDepreciationDetails,
  loadVehicleDocumentAttachments,
  loadVehicleEngineHistory,
  loadVehicleFuelMonitoring,
  loadVehicleImageAttachments,
  loadVehicleLinkedAssetsOnEdit,
  loadVehicleOdometerHistory,
  loadVehicleRegistrationDetails,
  loadVehicleWarrantyDetails,
  loadVehicleTransactionHistory,
  submitVehicle,
  submitVehicleGridDetails,
} from '@app/store/asset/register/vehicle.actions';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory, useRouteMatch} from 'react-router-dom';

import {AssetCategoryEnum} from '@app/helpers/asset/enum';
import {Button} from '@progress/kendo-react-buttons';
import {RadialItem} from '@app/store/app/types';
import React from 'react';
import VehicleInformation from '@app/views/asset/register/vehicle/vehicleinformation';
import _ from 'lodash';
import {generateNegativeNumber} from '@app/helpers/randoms';
import {getVehicleFullInfo} from '@app/services/asset/register/vehicle.service';
import {setVehicleCustomField} from '@app/store/asset/register/vehiclecustomfield.reducers';
import {setVehicleDepreciationDetail} from '@app/store/asset/register/vehicledepreciationdetail.reducers';
import {setVehicleDocumentAttachment} from '@app/store/asset/register/vehicledocumentattachment.reducers';
import {setVehicleImageAttachment} from '@app/store/asset/register/vehicleimageattachment.reducers';
import {setVehicleLinkedAsset} from '@app/store/asset/register/vehiclelinkedasset.reducers';
import {setVehicleRegistrationDetail} from '@app/store/asset/register/vehicleregistrationdetail.reducers';
import {setVehicleWarrantyDetail} from '@app/store/asset/register/vehiclewarrantydetail.reducers';
import useDisclosure from '@app/hooks/useDisclosure';
import {useRadialMenu} from '@app/hooks/useRadialMenu';
import {vehicleShape} from '@app/entities/asset/register/vehicle/vehicle.schema';
import { CheckVinIfExistOnEditAsync } from '@app/services/asset/register/register.service';

interface RouteProps {
  id: string;
}

export interface EditVehicleRouteProps {}

const EditVehicleRoute: React.FC<EditVehicleRouteProps> = () => {
  const history = useHistory();
  const route = useRouteMatch<RouteProps>();
  const dispatch: StoreDispatch = useDispatch();
  const id = route.params.id;
  const formikRef = React.useRef<FormikProps<Vehicle>>(null);
  const [vehicle, setVehicle] = React.useState<Vehicle>();
  const [vehicleDepreciationId, setVehicleDepreciationId] = React.useState<number>(0);
  const [tempIds, setTempIds] = React.useState<number[]>([]);
  const usersReducer = useSelector((state: RootState) => state.users);

  const {isOpen, onToggle} = useDisclosure({});
  const [oldVIN, setOldVIN] = React.useState<string>("");
  const [oldVINValid, setOldVINValid] = React.useState<boolean>(false);

  React.useEffect(() => {
    getVehicleFullInfo(id).then(response => {
      let _vehicle = response.data;
      _vehicle.assetCategoryId = Number(AssetCategoryEnum.Vehicle);
      _vehicle.modifiedByUserId = usersReducer.current?.id || 0;
      setVehicle(_vehicle);
      setVehicleDepreciationId(_vehicle.vehicleDepreciation?.id || 0);
    });

    

    /**
     * a. Unlike in new mode for vehicle, no need to interchange the property "id" into "customFieldId" since this will be manage
     * by our API. It is also important to retain the value "id" field here since this will be our key for CRUD functionality in EF Core.
     *
     * **/
    dispatch(loadVehicleCustomFieldsOnEdit(id))
      .then(data => {
        const _mapResult = _.map(data, item => {
          let _tempId = generateNegativeNumber({flat: tempIds});
          let _item: VehicleCustomField = {
            tempId: _tempId,
            id: item.id,
            customFieldId: item.customFieldId,
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

    dispatch(loadVehicleArmourDetails(id));
    dispatch(loadVehicleCustomFieldsOnEdit(id));
    dispatch(loadVehicleDocumentAttachments(id));
    dispatch(loadVehicleEngineHistory(id));
    dispatch(loadVehicleFuelMonitoring(id));
    dispatch(loadVehicleImageAttachments(id));
    dispatch(loadVehicleOdometerHistory(id));
    dispatch(loadVehicleRegistrationDetails(id));
    dispatch(loadVehicleWarrantyDetails(id));
    dispatch(loadVehicleTransactionHistory(id));

    setTempIds([]);
    dispatch(loadVehicleLinkedAssetsOnEdit(id))
      .then(data => {
        const _mapResult = _.map(data, item => {
          let _tempId = generateNegativeNumber({flat: tempIds});
          let _item: VehicleLinkedAsset = {
            tempId: _tempId,
            id: item.id,
            vehicleId: item.vehicleId,
            assetCategoryId: item.assetCategoryId,
            linkedGeneralAssetId: item.linkedGeneralAssetId,
            linkedVehicleId: item.linkedVehicleId,
            location: item.location,
            assetRefId: item.assetRefId,
            vinSerialNo: item.vinSerialNo,
            maintenanceStatus: item.maintenanceStatus,
            hireStatus: item.hireStatus,
            processedBy: item.processedBy,
            dateLinked: item.dateLinked,
          };

          tempIds.push(_tempId);
          // eslint-disable-next-line react-hooks/exhaustive-deps
          setTempIds(tempIds);

          return _item;
        });
        dispatch(setVehicleLinkedAsset(_mapResult));
      })
      .catch(e => {
        console.log(e);
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, id]);

  const vinSchema = yup.string().required("VIN / Serial No. is required")
    .test('vin', 'VIN / Serial No. already exist', async function(value) {

      let _isValid: boolean = oldVINValid;

      if(value !== undefined) {
        if(oldVIN.toLocaleLowerCase() !== value?.toLocaleLowerCase()) {
          await CheckVinIfExistOnEditAsync(AssetCategoryEnum.Vehicle, vehicle?.id || 0, value || '').then(async response => {
            _isValid = !response;
          });
          setOldVIN(value || '');
          setOldVINValid(_isValid);
        }
      }

    return _isValid;
  })

  React.useEffect(() => {
    dispatch(loadVehicleDepreciationDetails(vehicleDepreciationId));
  }, [dispatch, vehicleDepreciationId]);

  const initRadialItems: RadialItem[] = [
    {title: 'Save', icon: 'check', onClick: () => formikRef.current?.submitForm()},
    {title: 'Save & Print', icon: 'save-print'},
    {title: 'Cancel', icon: 'cross', onClick: () => history.goBack()},
    {title: 'Print', icon: 'print'},
    {title: 'Export', icon: 'excel'},
  ];

  const radialMenu = useRadialMenu({rerenderDelayMS: 50});
  const [radialMenuItems, setRadialMenuItems] = React.useState<RadialItem[]>(initRadialItems);

  const handleSubmit = async (vehicle: Vehicle) => {
    dispatch(submitVehicle(vehicle))
      .then(response => {
        dispatch(submitVehicleGridDetails(Number(id)));
        onToggle();
      })
      .catch(e => {
        console.log(e);
        alert('Error occur while saving primary information.');
      });
  };

  React.useEffect(() => {
    radialMenu.generate(radialMenuItems);
  }, [radialMenu, radialMenuItems]);

  /*
   * Added this when a page is being un-mount, all models will be initialize.
   * This is the fix when a user edit a certain record and suddenly click the main menu and load the initial grid view,
   * upon creating new transaction, previous data still mount in the reducer.
   */
  React.useEffect(() => {
    dispatch(setVehicleDepreciationDetail([]));
    dispatch(setVehicleWarrantyDetail([]));
    dispatch(setVehicleRegistrationDetail([]));
    dispatch(setVehicleImageAttachment([]));
    dispatch(setVehicleDocumentAttachment([]));
  }, [dispatch]);

  if (!vehicle) return <Loader />;

  return (
    <>
      <Formik
        validationSchema={yup.object({...vehicleShape, vin: vinSchema})}
        validateOnChange={false}
        initialValues={vehicle}
        onSubmit={handleSubmit}
        innerRef={formikRef}>
        <Form>
          <React.Suspense fallback={<Loader />}>
            <VehicleInformation isEdit={true} isReadOnly={false} />
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
              history.goBack();
            }}
            primary>
            Done
          </Button>
        </ConfirmDialogFooter>
      </ConfirmDialog>
    </>
  );
};

export default EditVehicleRoute;
