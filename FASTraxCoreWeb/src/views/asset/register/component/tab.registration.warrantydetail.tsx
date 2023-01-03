import React from 'react';
import {Formik, FormikProps} from 'formik';
import {useDispatch, useSelector} from 'react-redux';
import { FsxDrawer, FsxTable } from '@app/components/common';
import { GridColumn } from '@app/helpers/types';
import { RootState } from '@app/store/rootReducer';
import FsxFormikInput from '@app/components/common/FsxFormik/FsxFormikInput';
import FsxTableActions from '@app/components/common/FsxTable/Actions';
import FsxFormikDatePicker from '@app/components/common/FsxFormik/FsxFormikDatePicker';

import WarrantyTypeDropdown from '@app/views/asset/common/Dropdowns/WarrantyType';

import {addComponentWarrantyDetail
    , removeComponentWarrantyDetail
    , updateComponentWarrantyDetail } 
from '@app/store/asset/register/componentWarrantyDetail.reducers';
import { newComponentWarrantyDetail } from '@app/entities/asset/register/component/component.schema';
import { FSXDateFormat } from '@app/helpers/global/enum';

export interface WarrantyDetailProps {
    isReadOnly: boolean;
}

const columns: GridColumn[] = [
    {field: 'warrantyType', title: 'Warranty Type'},
    {field: 'referenceNo', title: 'Reference No.'},
    {field: 'registeredTo', title: 'Registered To'},
    {field: 'warrantyProvider', title: 'Warranty Provided'},
    {field: 'startDate', title: 'Start Date', type: "date"},
    {field: 'expiryDate', title: 'Expiry Date', type: "date"}
];

const WarrantyDetail: React.FC<WarrantyDetailProps> = ({isReadOnly}) => {
    const dispatch = useDispatch();
    const [isOpen, setIsOpen] = React.useState(false);
    const [selected, setSelected] = React.useState<ComponentWarrantyDetail>();
    const [warrantyType, setWarrantyType] = React.useState<string>('');

    const [
        componentWarrantyDetail,
        setComponentWarrantyDetail,
      ] = React.useState<ComponentWarrantyDetail>(newComponentWarrantyDetail());

    const componentWarrantyDetailReducer = useSelector(
        (state: RootState) => state.componentWarrantyDetailReducer,
    );

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const tempIds = React.useMemo(() => componentWarrantyDetailReducer.current?.map(x => x.tempId), [
        componentWarrantyDetailReducer.current,
    ]);

    const formikRef = React.useRef<FormikProps<ComponentWarrantyDetail>>(null);

    const handleAdd = () => {
        setComponentWarrantyDetail(newComponentWarrantyDetail(tempIds));
        setWarrantyType('');
        setIsOpen(true);
    };

    const handleClose = () => {
        setComponentWarrantyDetail(newComponentWarrantyDetail(tempIds));
        setIsOpen(false);
      };

    const handleDelete = () => {
        if (!selected) return;
        dispatch(removeComponentWarrantyDetail(selected));
        setSelected(undefined);
    };

    const handleDrawerSubmit = () => {
        formikRef.current?.handleSubmit();
    };

    const handleEdit = () => {
        if (!selected) return;
        setWarrantyType(selected.warrantyType);
        setComponentWarrantyDetail(selected);
        setIsOpen(true);
    };

    const handleFormikSubmit = (value: ComponentWarrantyDetail) => {
        const action =
          tempIds?.indexOf(value.tempId) === -1
            ? addComponentWarrantyDetail
            : updateComponentWarrantyDetail;
    
        value.warrantyType = warrantyType;
        dispatch(action(value));
    
        setIsOpen(false);
      };

    const handleWarrantyTypeOnChange = (value: WarrantyType) => {
        setWarrantyType(value.name);
    }

    return(
        <>
            <div className="p-2">
            <FsxDrawer
                title="Warranty Detail"
                isOpen={isOpen}
                onClose={handleClose}
                unMountChildren={true}
                onSubmit={handleDrawerSubmit}
                isReadOnly={isReadOnly}>
            <div className="flex flex-1 flex-col w-full py-4 px-8">
                <Formik
                enableReinitialize={true}
                initialValues={componentWarrantyDetail}
                validateOnChange={false}
                onSubmit={handleFormikSubmit}
                innerRef={formikRef}>
                <div className="grid sm:grod-cols-1 md:grid-cols-3 lg:grid-cols-1 gap-2">
                    <WarrantyTypeDropdown isFormik onChange={(e) => handleWarrantyTypeOnChange(e.value)} disabled={isReadOnly} />
                    <FsxFormikInput label="Reference No.:" name="referenceNo" type="text" disabled={isReadOnly} />
                    <FsxFormikInput label="Registered To:" name="registeredTo" type="text" disabled={isReadOnly} />
                    <FsxFormikInput label="Warranty Provider:" name="warrantyProvider" type="text" disabled={isReadOnly} />
                    <FsxFormikDatePicker label="Start Date:" name={`startDate`} format={FSXDateFormat.Default} disabled={isReadOnly} />
                    <FsxFormikDatePicker label="Expiry Date:" name={`expiryDate`} format={FSXDateFormat.Default} disabled={isReadOnly} />
                </div>
                </Formik>
            </div>
            </FsxDrawer>

            <FsxTable
            data={componentWarrantyDetailReducer.current}
            columns={columns}
            onRowClick={e => setSelected(e.dataItem)}
            onRowDoubleClick={handleEdit}>
            <FsxTableActions
                onAdd={handleAdd} 
                onEdit={handleEdit} 
                onDelete={handleDelete}
                isReadOnly={isReadOnly} />
            </FsxTable>
            </div>  
        </>   
    );
};

export default React.memo(WarrantyDetail);