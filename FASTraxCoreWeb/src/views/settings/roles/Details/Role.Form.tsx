import React from 'react';
import {FsxFormikInput, FsxFormikTextArea} from '@app/components/common/FsxFormik';

export interface IRoleForm {}

const RoleForm: React.FC<IRoleForm> = () => {
  return (
    <div className="shadow-lg p-4 bg-white widget-box">
      <div className="flex flex-wrap flex-row items-start pb-4">
        <div className="w-full">
          <div className="flex">
            <div className="w-col w-1/3">
              <FsxFormikInput label="Code" name="code" type="text" required />
            </div>
            <div className="w-col w-1/3">
              <FsxFormikInput label="Title" name="title" type="text" required />
            </div>
          </div>

          <div className="flex flex-row">
            <div className="w-2/3">
              <FsxFormikTextArea label="Description" name="description" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoleForm;
