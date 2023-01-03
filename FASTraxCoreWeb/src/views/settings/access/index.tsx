import React from 'react';
import ModuleTree from './Access.Module';
import {FormikContextType} from 'formik';

interface IPageAccessProps {
  headerFormik: FormikContextType<unknown>;
}

const PageAccess: React.FC<IPageAccessProps> = ({headerFormik, ...rest}) => {
  return (
    <div className="flex flex-grow px-10 py-5 bg-gray-100 mt-5">
      <div className="w-col w-full">
        <div className="widget-box h-full">
          <div className="px-3 py-5 text-gray-600">Page Module</div>
          <ModuleTree headerFormik={headerFormik} />
        </div>
      </div>
    </div>
  );
};

export default React.memo(PageAccess);
