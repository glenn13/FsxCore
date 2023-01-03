import React, {useRef} from 'react';
import {Formik, FormikProps} from 'formik';
import {useDispatch, useSelector} from 'react-redux';
import { Checkbox, FsxDrawer, FsxTable } from '@app/components/common';
import { GridColumn } from '@app/helpers/types';
import { RootState } from '@app/store/rootReducer';
import FsxFormikInput from '@app/components/common/FsxFormik/FsxFormikInput';
import FsxTableActions from '@app/components/common/FsxTable/Actions';
import PersonnelAddress from '@app/entities/hr/PersonnelAddress';
import Heading from '@app/views/common/Heading';

// import CountryDropdown from '@app/views/hr/common/Dropdowns/Country';

import CountriesDropdown from '@app/views/catalog/common/Dropdowns/Countries';
import  Country  from '@app/entities/catalog/Country';

import {
    addPersonnelAddress, 
    removePersonnelAddress,
    updatePersonnelAddress
} from '@app/store/hr/personnelAddress.reducers';
import { newPersonnelAddress } from '@app/entities/hr/personnel.schema';

export interface PersonnelAddressProps {}


const columns: GridColumn[] = [
    {field: 'address', title: 'Address'},
    {field: 'city', title: 'City'},
    {field: 'country.title', title: 'Country'},
    {field: 'zipCode', title: 'Zip Code'},
];

const Address: React.FC<PersonnelAddressProps> = () => {
    const dispatch = useDispatch();
    const [isOpen, setIsOpen] = React.useState(false);
    const [selected, setSelected] = React.useState<PersonnelAddress>();
    const [country, setCountry] = React.useState<Country>();

    const [
        personnelAddressDetail,
        setPersonnelAddressDetail,
    ] = React.useState<PersonnelAddress>(newPersonnelAddress());
    
    const personnelAddressReducer = useSelector(
        (state: RootState) => state.personnelAddressReducer,
    )

    const tempIds = React.useMemo(() => personnelAddressReducer.current?.map(x => x.tempId), [
        personnelAddressReducer.current,
    ]);

    const formikRef = React.useRef<FormikProps<PersonnelAddress>>(null);

    const handleAdd = () => {
        setPersonnelAddressDetail(newPersonnelAddress(tempIds));
        setCountry(undefined);
        setIsOpen(true);
    };

    const handleClose = () => {
        setPersonnelAddressDetail(newPersonnelAddress(tempIds));
        setIsOpen(false);
    };

    const handleDelete = () => {
        if (!selected) return;
        dispatch(removePersonnelAddress(selected));
        setSelected(undefined);
    };

    const handleDrawerSubmit = () => {
        formikRef.current?.handleSubmit();
    };

    const handleEdit = () => {
        if (!selected) return;
        
        setCountry(selected.country);
        setPersonnelAddressDetail(selected);
        setIsOpen(true);
    };

    const handleFormikSubmit = (value: PersonnelAddress) => {
        const action = tempIds?.indexOf(value.tempId) === -1
            ? addPersonnelAddress
            : updatePersonnelAddress;
            
        value.country = country;
        dispatch(action(value));
    
        setIsOpen(false);
    };

    const handleCountryOnChange = (value: Country) => {
        setCountry(value);
    } 
    
    React.useEffect(() => {
       setPersonnelAddressDetail(newPersonnelAddress(tempIds));
      }, [personnelAddressReducer, tempIds]);

    return(
        <>
            <Heading title="Address" />
            <div className="flex flex-col h-full p-2 h-full">
                <FsxDrawer
                    title="Personnel Address"
                    isOpen={isOpen}
                    onClose={handleClose}
                    unMountChildren={true}
                    onSubmit={handleDrawerSubmit}
                >
                    <div className="flex flex-1 flex-col w-full py-4 px-8">
                        <Formik
                            enableReinitialize={true}
                            initialValues={personnelAddressDetail}
                            validateOnChange={false}
                            onSubmit={handleFormikSubmit}
                            innerRef={formikRef}
                        >
                        <div className="grid sm:grod-cols-1 md:grid-cols-3 lg:grid-cols-1 gap-2">
                            
                            <FsxFormikInput label="Address:" name="address" type="text" />
                            <FsxFormikInput label="City:" name="city" type="text" />
                            <CountriesDropdown label="Country: " name="countryId" onChange={(e) => handleCountryOnChange(e.value)} required filterable />
                            <FsxFormikInput label="Zip Code:" name="zipCode" type="text" />
                            
                        </div>
                        </Formik>
                    </div>
                </FsxDrawer>

                <FsxTable
                    data={personnelAddressReducer.current}
                    columns={columns}
                    onRowClick={e => setSelected(e.dataItem)}
                    onRowDoubleClick={handleEdit
                }>
                    <FsxTableActions
                        onAdd={handleAdd}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />
                </FsxTable>
            </div>  
        </>   
    );
};

export default React.memo(Address);
