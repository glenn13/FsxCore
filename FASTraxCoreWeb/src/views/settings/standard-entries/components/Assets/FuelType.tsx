import React from 'react';
import {FsxGrid, Loader} from '@app/components/common';
import {GridColumn} from '@progress/kendo-react-grid';
import { useFuelTypes, FUEL_TYPES_KEY } from '@app/services/asset/standardentries/fuelTypes.service';
import KGridMenuFilter from '@app/plugins/KGridMenuFilter';
import uri from '@app/helpers/endpoints';
import StandardEntryForm from '../StandardEntryForm';
import {FormikProps} from 'formik';
import {FuelType, newFuelType} from '@app/entities/asset/standard-entries/FuelType';
import {useStandardEntry} from '../../useStandardEntry';

export interface IFuelTypeEntryProps {}

const FuelTypeEntry: React.FC<IFuelTypeEntryProps> = () => {
  const {data, isLoading} = useFuelTypes();
  const fsxGridRef = React.useRef<any>(null);
    const formikRef = React.useRef<FormikProps<any>>(null);
    const URI = uri.assets.SE.assetFuelType.all;

  const handleAdd = React.useCallback(() => {
    setInitialValue(newFuelType());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleEdit = React.useCallback(() => {}, []);

  const {isOpen, setIsOpen, initialValue, setInitialValue, handleSubmit} = useStandardEntry<FuelType>(fsxGridRef, FUEL_TYPES_KEY, URI, handleAdd, handleEdit);

  return (
    <>
      <StandardEntryForm onSubmit={handleSubmit} formikRef={formikRef} title="Fuel Type" isOpen={isOpen} setIsOpen={setIsOpen} initialValue={initialValue} />
      {isLoading && <Loader />}
      {!isLoading && (
        <FsxGrid data={data?.data} className="h-full " gridRef={fsxGridRef}>
          <GridColumn field="code" title="Code" filter={'text'} columnMenu={KGridMenuFilter} />
          <GridColumn field="title" title="Title" filter={'text'} columnMenu={KGridMenuFilter} />
        </FsxGrid>
      )}
    </>
  );
};

export default FuelTypeEntry;
