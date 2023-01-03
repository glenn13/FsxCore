import React from 'react';
import {ImageResources} from '../.././assets';

export interface UnderConstructionProps {
  underConstruction?: boolean;
  title?: string;
  description?: string;
}

interface UnderConstructionContent {
  code: string;
  title: string;
  description: string;
}

const UnderConstruction: React.FC<UnderConstructionProps> = ({
  title: pageTitle,
  description: pageDescription,
  underConstruction,
}) => {
  const {code, title, description}: UnderConstructionContent = {
    code: underConstruction ? '503' : '404',
    title: underConstruction ? 'Under Construction' : pageTitle || 'Page Not Found',
    description: underConstruction
      ? 'The Page you are looking for is still Under Construction.'
      : pageDescription || 'Page you are looking for cannot be found.',
  };

  return (
    <div className="h-full w-full">
      <div className="flex mb-4 h-full widget-box items-center flex-wrap">
        <div className="flex w-full lg:w-1/2 text-center left-side-error-page lg:h-full items-center justify-center">
          <div className="flex flex-col justify-center">
            <img
              alt="Fastrax White"
              className="w-3/5 sm:w-2/3 md:w-2/3 lg:w-3/5"
              src={ImageResources.PageNotFound}
            />
          </div>
        </div>
        <div className="flex w-full lg:w-1/2 text-center right-side-error-page lg:h-full items-center justify-center">
          <div className="flex flex-col justify-center">
            <div className="title">{code}</div>
            <div className="description">{title}</div>
            <div className="text-gray-500 pt-2">{description}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnderConstruction;
