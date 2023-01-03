import {Button, FsxCheckbox, FsxDrawer, FsxTextArea} from '@app/components/common';
import {GridColumn as Column, Grid, GridCellProps} from '@progress/kendo-react-grid';
import {find, findIndex, map, omit, remove} from 'lodash';

import {ActionWrapperStyled} from '@app/components/common/FsxTable/Actions';
import FsxInput from '@app/components/common/FsxInput';
import FsxTableAction from '@app/components/common/FsxTable/Action';
import React from 'react';
import {getVehicleInspectionAreas} from '@app/services/maintenance/standardentries/maintenanceInspectionArea';
import {useFormikContext} from 'formik';

// import {Checkbox} from '@progress/kendo-react-inputs';

interface InspectionDetailsGridProps {
  formikField: string;
  tableActionOnAdd?: () => void;
  tableActionOnEdit?: () => void;
  tableActionOnDelete?: () => void;
  new?: boolean;
}

type GridData = VehicleInspectionDetails & {inspectionArea?: string; selected?: boolean};

const InspectionVehicleInspectionDetailsGrid = (props: InspectionDetailsGridProps) => {
  const {
    values: formikValues,
    setFieldValue: setFormikValue,
  } = useFormikContext<InspectionVehicle>();

  const [editDrawerIsOpen, setEditDrawerIsOpen] = React.useState(false);

  const [rowSelected, setRowSelected] = React.useState(0);

  const [vehicleInspectionAreas, setVehicleInspectionAreas] = React.useState<InspectionArea[]>();

  const [gridData, setGridData] = React.useState<GridData[]>([]);

  const [
    selectedInspectionArea,
    setSelectedInspectionArea,
  ] = React.useState<VehicleInspectionDetails>({
    maintenanceVehicleInspectionAreaId: 0,
    passed: false,
    actionTaken: '',
    details: '',
    id: 0,
    remarks: '',
  });

  //* An effect for initial fetching of vehicle inspection area
  React.useEffect(() => {
    (async () => {
      await getVehicleInspectionAreas().then(res => setVehicleInspectionAreas(res.data));
    })();
  }, []);

  //* An effect for setting the maintenance inspection area
  React.useEffect(() => {
    if (props.new)
      setFormikValue(
        props.formikField,
        vehicleInspectionAreas
          ?.filter(inspectionArea => inspectionArea.prePopulated)
          .map(inspectionArea => ({
            maintenanceVehicleInspectionAreaId: inspectionArea.id,
            details: inspectionArea.description,
            passed: false,
            actionTaken: '',
            remarks: '',
          })),
      );
  }, [props.formikField, props.new, setFormikValue, vehicleInspectionAreas]);

  //* An effect for setting the grid data from formik values
  React.useEffect(() => {
    setGridData(
      formikValues.inspectionVehicleInspectionDetails?.map(inspectionDetails => ({
        ...inspectionDetails,
        inspectionArea: find(vehicleInspectionAreas, [
          'id',
          inspectionDetails.maintenanceVehicleInspectionAreaId,
        ])?.title,
        selected: inspectionDetails.maintenanceVehicleInspectionAreaId === rowSelected,
      })) || [],
    );
  }, [formikValues.inspectionVehicleInspectionDetails, rowSelected, vehicleInspectionAreas]);

  React.useEffect(() => {
    if (formikValues.inspectionVehicleInspectionDetails)
      setSelectedInspectionArea(
        formikValues.inspectionVehicleInspectionDetails[
          findIndex(
            formikValues.inspectionVehicleInspectionDetails,
            inspectionDetails =>
              inspectionDetails.maintenanceVehicleInspectionAreaId === rowSelected,
          )
        ],
      );
  }, [formikValues.inspectionVehicleInspectionDetails, rowSelected]);

  //* Deleting the selected row from the grid
  const deleteInspectionArea = () => {
    const prevData = gridData || [];
    setFormikValue(props.formikField, [
      ...remove(
        prevData,
        inspectionDetails => inspectionDetails.maintenanceVehicleInspectionAreaId !== rowSelected,
      ).map(inspectionDetails => omit(inspectionDetails, ['inspectionArea', 'selected'])),
    ]);
  };

  //* Checkbox cell
  const CheckboxCell = (cell: GridCellProps) => (
    <td className="k-command-cell" colSpan={1} role="gridcell">
      <FsxCheckbox checked={cell.dataItem.passed} withFormWrapper={false} />
    </td>
  );

  //* Updates inspection details from formik field
  const updateInspectionDetails = () => {
    const newData = map(formikValues.inspectionVehicleInspectionDetails, inspectionDetails => {
      return inspectionDetails.maintenanceVehicleInspectionAreaId === rowSelected
        ? {...inspectionDetails, ...selectedInspectionArea}
        : inspectionDetails;
    });
    setFormikValue(props.formikField, newData);
    setEditDrawerIsOpen(false);
  };

  return (
    <>
      <Grid
        className="mt-3"
        data={gridData}
        selectedField="selected"
        onRowClick={event => setRowSelected(event.dataItem.maintenanceVehicleInspectionAreaId)}
        onRowDoubleClick={() => setEditDrawerIsOpen(!editDrawerIsOpen)}>
        <Column field="inspectionArea" title="Inspection Area" />
        <Column field="details" title="Details" />
        <Column field="passed" title="Passed" cell={CheckboxCell} />
        <Column field="actionTaken" title="Action Taken" />
        <Column field="remarks" title="Remarks" />
      </Grid>
      <ActionWrapperStyled>
        <FsxTableAction
          label={'Add'}
          onClick={props.tableActionOnAdd ? props.tableActionOnAdd : () => console.log('Add')}
        />

        <FsxTableAction
          label={'Edit'}
          onClick={
            props.tableActionOnEdit
              ? props.tableActionOnEdit
              : () => setEditDrawerIsOpen(!editDrawerIsOpen)
          }
          disabled={
            rowSelected === undefined ||
            findIndex(
              gridData,
              gridItem => gridItem.maintenanceVehicleInspectionAreaId === rowSelected,
            ) <= -1
          }
        />
        <FsxTableAction
          label={'Delete'}
          onClick={props.tableActionOnDelete ? props.tableActionOnDelete : deleteInspectionArea}
          disabled={
            rowSelected === undefined ||
            findIndex(
              gridData,
              gridItem => gridItem.maintenanceVehicleInspectionAreaId === rowSelected,
            ) <= -1
          }
        />
      </ActionWrapperStyled>
      <FsxDrawer
        title="Inspection Area"
        isOpen={editDrawerIsOpen}
        onClose={() => setEditDrawerIsOpen(!editDrawerIsOpen)}>
        <div className="p-4 w-full">
          {vehicleInspectionAreas && editDrawerIsOpen && (
            <FsxInput
              className="mb-4"
              label="Inspection Area"
              value={
                vehicleInspectionAreas[
                  findIndex(
                    vehicleInspectionAreas,
                    inspectionArea => inspectionArea.id === rowSelected,
                  )
                ].title
              }
              readOnly
            />
          )}
          {selectedInspectionArea && editDrawerIsOpen && (
            <div className="grid grid-cols-1 gap-y-4">
              <FsxInput
                label="Details"
                value={selectedInspectionArea.details}
                onChange={e =>
                  setSelectedInspectionArea(prevState => ({...prevState, details: e.value}))
                }
              />
              <FsxCheckbox
                label={'Passed'}
                value={selectedInspectionArea.passed}
                onChange={e =>
                  setSelectedInspectionArea(prevState => ({...prevState, passed: e.value}))
                }
              />
              <FsxInput
                label="Action Taken"
                value={
                  selectedInspectionArea.actionTaken
                    ? selectedInspectionArea.actionTaken
                    : undefined
                }
                onChange={e =>
                  setSelectedInspectionArea(prevState => ({...prevState, actionTaken: e.value}))
                }
              />
              <FsxTextArea
                label="Remarks"
                value={selectedInspectionArea.remarks}
                onChange={e =>
                  setSelectedInspectionArea(prevState => ({
                    ...prevState,
                    remarks: typeof e.value === 'string' ? e.value : undefined,
                  }))
                }
                rows={4}
              />
              <Button
                className="mt-6"
                type="button"
                block
                oval
                shadow
                ripple
                onClick={updateInspectionDetails}>
                Update
              </Button>
            </div>
          )}
        </div>
      </FsxDrawer>
    </>
  );
};

export default InspectionVehicleInspectionDetailsGrid;
