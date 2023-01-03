import React, {useRef} from 'react';
import {Formik, FormikProps} from 'formik';
import {useDispatch, useSelector} from 'react-redux';
import { Checkbox, FsxDrawer, FsxTable } from '@app/components/common';
import { GridColumn } from '@app/helpers/types';
import { RootState } from '@app/store/rootReducer';
import FsxFormikInput from '@app/components/common/FsxFormik/FsxFormikInput';
import FsxTableActions from '@app/components/common/FsxTable/Actions';
import FsxFormikDatePicker from '@app/components/common/FsxFormik/FsxFormikDatePicker';
import PersonnelBankAccount from '@app/entities/hr/PersonnelBankAccount';
import Heading from '@app/views/common/Heading';

// import CountryDropdown from '@app/views/hr/common/Dropdowns/Country';
import CountriesDropdown from '@app/views/catalog/common/Dropdowns/Countries';
import  Country  from '@app/entities/catalog/Country';

import {
    addPersonnelBankAccount, 
    removePersonnelBankAccount,
    updatePersonnelBankAccount
} from '@app/store/hr/personnelBankAccount.reducers';
import { FSXDateFormat } from '@app/helpers/global/enum';
import moment from 'moment';
import { newBankAccount } from '@app/entities/hr/personnel.schema';

export interface PersonnelBankAccountProps {}


const columns: GridColumn[] = [
    {field: 'accountHolderName', title: 'Account Holder Name'},
    {field: 'bankName', title: 'Bank Name'},
    {field: 'bankAddress', title: 'Bank Address'},
    {field: 'accountNumber', title: 'Account Number'},
    {field: 'accountType', title: 'Account Type'},
    {field: 'iban', title: 'IBAN'},
    {field: 'swiftCode', title: 'Swift Code'},
    {field: 'country.title', title: 'Country of Issuance'},
    {field: 'effectivityDate', title: 'Effectivity Date'},
    {field: 'isPrimaryAccount', title: 'Primary Account'},
];

const BankAccount: React.FC<PersonnelBankAccountProps> = () => {
    const dispatch = useDispatch();
    const [isOpen, setIsOpen] = React.useState(false);
    const [selected, setSelected] = React.useState<PersonnelBankAccount>();
    const [country, setCountry] = React.useState<Country>();
    const [varIsPrimary, setIsPrimary] = React.useState(false);

    const [
        personnelBankAccountDetail,
        setPersonnelBankAccountDetail,
    ] = React.useState<PersonnelBankAccount>(newBankAccount());
    
    const personnelBankAccountReducer = useSelector(
        (state: RootState) => state.personnelBankAccountReducer,
    )

    const tempIds = React.useMemo(() => personnelBankAccountReducer.current?.map(x => x.tempId), [
        personnelBankAccountReducer.current,
    ]);

    const formikRef = React.useRef<FormikProps<PersonnelBankAccount>>(null);

    const handleAdd = () => {
        setPersonnelBankAccountDetail(newBankAccount(tempIds));
        setCountry(undefined);
        setIsOpen(true);
    };

    const handleClose = () => {
        setPersonnelBankAccountDetail(newBankAccount(tempIds));
        setIsOpen(false);
    };

    const handleDelete = () => {
        if (!selected) return;
        dispatch(removePersonnelBankAccount(selected));
        setSelected(undefined);
    };

    const handleDrawerSubmit = () => {
        formikRef.current?.handleSubmit();
    };

    const handleEdit = () => {
        if (!selected) return;
        
        setCountry(selected.country);
        setIsPrimary(selected.isPrimaryAccount);
        setPersonnelBankAccountDetail(selected);
        setIsOpen(true);
    };

    const handleFormikSubmit = (value: PersonnelBankAccount) => {
        const action = tempIds?.indexOf(value.tempId) === -1
            ? addPersonnelBankAccount
            : updatePersonnelBankAccount;
            
        value.isPrimaryAccount = varIsPrimary;
        value.country = country;
        dispatch(action(value));
    
        setIsOpen(false);
    };

    const handleCountryOnChange = (value: Country) => {
        setCountry(value);
    } 
    
    React.useEffect(() => {
       setPersonnelBankAccountDetail(newBankAccount(tempIds));
      }, [personnelBankAccountReducer, tempIds]);

    return(
        <>
            <Heading title="Bank Account" />
            <div className="p-2">
                <FsxDrawer
                    title="Personnel Bank Account"
                    isOpen={isOpen}
                    onClose={handleClose}
                    unMountChildren={true}
                    onSubmit={handleDrawerSubmit}
                >
                    <div className="flex flex-1 flex-col w-full py-4 px-8">
                        <Formik
                            enableReinitialize={true}
                            initialValues={personnelBankAccountDetail}
                            validateOnChange={false}
                            onSubmit={handleFormikSubmit}
                            innerRef={formikRef}
                        >
                        <div className="grid sm:grod-cols-1 md:grid-cols-3 lg:grid-cols-1 gap-2">
                            
                            <FsxFormikInput label="Account Holder Name:" name="accountHolderName" type="text" />
                            <FsxFormikInput label="Bank Name:" name="bankName" type="text" />
                            <FsxFormikInput label="Bank Address:" name="bankAddress" type="text" />
                            <FsxFormikInput label="Account Number:" name="accountNumber" type="text" />
                            <FsxFormikInput label="Account Type:" name="accountType" type="text" />
                            <FsxFormikInput label="IBAN:" name="iban" type="text" />
                            <FsxFormikInput label="Swift Code:" name="swiftCode" type="text" />
                            {/* <CountryDropdown isFormik onChange={(e) => handleCountryOnChange(e.value)}  /> */}
                            <CountriesDropdown label="Country: " name="countryId" onChange={(e) => handleCountryOnChange(e.value)} required filterable />
                            <FsxFormikDatePicker
                                label="Effectivity Date:" 
                                name={`effectivityDate`}
                                format={FSXDateFormat.Default}
                            />
                            <Checkbox
                                checked={varIsPrimary}
                                text="Set as Primary Account"
                                onChange={() => setIsPrimary(!varIsPrimary)}
                            />
                        </div>
                        </Formik>
                    </div>
                </FsxDrawer>

                <FsxTable
                    data={personnelBankAccountReducer.current}
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

export default React.memo(BankAccount);
