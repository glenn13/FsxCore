import React from 'react';
import {FsxGrid, Loader} from '@app/components/common';
import {GridColumn} from '@progress/kendo-react-grid';
import {
  useDispositionDamagedAreas,
  KEY,
} from '@app/services/asset/standardentries/dispositionDamagedAreas.service';
import KGridMenuFilter from '@app/plugins/KGridMenuFilter';
import StandardEntryForm from '../StandardEntryForm';
import {FormikProps} from 'formik';
import uri from '@app/helpers/endpoints';
import {useStandardEntry} from '../../useStandardEntry';
import {
  DispositionDamagedArea,
  newDispositionDamagedArea,
  dispositionDamagedAreaShape,
} from '@app/entities/asset/standard-entries/DispositionDamagedArea';
import {FsxFormikInput, FsxFormikTextArea} from '@app/components/common/FsxFormik';
import AssetCategoryDropdown from '@app/views/asset/common/Dropdowns/AssetCategory';
import AssetTypeDropdown from '@app/views/asset/common/Dropdowns/AssetType';
import * as yup from 'yup';
import {newAssetType} from '@app/entities/asset/standard-entries/index.schema';
import {useFormikContext} from 'formik';
import produce from 'immer';

export interface IDispositionDamagedAreaEntryProps {}

const DispositionDamagedAreaEntry: React.FC<IDispositionDamagedAreaEntryProps> = () => {
  const {data, isLoading} = useDispositionDamagedAreas();
  const formikRef = React.useRef<FormikProps<any>>(null);
  const fsxGridRef = React.useRef<any>(null);
  const URI = uri.assets.SE.dispositionDamagedArea.all;

  const handleAdd = React.useCallback(() => {
    setInitialValue(newDispositionDamagedArea());
  }, []);

  const handleEdit = React.useCallback(() => {}, []);

  const handleAssetCategoryOnChange = (value: AssetCategory) => {
    setAssetCategoryId(value.id);
  };

  const {
    isOpen,
    setIsOpen,
    initialValue,
    setInitialValue,
    handleSubmit,
  } = useStandardEntry<DispositionDamagedArea>(fsxGridRef, KEY, URI, handleAdd, handleEdit);

  React.useEffect(() => {
    if (!initialValue) return;
    setAssetCategoryId(initialValue?.assetType?.assetCategoryId || 0);
  }, [initialValue]);

  const [assetCategoryId, setAssetCategoryId] = React.useState(0);

  return (
    <>
      <StandardEntryForm
        onSubmit={handleSubmit}
        formikRef={formikRef}
        title="Disposition Damaged Area"
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        initialValue={initialValue}
        validationSchema={yup.object().shape(dispositionDamagedAreaShape)}>
        <FsxFormikInput label="Name" name="name" required className="mb-5" />
        <AssetCategoryDropdown
          isFormik={true}
          onChange={e => handleAssetCategoryOnChange(e.value)}
        />
        <AssetTypeDropdown isFormik={true} assetCategoryId={assetCategoryId} />
      </StandardEntryForm>
      {isLoading && <Loader />}
      {!isLoading && data && data.data && (
        <FsxGrid gridRef={fsxGridRef} data={data.data as any} className="h-full" skip={0}>
          <GridColumn field="name" title="Name" filter={'text'} columnMenu={KGridMenuFilter} />
          <GridColumn
            field="assetType.title"
            title="Asset Type"
            filter={'text'}
            columnMenu={KGridMenuFilter}
          />
        </FsxGrid>
      )}
    </>
  );
};

export default DispositionDamagedAreaEntry;
