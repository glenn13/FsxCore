import React from 'react';
import CustomersDropdown from '@app/views/crm/common/Dropdowns/Customer';
import CountriesDropdown from '@app/views/catalog/common/Dropdowns/Countries';
import ProjectGroupsDropdown from '@app/views/catalog/common/Dropdowns/ProjectGroups';
import CurrencyDropdown from '@app/views/finance/common/Dropdowns/CurrencyPicker';
import ProjectStatusesDropdown from '@app/views/catalog/common/Dropdowns/ProjectStatuses';
import {FsxFormikInput, FsxFormikTextArea} from '@app/components/common/FsxFormik';
import {AvatarUploader} from '@app/components/common';
import {attachmentToDataURL, attachmentToFile} from '@app/helpers/files';
import {useField, useFormikContext} from 'formik';
import ProjectAssetCategory from './Project.AssetCategory';
import validator from 'validator';

export interface IProjectForm {}

const ProjectForm: React.FC<IProjectForm> = () => {
  const parentFormik = useFormikContext();
  const [field] = useField('projectImage');
  const [file, setFile] = React.useState<File>();
  const [uri, setUri] = React.useState<string>();
  const [isInitial, setIsInitial] = React.useState<boolean>(false);

  const handleLoad = async (value: any) => {
    if (!value) return;

    const fileAttachment = await attachmentToFile({
      ...value,
    });

    const imageUri = attachmentToDataURL({...value});

    imageUri && setUri(imageUri);

    setFile(fileAttachment);
  };

  React.useEffect(() => {
    setIsInitial(true);
    handleLoad(field.value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    if (!file) return;
    if (!isInitial) parentFormik.setFieldValue('imageString', uri);

    setIsInitial(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [file, uri]);

  React.useEffect(() => {
    if (!parentFormik.isSubmitting) return;
    if (!file) return;

    const projectImage = {
      filename: file?.name,
      fileType: file?.type,
      fileSize: file?.size,
      ...field.value,
    };

    console.log({projectImage});

    parentFormik.setFieldValue('projectImage', projectImage);
    parentFormik.setFieldValue('imageString', uri);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [parentFormik.isSubmitting]);

  const handleInputToUpperCase = (e: any) => (e.target.value = ('' + e.target.value).toUpperCase());

  const handleInputToCapitalize = (e: any) =>
    (e.target.value = '' + e.target.value.replace(/^(.)|\s+(.)/g, (c: string) => c.toUpperCase()));

  const handleKeyPress = (e: any) => !validator.isAlpha(e.key) && e.preventDefault();

  return (
    <div className="shadow-lg p-4 bg-white widget-box">
      <div className="flex flex-wrap flex-col-reverse md:flex-row items-start py-4 px-3">
        <div className="w-col w-full md:w-2/4">
          <div className="flex flex-row">
            <div className="w-col w-full">
              <FsxFormikInput
                label="Code"
                name="code"
                type="text"
                required
                onInput={handleInputToUpperCase}
                onKeyPress={handleKeyPress}
              />
            </div>
            <div className="w-col w-full">
              <FsxFormikInput
                label="Title"
                name="title"
                type="text"
                required
                onInput={handleInputToCapitalize}
              />
            </div>
          </div>

          <div className="flex flex-row">
            <div className="w-full">
              <FsxFormikTextArea label="Description" name="description" className="mb-3" />
            </div>
          </div>

          <div className="flex flex-row">
            <div className="w-col w-full">
              <CountriesDropdown label="Country" name="countryId" required />
            </div>
            <div className="w-col w-full">
              <ProjectGroupsDropdown label="Project Group" name="groupId" required />
            </div>
          </div>

          <div className="flex flex-row">
            <div className="w-full">
              <CustomersDropdown label="Client" name="clientId" required />
            </div>
          </div>

          <div className="flex flex-row">
            <div className="w-col w-full">
              <div className="flex flex-row">
                <div className="w-col w-full">
                  <CurrencyDropdown label="Base Currency" name="baseCurrencyId" required />
                </div>
                <div className="w-col w-full">
                  <CurrencyDropdown label="Local Currency" name="localCurrencyId" required />
                </div>
              </div>
            </div>
            <div className="w-col w-full">
              <ProjectStatusesDropdown label="Status" name="statusId" required />
            </div>
          </div>
        </div>
        <div className="w-col w-full md:w-1/4"></div>
        <div className="w-col w-full md:w-1/4 px-5 py-10">
          <div className="rounded-full h-48 w-48 flex items-center justify-center bg-gray-300 mx-auto my-0 relative">
            <AvatarUploader
              rounded={true}
              image={file}
              onChange={(imageFile: any, imageUri: any) => {
                if (imageFile) setFile(imageFile);
                if (imageUri) setUri(imageUri);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectForm;
