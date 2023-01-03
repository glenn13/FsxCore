import {Button, FsxCheckbox, FsxDrawer, FsxTextArea} from '@app/components/common';
import {GridColumn as Column, Grid, GridCellProps} from '@progress/kendo-react-grid';
import {find, findIndex, map, omit, remove} from 'lodash';

import {ActionWrapperStyled} from '@app/components/common/FsxTable/Actions';
import FsxInput from '@app/components/common/FsxInput';
import FsxTableAction from '@app/components/common/FsxTable/Action';
import React from 'react';
import {getGeneralAssetInspectionAreas} from '@app/services/maintenance/standardentries/maintenanceInspectionArea';
import {useFormikContext} from 'formik';

interface InspectionDetailsGridProps {
  formikField: string;
  tableActionOnAdd?: () => void;
  tableActionOnEdit?: () => void;
  tableActionOnDelete?: () => void;
  new?: boolean;
}

type GridData = GeneralAssetInspectionDetails & {inspectionArea?: string; selected?: boolean};

const InspectionGeneralAssetInspectionDetailsGrid = (props: InspectionDetailsGridProps) => {
  const {
    values: formikValues,
    setFieldValue: setFormikValue,
  } = useFormikContext<InspectionGeneralAsset>();

  const [editDrawerIsOpen, setEditDrawerIsOpen] = React.useState(false);

  const [rowSelected, setRowSelected] = React.useState(0);

  const [generalAssetInspectionAreas, setGeneralAssetInspectionAreas] = React.useState<
    InspectionArea[]
  >();

  const [gridData, setGridData] = React.useState<GridData[]>([]);

  const [
    selectedInspectionArea,
    setSelectedInspectionArea,
  ] = React.useState<GeneralAssetInspectionDetails>({
    maintenanceGeneralAssetInspectionAreaId: 0,
    passed: false,
    actionTaken: '',
    details: '',
    id: 0,
    remarks: '',
  });

  //* An effect for initial fetching of general asset inspection area
  React.useEffect(() => {
    (async () => {
      await getGeneralAssetInspectionAreas().then(res => setGeneralAssetInspectionAreas(res.data));
    })();
  }, []);

  //* An effect for setting the maintenance inspection area
  React.useEffect(() => {
    if (props.new)
      setFormikValue(
        props.formikField,
        generalAssetInspectionAreas
          ?.filter(inspectionArea => inspectionArea.prePopulated)
          .map(inspectionArea => ({
            maintenanceGeneralAssetInspectionAreaId: inspectionArea.id,
            details: inspectionArea.description,
            passed: false,
            actionTaken: '',
            remarks: '',
          })),
      );
  }, [generalAssetInspectionAreas, props.formikField, props.new, setFormikValue]);

  //* An effect for setting the grid data from formik values
  React.useEffect(() => {
    setGridData(
      formikValues.inspectionGeneralAssetInspectionDetails?.map(inspectionDetails => ({
        ...inspectionDetails,
        inspectionArea: find(generalAssetInspectionAreas, [
          'id',
          inspectionDetails.maintenanceGeneralAssetInspectionAreaId,
        ])?.title,
        selected: inspectionDetails.maintenanceGeneralAssetInspectionAreaId === rowSelected,
      })) || [],
    );
  }, [formikValues, rowSelected, generalAssetInspectionAreas]);

  React.useEffect(() => {
    if (formikValues.inspectionGeneralAssetInspectionDetails)
      setSelectedInspectionArea(
        formikValues.inspectionGeneralAssetInspectionDetails[
          findIndex(
            formikValues.inspectionGeneralAssetInspectionDetails,
            inspectionDetails =>
              inspectionDetails.maintenanceGeneralAssetInspectionAreaId === rowSelected,
          )
        ],
      );
  }, [formikValues.inspectionGeneralAssetInspectionDetails, rowSelected]);

  //* Deleting the selected row from the grid
  const deleteInspectionArea = () => {
    const prevData = gridData || [];
    setFormikValue(props.formikField, [
      ...remove(
        prevData,
        inspectionDetails =>
          inspectionDetails.maintenanceGeneralAssetInspectionAreaId !== rowSelected,
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
    const newData = map(formikValues.inspectionGeneralAssetInspectionDetails, inspectionDetails => {
      return inspectionDetails.maintenanceGeneralAssetInspectionAreaId === rowSelected
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
        onRowClick={event => setRowSelected(event.dataItem.maintenanceGeneralAssetInspectionAreaId)}
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
              gridItem => gridItem.maintenanceGeneralAssetInspectionAreaId === rowSelected,
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
              gridItem => gridItem.maintenanceGeneralAssetInspectionAreaId === rowSelected,
            ) <= -1
          }
        />
      </ActionWrapperStyled>
      <FsxDrawer
        title="Inspection Area"
        isOpen={editDrawerIsOpen}
        onClose={() => setEditDrawerIsOpen(!editDrawerIsOpen)}>
        <div className="p-4 w-full">
          {generalAssetInspectionAreas && editDrawerIsOpen && (
            <FsxInput
              className="mb-4"
              label="Inspection Area"
              value={
                generalAssetInspectionAreas[
                  findIndex(
                    generalAssetInspectionAreas,
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
                value={selectedInspectionArea.actionTaken}
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

export default InspectionGeneralAssetInspectionDetailsGrid;
