import React from 'react';

interface IPageAccessProps {}

const PageAccess: React.FC<IPageAccessProps> = props => {
  return (
    <div className="flex px-10 py-5 bg-gray-100">
      <div className="w-col w-2/4">
        <div className="widget-box ">
          <div className="px-3 py-5 text-gray-600">Page Module</div>
          {/* <ModuleTree /> */}
        </div>
      </div>
      <div className="w-col w-2/4">
        <div className="widget-box">
          <div className="px-3 py-5 text-gray-600">Module Action</div>
          {/* <ModuleActionTree /> */}
        </div>
      </div>
    </div>
  );
};

export default React.memo(PageAccess);
