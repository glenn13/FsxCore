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
  componentShape,
  newComponent,
} from '@app/entities/asset/register/component/component.schema';
import {
  loadComponentCustomFieldsDefault,
  submitComponent,
  submitComponentGridDetails,
} from '@app/store/asset/register/component.actions';
import {useDispatch, useSelector} from 'react-redux';

import {Button} from '@progress/kendo-react-buttons';
import ComponentInformation from '@app/views/asset/register/component/componentinformation';
import {RadialItem} from '@app/store/app/types';
import React from 'react';
import _ from 'lodash';
import {generateNegativeNumber} from '@app/helpers/randoms';
import {getDefaultAssetStatus} from '@app/services/asset/standardentries/assetStatus.service';
import {setComponentCustomField} from '@app/store/asset/register/componentCustomField.reducers';
import {setComponentDepreciationDetail} from '@app/store/asset/register/componentDepreciationDetail.reducers';
import {setComponentDocumentAttachment} from '@app/store/asset/register/componentDocumentAttachment.reducers';
import {setComponentImageAttachment} from '@app/store/asset/register/componentImageAttachment.reducers';
import {setComponentRegistrationDetail} from '@app/store/asset/register/componentRegistrationDetail.reducers';
import {setComponentWarrantyDetail} from '@app/store/asset/register/componentWarrantyDetail.reducers';
import useDisclosure from '@app/hooks/useDisclosure';
import {useHistory} from 'react-router-dom';
import {useRadialMenu} from '@app/hooks/useRadialMenu';
import { CheckSerialNoIfExistOnNewAsync } from '@app/services/asset/register/register.service';

export interface NewComponentRouteProps {}

const NewComponentRoute: React.FC<NewComponentRouteProps> = () => {
  const history = useHistory();
  const dispatch: StoreDispatch = useDispatch();
  const formikRef = React.useRef<FormikProps<Component>>(null);

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

  let _component: Component = newComponent();
  _component.createdByUserId = usersReducer.current?.id || 0;

  getDefaultAssetStatus().then(async response => {
    formikRef.current?.setFieldValue('assetStatusId', response.data.id);
  });

  const handleSubmit = async (component: Component) => {
    dispatch(submitComponent(component))
      .then(response => {
        let _componentId: number;
        _componentId = Number(response.data);
        if (_componentId > 0) {
          dispatch(submitComponentGridDetails(_componentId));
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
   * Fetching the default custom fields for component, the "Id" is coming from dbo.CustomField and
   * we need to change it assign it to our ComponentCustomField.customFieldId since our "Id" field here is our detail "Id" int asset.ComponentCustomField.
   *
   * b. Need to generate tempIds' negative values since this will be our key on adding, editing and deleting in UI.
   *
   * **/
  React.useEffect(() => {
    dispatch(loadComponentCustomFieldsDefault())
      .then(data => {
        const _mapResult = _.map(data, item => {
          let _tempId = generateNegativeNumber({flat: tempIds});
          let _item: ComponentCustomField = {
            tempId: _tempId,
            id: 0,
            customFieldId: item.id,
            componentId: item.componentId,
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
        dispatch(setComponentCustomField(_mapResult));
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
    dispatch(setComponentDepreciationDetail([]));
    dispatch(setComponentWarrantyDetail([]));
    dispatch(setComponentRegistrationDetail([]));
    dispatch(setComponentImageAttachment([]));
    dispatch(setComponentDocumentAttachment([]));
  }, [dispatch]);

  return (
    <>
      <Formik
        validationSchema={yup.object({...componentShape, serialNo: serialNoSchema})}
        validateOnChange={false}
        initialValues={_component}
        onSubmit={handleSubmit}
        innerRef={formikRef}>
        <Form>
          <React.Suspense fallback={<Loader />}>
            <ComponentInformation isEdit={false} isReadOnly={false} />
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

export default NewComponentRoute;
