import React from 'react';
import {Form, Formik, FormikProps} from 'formik';
import {getQuery, getQueryData} from '@app/helpers/reactQuery';
import projectsService from '@app/services/catalog/projects.service';
import {Button, FsxDrawer, FsxDropdown} from '@app/components/common';
import { ASSET_GROUPS_KEY, useAssetGroups } from '@app/services/asset/standardentries/assetGroup.service';
import {FsxFormikDropDownList, FsxFormikInput} from '@app/components/common/FsxFormik';
import {
  GENERAL_ASSET_GROUP_KEY,
  GENERAL_ASSET_NAME_KEY,
  postGeneralAssetGroup,
  useGeneralAssetGroups,
  useGeneralAssetNames,
} from '@app/services/asset/assets.service';
import {
  newGeneralAssetGroupForm,
  GeneralAssetGroupForm,
} from '@app/entities/asset/inventory/GeneralAssetGroup';

export interface GeneralAssetGroupInputProps {
  assetGroupId: number;
  generalAssetNameId: number;
}

const GeneralAssetGroupInput: React.FC<GeneralAssetGroupInputProps> = ({
  assetGroupId,
  generalAssetNameId,
}) => {
  const [isOpen, setIsOpen] = React.useState(() => false);
  const formikRef = React.useRef<FormikProps<GeneralAssetGroupForm>>(null);
  const assetGroups = getQueryData<typeof useAssetGroups>(ASSET_GROUPS_KEY);
  const generalAssetNames = getQueryData<typeof useGeneralAssetNames>(GENERAL_ASSET_NAME_KEY);
  const generalAssetGroups = getQueryData<typeof useGeneralAssetGroups>(GENERAL_ASSET_GROUP_KEY);

  const filteredOptions = React.useMemo(
    () => generalAssetGroups?.data?.filter(gag => gag.generalAssetNameId === generalAssetNameId),
    [generalAssetGroups, generalAssetNameId],
  );

  const handleSubmitAssetGroup = (request: GeneralAssetGroupForm) => {
    const project = projectsService.Session.currentProject.get();

    if (!project) return;

    request.code = `${project.code}-${generalAssetNameId}-${request.title}`;
    request.generalAssetNameId = generalAssetNameId;

    postGeneralAssetGroup(request).then(response => {
      const query = getQuery<typeof useGeneralAssetGroups>(GENERAL_ASSET_GROUP_KEY);
      query?.fetchMore().then(() => {
        console.log('fetch more successful');
        formikRef.current?.setFieldValue('generalAssetGroupId', response.data.id);
      });
      setIsOpen(false);
    });
  };

  return (
    <div className="flex flex-row flex-1">
      <FsxDrawer
        unMountChildren
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        className="flex-col px-4 pt-10"
        title="New General Asset Group">
        <Formik
          initialValues={newGeneralAssetGroupForm()}
          onSubmit={handleSubmitAssetGroup}
          innerRef={formikRef}>
          <Form className="flex flex-1 flex-col w-full items-center justify-between pb-4">
            <div className="w-full h-full">
              <FsxDropdown
                value={assetGroupId}
                data={assetGroups?.data}
                label="Asset Group:"
                dataItemKey="id"
                textField="title"
                disabled
              />
              <FsxDropdown
                value={generalAssetNameId}
                data={generalAssetNames?.data}
                label="General Asset Name:"
                dataItemKey="id"
                textField="title"
                disabled
              />
              <FsxFormikInput label="Asset Group No:" name="title" />
              <FsxFormikInput label="Description" name="description" />
            </div>
            <Button block oval shadow ripple>
              Submit
            </Button>
          </Form>
        </Formik>
      </FsxDrawer>
      <FsxFormikDropDownList
        label="General Asset Group:"
        name="generalAssetGroupId"
        className="w-full"
        data={filteredOptions}
        dataItemKey="id"
        textField="title"
        required
      />
      <button
        className="flex justify-center items-center border border-gray-200 mb-3 mt-2 ml-2 px-4 text-2xl rounded-lg bg-transparent hover:bg-gray-200 hover:shadow"
        onClick={() => setIsOpen(true)}
        type="button">
        +
      </button>
    </div>
  );
};

export default GeneralAssetGroupInput;
