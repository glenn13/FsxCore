import React from 'react';
import {Prompt} from 'react-router-dom';
import {useFormikContext} from 'formik';
import AssetTabs from './AssetTabs';
import { AssetCategoryEnum } from '@app/helpers/asset/enum'

export interface AssetInformationProps {
    id?: number;
    categoryId: AssetCategoryEnum;
}

const AssetInformation: React.FC<AssetInformationProps> = ({id, children, categoryId}) => {
  const formik = useFormikContext();

  return (
    <div className="flex flex-col">
      <Prompt
        when={Object.keys(formik.touched).length > 0 && !formik.status}
        message={() => 'You have some unsaved changes that may get lost, do you want to proceed?'}
      />
      {children}
      <AssetTabs assetId={id} categoryId={categoryId} referenceId={id} />
    </div>
  );
};

export default AssetInformation;
