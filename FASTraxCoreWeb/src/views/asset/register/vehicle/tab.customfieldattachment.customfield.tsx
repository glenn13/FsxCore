import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '@app/store/rootReducer';
import {FsxInput} from '@app/components/common';
import {updateVehicleCustomField} from '@app/store/asset/register/vehiclecustomfield.reducers';
import FsxCustomField from '@app/components/common/FsxCustomField';

export interface CustomFieldProps {
  isReadOnly: boolean;
}

const CustomField: React.FC<CustomFieldProps> = ({isReadOnly}) => {
  const dispatch = useDispatch();
  const vehicleCustomFieldReducer = useSelector(
    (state: RootState) => state.vehicleCustomFieldReducer,
  );

  return (
    <div className="m-2">
      <div className="grid sm:grod-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-2">
        {vehicleCustomFieldReducer.current !== undefined &&
          vehicleCustomFieldReducer.current.map((field, i) => (
            <div className="col-span-1">
              <FsxCustomField
                style={{width: '100%'}}
                label={(field.name || 'Custom') + ':'}
                value={field.fieldValue}
                onChange={e => dispatch(updateVehicleCustomField({...field, fieldValue: e.value}))}
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
