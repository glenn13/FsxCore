import CustomField from '@app/entities/global/CustomField';
import {createReducer, createAction} from '@reduxjs/toolkit';
import {EntityCustomField} from '../../entities/global/EntityCustomField';

export const setCustomFields = createAction<EntityCustomField[]>('SET_CUSTOM_FIELDS');
export const updateCustomFields = createAction<EntityCustomField>('UPDATE_CUSTOM_FIELDS');
export const generateCustomFields = createAction<CustomField[]>('GENERATE_CUSTOM_FIELDS');

export const entityCustomFields = createReducer([] as EntityCustomField[], builder =>
  builder
    .addCase(setCustomFields, (_, action) => action.payload)
    .addCase(updateCustomFields, (state, action) => {
      const index = state.findIndex(cf => cf.id === action.payload.id);
      state[index] = action.payload;

      return state;
    })
    .addCase(generateCustomFields, (_, action) => {
      const len = action.payload.length;

      return action.payload.map(
        (field, i) =>
          ({
            id: i - len,
            value: '',
            customField: field,
            customFieldId: field.id,
          } as EntityCustomField),
      );
    }),
);
