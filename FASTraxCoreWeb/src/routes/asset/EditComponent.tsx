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
  loadComponentCustomFieldsOnEdit,
  loadComponentDepreciationDetails,
  loadComponentDocumentAttachments,
  loadComponentImageAttachments,
  loadComponentRegistrationDetails,
  loadComponentWarrantyDetails,
  loadComponentTransactionHistory,
  submitComponent,
  submitComponentGridDetails,
} from '@app/store/asset/register/component.actions';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory, useRouteMatch} from 'react-router-dom';

import {AssetCategoryEnum} from '@app/helpers/asset/enum';
import {Button} from '@progress/kendo-react-buttons';
import ComponentInformation from '@app/views/asset/register/component/componentinformation';
import {RadialItem} from '@app/store/app/types';
import React from 'react';
import _ from 'lodash';
import {componentShape} from '@app/entities/asset/register/component/component.schema';
import {generateNegativeNumber} from '@app/helpers/randoms';
import {getComponentFullInfo} from '@app/services/asset/register/component.service';
import {setComponentCustomField} from '@app/store/asset/register/componentCustomField.reducers';
import {setComponentDepreciationDetail} from '@app/store/asset/register/componentDepreciationDetail.reducers';
import {setComponentDocumentAttachment} from '@app/store/asset/register/componentDocumentAttachment.reducers';
import {setComponentImageAttachment} from '@app/store/asset/register/componentImageAttachment.reducers';
import {setComponentRegistrationDetail} from '@app/store/asset/register/componentRegistrationDetail.reducers';
import {setComponentWarrantyDetail} from '@app/store/asset/register/componentWarrantyDetail.reducers';
import useDisclosure from '@app/hooks/useDisclosure';
import {useRadialMenu} from '@app/hooks/useRadialMenu';
import { CheckSerialNoIfExistOnEditAsync } from '@app/services/asset/register/register.service';

interface RouteProps {
  id: string;
}

export interface EditComponentRouteProps {}

const EditComponentRoute: React.FC<EditComponentRouteProps> = () => {
  const history = useHistory();
  const route = useRouteMatch<RouteProps>();
  const dispatch: StoreDispatch = useDispatch();
  const id = route.params.id;
  const formikRef = React.useRef<FormikProps<Component>>(null);
  const [component, setComponent] = React.useState<Component>();
  const [componentDepreciationId, setComponentDepreciationId] = React.useState<number>(0);
  const {isOpen, onToggle} = useDisclosure({});
  const [tempIds, setTempIds] = React.useState<number[]>([]);
  const usersReducer = useSelector((state: RootState) => state.users);

  const [oldSerialNo, setOldSerialNo] = React.useState<string>("");
  const [oldSerialNoValid, setOldSerialNoValid] = React.useState<boolean>(false);

  React.useEffect(() => {
    getComponentFullInfo(id).then(response => {
      let _component = response.data;
      _component.assetCategoryId = Number(AssetCategoryEnum.Component);
      _component.modifiedByUserId = usersReducer.current?.id || 0;
      setComponent(_component);
      setComponentDepreciationId(_component.componentDepreciation?.id || 0);
    });

    /**
     * a. Unlike in new mode for component, no need to interchange the property "id" into "customFieldId" since this will be manage
     * by our API. It is also important to retain the value "id" field here since this will be our key for CRUD functionality in EF Core.
     *
     * **/
    dispatch(loadComponentCustomFieldsOnEdit(id))
      .then(data => {
        const _mapResult = _.map(data, item => {
          let _tempId = generateNegativeNumber({flat: tempIds});
          let _item: ComponentCustomField = {
            tempId: _tempId,
            id: item.id,
            customFieldId: item.customFieldId,
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

    dispatch(loadComponentDocumentAttachments(id));
    dispatch(loadComponentImageAttachments(id));

    setTempIds([]);

    dispatch(loadComponentRegistrationDetails(id));
    dispatch(loadComponentWarrantyDetails(id));
    dispatch(loadComponentTransactionHistory(id));
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, id]);

  const serialNoSchema = yup.string().required("Serial No. is required")
    .test('serialNo', 'Serial No. already exist', async function(value) {
  
      let _isValid: boolean = oldSerialNoValid;
  
      if(value !== undefined) {
        if(oldSerialNo.toLocaleLowerCase() !== value?.toLocaleLowerCase()) {
          await CheckSerialNoIfExistOnEditAsync(AssetCategoryEnum.Component, component?.id || 0, value || '').then(async response => {
            _isValid = !response;
          });
          setOldSerialNo(value || '');
          setOldSerialNoValid(_isValid);
        }
      }
  
      return _isValid;
  })

  React.useEffect(() => {
    dispatch(loadComponentDepreciationDetails(componentDepreciationId));
  }, [dispatch, componentDepreciationId]);

  const initRadialItems: RadialItem[] = [
    {title: 'Save', icon: 'check', onClick: () => formikRef.current?.submitForm()},
    {title: 'Save & Print', icon: 'save-print'},
    {title: 'Cancel', icon: 'cross', onClick: () => history.goBack()},
    {title: 'Print', icon: 'print'},
    {title: 'Export', icon: 'excel'},
  ];

  const radialMenu = useRadialMenu({rerenderDelayMS: 50});
  const [radialMenuItems, setRadialMenuItems] = React.useState<RadialItem[]>(initRadialItems);

  const handleSubmit = async (component: Component) => {
    dispatch(submitComponent(component))
      .then(response => {
        dispatch(submitComponentGridDetails(Number(id)));
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
    dispatch(setComponentDepreciationDetail([]));
    dispatch(setComponentWarrantyDetail([]));
    dispatch(setComponentRegistrationDetail([]));
    dispatch(setComponentImageAttachment([]));
    dispatch(setComponentDocumentAttachment([]));
  }, [dispatch]);

  if (!component) return <Loader />;

  return (
    <>
      <Formik
        validationSchema={yup.object({...componentShape, serialNo: serialNoSchema})}
        validateOnChange={false}
        initialValues={component}
        onSubmit={handleSubmit}
        innerRef={formikRef}>
        <Form>
          <React.Suspense fallback={<Loader />}>
            <ComponentInformation isEdit={true} isReadOnly={false} />
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

export default EditComponentRoute;
