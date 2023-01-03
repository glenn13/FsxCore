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
  generalAssetShape,
  newGeneralAsset,
} from '@app/entities/asset/register/generalasset/generalasset.schema';
import {
  loadGeneralAssetCustomFieldsDefault,
  submitGeneralAsset,
  submitGeneralAssetGridDetails,
} from '@app/store/asset/register/generalasset.actions';
import {useDispatch, useSelector} from 'react-redux';

import {Button} from '@progress/kendo-react-buttons';
import GeneralAssetInformation from '@app/views/asset/register/generalasset/generalassetinformation';
import {RadialItem} from '@app/store/app/types';
import React from 'react';
import _, { String } from 'lodash';
import {generateNegativeNumber} from '@app/helpers/randoms';
import {getDefaultAssetStatus} from '@app/services/asset/standardentries/assetStatus.service';
import {setGeneralAssetCustomField} from '@app/store/asset/register/generalassetcustomfield.reducers';
import {setGeneralAssetDepreciationDetail} from '@app/store/asset/register/generalassetdepreciationdetail.reducers';
import {setGeneralAssetDocumentAttachment} from '@app/store/asset/register/generalassetdocumentattachment.reducers';
import {setGeneralAssetImageAttachment} from '@app/store/asset/register/generalassetimageattachment.reducers';
import {setGeneralAssetLinkedAsset} from '@app/store/asset/register/generalassetlinkedasset.reducers';
import {setGeneralAssetRegistrationDetail} from '@app/store/asset/register/generalassetregistrationdetail.reducers';
import {setGeneralAssetWarrantyDetail} from '@app/store/asset/register/generalassetwarrantydetail.reducers';
import useDisclosure from '@app/hooks/useDisclosure';
import {useHistory} from 'react-router-dom';
import {useRadialMenu} from '@app/hooks/useRadialMenu';
import { CheckSerialNoIfExistOnNewAsync } from '@app/services/asset/register/register.service';

export interface NewGeneralAssetRouteProps {}


const NewGeneralAssetRoute: React.FC<NewGeneralAssetRouteProps> = () => {
  const history = useHistory();
  const dispatch: StoreDispatch = useDispatch();
  const formikRef = React.useRef<FormikProps<GeneralAsset>>(null);

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

  const [oldSerialNo, setOldSerialNo] = React.useState<string>("");
  const [oldSerialNoValid, setOldSerialNoValid] = React.useState<boolean>(false);

  const serialNoSchema = yup.string().required("Serial No. is required")
  .test('serialNo', 'Serial No. already exist', async function(value) {

    let _isValid: boolean = oldSerialNoValid;

    if(value !== undefined) {
      if(oldSerialNo.toLocaleLowerCase() !== value?.toLocaleLowerCase()) {
        await CheckSerialNoIfExistOnNewAsync(value || '').then(async response => {
          _isValid = !response;
        });
        setOldSerialNo(value || '');
        setOldSerialNoValid(_isValid);
      }
    }

    return _isValid;
  })

  let _generalAsset: GeneralAsset = newGeneralAsset();
  _generalAsset.createdByUserId = usersReducer.current?.id || 0;

  getDefaultAssetStatus().then(async response => {
    formikRef.current?.setFieldValue('assetStatusId', response.data.id);
  });

  const handleSubmit = async (generalAsset: GeneralAsset) => {
    dispatch(submitGeneralAsset(generalAsset))
      .then(response => {
        let _generalAssetId: number;
        _generalAssetId = Number(response.data);
        if (_generalAssetId > 0) {
          dispatch(submitGeneralAssetGridDetails(_generalAssetId));
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
   * Fetching the default custom fields for general asset, the "Id" is coming from dbo.CustomField and
   * we need to change it assign it to our GeneralAssetCustomField.customFieldId since our "Id" field here is our detail "Id" int asset.GeneralAssetCustomField.
   *
   * b. Need to generate tempIds' negative values since this will be our key on adding, editing and deleting in UI.
   *
   * **/
  React.useEffect(() => {
    dispatch(loadGeneralAssetCustomFieldsDefault())
      .then(data => {
        const _mapResult = _.map(data, item => {
          let _tempId = generateNegativeNumber({flat: tempIds});
          let _item: GeneralAssetCustomField = {
            tempId: _tempId,
            id: 0,
            customFieldId: item.id,
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  /*
   * Added this when a page is being un-mount, all models will be initialize.
   * This is the fix when a user edit a certain record and suddenly click the main menu and load the initial grid view,
   * upon creating new transaction, previous data still mount in the reducer.
   */
  React.useEffect(() => {
    dispatch(setGeneralAssetDepreciationDetail([]));
    dispatch(setGeneralAssetLinkedAsset([]));
    dispatch(setGeneralAssetWarrantyDetail([]));
    dispatch(setGeneralAssetRegistrationDetail([]));
    dispatch(setGeneralAssetImageAttachment([]));
    dispatch(setGeneralAssetDocumentAttachment([]));
  }, [dispatch]);

  return (
    <>
      <Formik
        validationSchema={yup.object({...generalAssetShape, serialNo: serialNoSchema})}
        validateOnChange={false}
        initialValues={_generalAsset}
        onSubmit={handleSubmit}
        innerRef={formikRef}>
        <Form>
          <React.Suspense fallback={<Loader />}>
            <GeneralAssetInformation isEdit={false} isReadOnly={false} />
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

export default NewGeneralAssetRoute;
