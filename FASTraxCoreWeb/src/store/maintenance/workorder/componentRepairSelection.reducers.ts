import { createReducer, createAction } from '@reduxjs/toolkit';
import { generateNegativeNumber } from '@app/helpers/randoms';
import RepairOperationSelection from '@app/entities/maintenance/RepairOperationSelection';

export const addWorkOrderComponentRepairSelection = createAction<RepairOperationSelection>('ADD_WORK_ORDER_COMPONENT_REPAIR_SELECTION');
export const removeWorkOrderComponentRepairSelection = createAction<RepairOperationSelection>('REMOVE_WORK_ORDER_COMPONENT_REPAIR_SELECTION');
export const setWorkOrderComponentRepairSelections = createAction<RepairOperationSelection[]>('SET_WORK_ORDER_COMPONENT_REPAIR_SELECTIONS');
export const updateWorkOrderComponentRepairSelection = createAction<RepairOperationSelection>('UPDATE_WORK_ORDER_COMPONENT_REPAIR_SELECTION');

export const initWorkOrderComponentRepairSelections: RepairOperationSelection[] = [];

export const initSingWorkOrderComponentRepairSelection = (ids?: number[]): RepairOperationSelection => ({
    tempId: generateNegativeNumber({ flat: ids }),
    id: '',
    repairGroupId: 0,
    repairGroupSRO: '',
    repairGroup: '',
    repairSubGroupId: 0,
    repairSubGroupSRO: '',
    repairSubGroup: '',
    checked: false,
    selected: false
});

export const workOrderComponentRepairSelectionReducer = createReducer(initWorkOrderComponentRepairSelections, builder =>
    builder
        .addCase(addWorkOrderComponentRepairSelection, (state, action) => ([...state, action.payload]))
        .addCase(setWorkOrderComponentRepairSelections, (_, action) => action.payload)
        .addCase(updateWorkOrderComponentRepairSelection, (state, action) => {
            var index: number = 0;

            if (action.payload.tempId !== undefined) {
                index = state.findIndex(aai => aai.tempId === action.payload.tempId);
            } else {
                index = state.findIndex(aai => aai.id === action.payload.id);
            }

            state[index] = action.payload;

            return state;
        })
        .addCase(removeWorkOrderComponentRepairSelection, (state, action) => {
            if (action.payload.tempId !== undefined) {
                return state.filter(aai => aai.tempId !== action.payload.tempId);
            } else {
                return state.filter(aai => aai.id !== action.payload.id);
            }
        })
);