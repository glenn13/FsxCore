import React from 'react';
import {FsxFormikInput} from '@app/components/common/FsxFormik';
import {FsxInput} from '@app/components/common';

interface IUserCredentialProps {}

const UserCredential: React.FC<IUserCredentialProps> = props => {
  return (
    <div className="flex px-10 py-5 pb-10">
      <div className="w-full md:w-3/4">
        <div className="flex">
          <div className="w-col lg:w-2/4 md:w-1/2 w-full">
            <FsxFormikInput
              label="Current Password"
              name="oldPassword"
              type="password"
              required
              className="mb-3"
            />
            <FsxFormikInput
              label="New Password"
              name="newPassword"
              type="password"
              required
              className="mb-3"
            />
            <FsxFormikInput
              label="Confirm New Password"
              name="confirmPassword"
              type="password"
              required
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(UserCredential);
