import {attachmentToDataURL, attachmentToFile} from '@app/helpers/files';
import {useField, useFormikContext} from 'formik';

import {AvatarUploader} from '@app/components/common';
import CountriesDropdown from '@app/views/catalog/common/Dropdowns/Countries';
import HumanResourceDepartmentDropdown from '@app/views/hr/common/Dropdowns/HumanResouceDepartment';
import PersonnelPositionDropdown from '@app/views/hr/common/Dropdowns/PersonnelPositions';
import CustomersDropdown from '@app/views/crm/common/Dropdowns/Customer';
import {FsxFormikInput} from '@app/components/common/FsxFormik';
import React from 'react';
import UserStatusDropdown from '@app/views/catalog/common/Dropdowns/UserStatuses';
import {useSelector, shallowEqual, useDispatch} from 'react-redux';
import {RootState} from '@app/store/rootReducer';
import {loadAllProjectSitesByCustomer} from '@app/store/catalog/projects/project.actions';
import {
  setProjectSite,
  setProjectSiteByUser,
} from '@app/store/catalog/projectsites/projectsites.reducer';

export interface IUserFormProps {}

interface AssetAttachment {
  createdUserId: number;
}

const UserForm: React.FC<IUserFormProps> = () => {
  const parentFormik = useFormikContext();
  const [firstName] = useField('firstName');
  const [lastName] = useField('lastName');
  const [field] = useField('userImage');
  const [userAdmin] = useField('userAdmin');
  const [file, setFile] = React.useState<File>();
  const [uri, setUri] = React.useState<string>();
  const [isInitial, setIsInitial] = React.useState<boolean>(false);
  const user = useSelector((state: RootState) => state.users.current, shallowEqual);
  const dispatch = useDispatch();

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
    // console.log(field);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    if (!file) return;
    if (!isInitial) parentFormik.setFieldValue('imageString', uri);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [file, uri]);

  React.useEffect(() => {
    if (!parentFormik.isSubmitting) return;
    if (!file) return;

    const userImage = {
      filename: file?.name,
      fileType: file?.type,
      fileSize: file?.size,
      ...field.value,
    };
    console.log(field.value);
    parentFormik.setFieldValue('userImage', userImage);
    parentFormik.setFieldValue('imageString', uri);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [parentFormik.isSubmitting]);

  const isHidden = !!userAdmin.value && userAdmin.value.superAdmin;
  const isDisable = !!userAdmin.value && user && user.isAdmin;

  React.useEffect(() => {
    if (isHidden) return;

    dispatch(setProjectSite([]));
  }, [isHidden]);

  const handleClientChange = (e: any) => {
    const {id} = e.target.value;
    dispatch(loadAllProjectSitesByCustomer(id));
  };

  return (
    <div className="shadow-lg p-4 bg-white widget-box">
      <div className="flex flex-wrap flex-col-reverse md:flex-row items-start py-4 px-3">
        <div className="w-full md:w-3/4">
          <div className="flex">
            <div className="w-col w-1/3">
              <FsxFormikInput label="First Name" name="firstName" type="text" required />
            </div>
            <div className="w-col w-1/3">
              <FsxFormikInput label="Last Name" name="lastName" type="text" required />
            </div>
          </div>

          <div className="flex flex-row">
            <div className="w-col w-1/3">
              <PersonnelPositionDropdown label="Position/ Title" name="designationId" required />
            </div>
            <div className="w-col w-1/3">
              <FsxFormikInput label="Email Address" name="email" type="text" />
            </div>
            <div className="w-col w-1/3">
              <FsxFormikInput name="contactNo" required label="Contact No." type="text" />
            </div>
          </div>

          <div className="flex flex-row">
            <div className="w-col w-1/3">
              <CountriesDropdown label="Country" name="countryId" required filterable />
            </div>
            <div className="w-col w-1/3">
              <FsxFormikInput label="City/ State/ Zip Code" name="stateZipCode" type="text" />
            </div>
            <div className="w-col w-1/3">
              <UserStatusDropdown label="Status" name="statusId" required />
            </div>
          </div>

          <div className="flex flex-row">
            {!isHidden && (
              <div className="w-col w-1/3">
                <CustomersDropdown
                  label="Client"
                  name="customerId"
                  required
                  disabled={isDisable}
                  onChange={handleClientChange}
                />
              </div>
            )}
            <div className="w-col w-1/3">
              <HumanResourceDepartmentDropdown
                label="Department"
                isFormik={true}
                name="departmentId"
                required
              />
            </div>
            <div className="w-col w-1/3"></div>
          </div>

          <div className="flex flex-row">
            <div className="w-col w-1/3">
              <FsxFormikInput label="Address" name="address" type="text" />
            </div>
            <div className="w-col w-1/3"></div>
          </div>
        </div>
        <div className="w-full md:w-1/4 px-5 py-10">
          <div className="rounded-full h-48 w-48 flex items-center justify-center bg-gray-300 mx-auto my-0 relative">
            <AvatarUploader
              image={
                !file
                  ? `https://avatars.dicebear.com/api/initials/${firstName.value} ${lastName.value}.svg`
                  : file
              }
              onChange={(imageFile: any, imageUri: string | null) => {
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

export default UserForm;
