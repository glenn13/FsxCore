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
  loadGeneralAssetCustomFieldsOnEdit,
  loadGeneralAssetDepreciationDetails,
  loadGeneralAssetDocumentAttachments,
  loadGeneralAssetImageAttachments,
  loadGeneralAssetLinkedAssetsOnEdit,
  loadGeneralAssetRegistrationDetails,
  loadGeneralAssetWarrantyDetails,
  loadGeneralAssetTransactionHistory,
  submitGeneralAsset,
  submitGeneralAssetGridDetails,
} from '@app/store/asset/register/generalasset.actions';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory, useRouteMatch} from 'react-router-dom';

import {AssetCategoryEnum} from '@app/helpers/asset/enum';
import {Button} from '@progress/kendo-react-buttons';
import GeneralAssetInformation from '@app/views/asset/register/generalasset/generalassetinformation';
import {RadialItem} from '@app/store/app/types';
import React from 'react';
import _ from 'lodash';
import {generalAssetShape} from '@app/entities/asset/register/generalasset/generalasset.schema';
import {generateNegativeNumber} from '@app/helpers/randoms';
import {getGeneralAssetFullInfo} from '@app/services/asset/register/generalasset.service';
import {setGeneralAssetCustomField} from '@app/store/asset/register/generalassetcustomfield.reducers';
import {setGeneralAssetDepreciationDetail} from '@app/store/asset/register/generalassetdepreciationdetail.reducers';
import {setGeneralAssetDocumentAttachment} from '@app/store/asset/register/generalassetdocumentattachment.reducers';
import {setGeneralAssetImageAttachment} from '@app/store/asset/register/generalassetimageattachment.reducers';
import {setGeneralAssetLinkedAsset} from '@app/store/asset/register/generalassetlinkedasset.reducers';
import {setGeneralAssetRegistrationDetail} from '@app/store/asset/register/generalassetregistrationdetail.reducers';
import {setGeneralAssetWarrantyDetail} from '@app/store/asset/register/generalassetwarrantydetail.reducers';
import useDisclosure from '@app/hooks/useDisclosure';
import {useRadialMenu} from '@app/hooks/useRadialMenu';
import { CheckSerialNoIfExistOnEditAsync } from '@app/services/asset/register/register.service';

interface RouteProps {
  id: string;
}

export interface EditGeneralAssetRouteProps {}

const EditGeneralAssetRoute: React.FC<EditGeneralAssetRouteProps> = () => {
  const history = useHistory();
  const route = useRouteMatch<RouteProps>();
  const dispatch: StoreDispatch = useDispatch();
  const id = route.params.id;
  const formikRef = React.useRef<FormikProps<GeneralAsset>>(null);
  const [generalAsset, setGeneralAsset] = React.useState<GeneralAsset>();
  const [generalAssetDepreciationId, setGeneralAssetDepreciationId] = React.useState<number>(0);
  const [tempIds, setTempIds] = React.useState<number[]>([]);
  const usersReducer = useSelector((state: RootState) => state.users);
  const {isOpen, onToggle} = useDisclosure({});

  const [oldSerialNo, setOldSerialNo] = React.useState<string>("");
  const [oldSerialNoValid, setOldSerialNoValid] = React.useState<boolean>(false);

  React.useEffect(() => {
    getGeneralAssetFullInfo(id).then(response => {
      let _generalAsset = response.data;
      _generalAsset.assetCategoryId = Number(AssetCategoryEnum.GeneralAsset);
      _generalAsset.modifiedByUserId = usersReducer.current?.id || 0;
      setGeneralAsset(_generalAsset);
      setGeneralAssetDepreciationId(_generalAsset.generalAssetDepreciation?.id || 0);
    });

   
  
    /**
     * a. Unlike in new mode for general asset, no need to interchange the property "id" into "customFieldId" since this will be manage
     * by our API. It is also important to retain the value "id" field here since this will be our key for CRUD functionality in EF Core.
     *
     * **/
    dispatch(loadGeneralAssetCustomFieldsOnEdit(id))
      .then(data => {
        const _mapResult = _.map(data, item => {
          let _tempId = generateNegativeNumber({flat: tempIds});
          let _item: GeneralAssetCustomField = {
            tempId: _tempId,
            id: item.id,
            customFieldId: item.customFieldId,
            generalAssetId: item.generalAssetId,
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
        dispatch(setGeneralAssetCustomField(_mapResult));
      })
      .catch(e => {
        console.log(e);
      });

    dispatch(loadGeneralAssetDocumentAttachments(id));
    dispatch(loadGeneralAssetImageAttachments(id));

    setTempIds([]);
    dispatch(loadGeneralAssetLinkedAssetsOnEdit(id))
      .then(data => {
        const _mapResult = _.map(data, item => {
          let _tempId = generateNegativeNumber({flat: tempIds});
          let _item: GeneralAssetLinkedAsset = {
            tempId: _tempId,
            id: item.id,
            generalAssetId: item.generalAssetId,
            linkedGeneralAssetId: item.linkedGeneralAssetId,
            assetRefId: item.assetRefId,
            serialNo: item.serialNo,
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
        dispatch(setGeneralAssetLinkedAsset(_mapResult));
      })
      .catch(e => {
        console.log(e);
      });

    dispatch(loadGeneralAssetRegistrationDetails(id));
    dispatch(loadGeneralAssetWarrantyDetails(id));
    dispatch(loadGeneralAssetTransactionHistory(id));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, id]);

  const serialNoSchema = yup.string().required("Serial No. is required")
    .test('serialNo', 'Serial No. already exist', async function(value) {
  
      let _isValid: boolean = oldSerialNoValid;
  
      if(value !== undefined) {
        if(oldSerialNo.toLocaleLowerCase() !== value?.toLocaleLowerCase()) {
          await CheckSerialNoIfExistOnEditAsync(AssetCategoryEnum.GeneralAsset, generalAsset?.id || 0, value || '').then(async response => {
            _isValid = !response;
          });
          setOldSerialNo(value || '');
          setOldSerialNoValid(_isValid);
        }
      }
  
      return _isValid;
  })

  React.useEffect(() => {
    dispatch(loadGeneralAssetDepreciationDetails(generalAssetDepreciationId));
  }, [dispatch, generalAssetDepreciationId]);

  const initRadialItems: RadialItem[] = [
    {title: 'Save', icon: 'check', onClick: () => formikRef.current?.submitForm()},
    {title: 'Save & Print', icon: 'save-print'},
    {title: 'Cancel', icon: 'cross', onClick: () => history.goBack()},
    {title: 'Print', icon: 'print'},
    {title: 'Export', icon: 'excel'},
  ];

  const radialMenu = useRadialMenu({rerenderDelayMS: 50});
  const [radialMenuItems, setRadialMenuItems] = React.useState<RadialItem[]>(initRadialItems);

  const handleSubmit = async (generalAsset: GeneralAsset) => {
    dispatch(submitGeneralAsset(generalAsset))
      .then(response => {
        dispatch(submitGeneralAssetGridDetails(Number(id)));
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
    dispatch(setGeneralAssetDepreciationDetail([]));
    dispatch(setGeneralAssetWarrantyDetail([]));
    dispatch(setGeneralAssetRegistrationDetail([]));
    dispatch(setGeneralAssetImageAttachment([]));
    dispatch(setGeneralAssetDocumentAttachment([]));
  }, [dispatch]);

  if (!generalAsset) return <Loader />;

  return (
    <>
      <Formik
        validationSchema={yup.object({...generalAssetShape, serialNo: serialNoSchema})}
        validateOnChange={false}
        initialValues={generalAsset}
        onSubmit={handleSubmit}
        innerRef={formikRef}>
        <Form>
          <React.Suspense fallback={<Loader />}>
            <GeneralAssetInformation isEdit={true} isReadOnly={false} />
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

export default EditGeneralAssetRoute;
