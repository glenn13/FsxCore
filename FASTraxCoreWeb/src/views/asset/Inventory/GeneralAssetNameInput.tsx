import React from 'react';
import {Form, Formik, FormikProps} from 'formik';
import {Button, FsxDrawer, FsxDropdown} from '@app/components/common';
import projectsService from '@app/services/catalog/projects.service';
import {FsxFormikInput} from '@app/components/common/FsxFormik';
import {
  GENERAL_ASSET_NAME_KEY,
  postGeneralAssetName,
  useGeneralAssetNames,
} from '@app/services/asset/assets.service';
import GeneralAssetName, {
  newGeneralAssetName,
} from '@app/entities/asset/inventory/GeneralAssetName';
import {getQuery, getQueryData} from '@app/helpers/reactQuery';
import { ASSET_GROUPS_KEY, useAssetGroups } from '@app/services/asset/standardentries/assetGroup.service';

export interface GeneralAssetNameInputProps {
  assetGroupId: number;
}

const GeneralAssetNameInput: React.FC<GeneralAssetNameInputProps> = ({assetGroupId}) => {
  const [isOpen, setIsOpen] = React.useState(() => false);
  const formikRef = React.useRef<FormikProps<GeneralAssetName>>(null);
  const assetGroups = getQueryData<typeof useAssetGroups>(ASSET_GROUPS_KEY);

  const handleSubmitAssetName = (request: GeneralAssetName) => {
    const project = projectsService.Session.currentProject.get();

    if (!project) return;

    request.code = `${project.code}-${assetGroupId}-${request.title}`;

    postGeneralAssetName(request).then(() => {
      setIsOpen(false);
      const query = getQuery<typeof useGeneralAssetNames>(GENERAL_ASSET_NAME_KEY);
      query?.fetchMore();
    });
  };

  return (
    <div className="flex flex-row flex-1">
      <FsxDrawer
        unMountChildren
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        className="flex-col px-4 pt-10"
        title="New General Asset Name">
        <Formik
          initialValues={newGeneralAssetName(assetGroupId)}
          onSubmit={handleSubmitAssetName}
          innerRef={formikRef}>
          <Form className="flex flex-1 flex-col w-full h-full items-center justify-between">
            <div className="w-full flex flex-1 flex-col">
              <FsxDropdown
                value={assetGroupId}
                data={assetGroups?.data}
                dataItemKey="id"
                textField="title"
                disabled
              />
              <FsxFormikInput label="Title:" name="title" />
              <FsxFormikInput label="Description:" name="description" />
            </div>
            <div className="px-5 pb-5 w-full flex">
              <Button block oval shadow ripple>
                Submit
              </Button>
            </div>
          </Form>
        </Formik>
      </FsxDrawer>
      
      <button
        className="flex justify-center items-center border border-gray-200 mb-3 mt-2 ml-2 px-4 text-2xl rounded-lg bg-transparent hover:bg-gray-200 hover:shadow"
        onClick={() => setIsOpen(true)}
        type="button">
        +
      </button>
    </div>
  );
};

export default GeneralAssetNameInput;
