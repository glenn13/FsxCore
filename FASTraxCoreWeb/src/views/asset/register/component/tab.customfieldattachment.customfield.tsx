import {useDispatch, useSelector} from 'react-redux';

import {FsxInput} from '@app/components/common';
import React from 'react';
import {RootState} from '@app/store/rootReducer';
import {updateComponentCustomField} from '@app/store/asset/register/componentCustomField.reducers';
import FsxCustomField from '@app/components/common/FsxCustomField';

export interface CustomFieldProps {
  isReadOnly: boolean;
}

const CustomField: React.FC<CustomFieldProps> = ({isReadOnly}) => {
  const dispatch = useDispatch();
  const componentCustomFieldReducer = useSelector(
    (state: RootState) => state.componentCustomFieldReducer,
  );

  return (
    <div className="m-2">
      <div className="grid gap-2 sm:grod-cols-1 md:grid-cols-3 lg:grid-cols-4">
        {componentCustomFieldReducer.current !== undefined &&
          componentCustomFieldReducer.current.map((field, i) => (
            <div className="col-span-1">
              <FsxCustomField
                style={{width: '100%'}}
                label={(field.name || 'Custom') + ':'}
                value={field.fieldValue}
                onChange={e =>
                  dispatch(updateComponentCustomField({...field, fieldValue: e.value}))
                }
                type={field.customFieldTypeId ? field.customFieldTypeId.toString() : '1'}
                disabled={isReadOnly}
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export default React.memo(CustomField);
