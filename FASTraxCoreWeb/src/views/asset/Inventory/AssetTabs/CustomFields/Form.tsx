import {useDispatch, useSelector} from 'react-redux';

import {FsxInput} from '../../../../../components/common';
import React from 'react';
import {RootState} from '../../../../../store/rootReducer';
import {updateCustomFields} from '@app/store/common/entityCustomField.reducers';

export interface CustomFieldsFormProps {}

const CustomFieldsForm: React.FC<CustomFieldsFormProps> = () => {
  const dispatch = useDispatch();
  const fields = useSelector((state: RootState) => state.entityCustomFields);

  return (
    <div className="flex flex-1 flex-row flex-wrap px-5 mb-12 mt-4">
      {fields.map((field, i) => (
        <div className="w-full lg:w-1/4 md:w-1/2 sm:w-1/2 px-2" key={i}>
          <FsxInput
            style={{width: '100%'}}
            label='Custom'
            value={field.value}
            onChange={e => dispatch(updateCustomFields({...field, value: e.value}))}
          />
        </div>
      ))}
    </div>
  );
};

export default React.memo(CustomFieldsForm);
