import React from 'react';
import { FsxGrid, Loader } from '@app/components/common';
import { GridColumn } from '@progress/kendo-react-grid';
import { useCommodityGroups, KEY } from '@app/services/stock/standardentries/commodityGroup.service';
import KGridMenuFilter from '@app/plugins/KGridMenuFilter';
import StandardEntryForm from '../StandardEntryForm';
import { FormikProps } from 'formik';
import uri from '@app/helpers/endpoints';
import { useStandardEntry } from '../../useStandardEntry';
import { CommodityGroup, newCommodityGroup } from '@app/entities/stock/standard-entries/CommodityGroup';
import { Checkbox } from '@progress/kendo-react-inputs';

export interface ICommodityGroupEntryProps { }

const CommodityGroupEntry: React.FC<ICommodityGroupEntryProps> = () => {
    const { data, isLoading } = useCommodityGroups();
    const formikRef = React.useRef<FormikProps<any>>(null);
    const fsxGridRef = React.useRef<any>(null);
    const URI = uri.stock.SE.commodityGroup.all;

    const handleAdd = React.useCallback(() => {
        setInitialValue(newCommodityGroup());
    }, []);

    const handleEdit = React.useCallback(() => { }, []);

    const { isOpen, setIsOpen, initialValue, setInitialValue, handleSubmit } = useStandardEntry<CommodityGroup>(fsxGridRef, KEY, URI, handleAdd, handleEdit);

    const cellItemCheckboxTemplate = (props: any) => {
        return (
            <td>
                <Checkbox value={props.dataItem.isActive} disabled={true} />
            </td>
        );
    };

    return (
        <>
            <StandardEntryForm onSubmit={handleSubmit} formikRef={formikRef} title="Commodity Group" isOpen={isOpen} setIsOpen={setIsOpen} initialValue={initialValue} />
            {isLoading && <Loader />}
            {!isLoading && data && data.data && (
                <FsxGrid gridRef={fsxGridRef} data={data.data as any} className="h-full" skip={0}>
                    <GridColumn field="code" title="Code" filter={'text'} columnMenu={KGridMenuFilter} />
                    <GridColumn field="title" title="Title" filter={'text'} columnMenu={KGridMenuFilter} />
                    <GridColumn field="isActive" title="Active" filter={'text'} columnMenu={KGridMenuFilter} cell={cellItemCheckboxTemplate} />
                </FsxGrid>
            )}
        </>
    );
};

export default CommodityGroupEntry;