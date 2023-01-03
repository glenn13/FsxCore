// import * as React from 'react';
import React, {useState} from 'react';
import {TabStrip, TabStripTab} from '@progress/kendo-react-layout';
import Personnel from '@app/entities/hr/Personnel';
import {Form, Formik, FormikConfig} from 'formik';
import BankAccount from './tab.PersonnelBankAccount.Index';
import PersonnelInformation from './tab.PersonnelInformation.Index';
import PersonnelAddress from './tab.PersonnelAddress.Index';
import PersonnelIformationForm from './personnelInformationForm';
import PersonnelLeaveArrangement from './personnelLeaveArrangement';
import WorkExperience from './WorkExperience/workExperience';
import CustomFieldAttachment from './CustomFieldAttachment/tab.CustomFieldAttachment.Index';

export interface PersonnelTabsProps {}

const PersonnelTabs = () => {
    const [selected, setSelected] = React.useState(0);

    return (
        <TabStrip className="flex flex-1 m-2" selected={selected} onSelect={e => setSelected(e.selected)}>
            <TabStripTab title="Work Experience">
                <WorkExperience />
            </TabStripTab>
            <TabStripTab title="Personnel Information">

                    <div className="grid flex-1 grid-cols-2 gap-4">

                        <div className="p-4 col-span-full lg:col-span-2">
                                                        
                            <div className="grid flex-1 grid-cols-2 gap-4">

                                <div className="p-4 bg-white rounded shadow-lg col-span-full lg:col-span-1">
                                    <PersonnelInformation  />
                                </div>
                                <div className="p-4 bg-white rounded shadow-lg col-span-full lg:col-span-1">
                                    <PersonnelAddress />
                                </div>
                            </div>
                        </div>
                        <div className="p-4 bg-white rounded shadow-lg col-span-full lg:col-span-2">
                            <BankAccount />
                        </div>
                    </div>
        
            </TabStripTab>
            <TabStripTab title="Custom Fields & Attachment">
                <CustomFieldAttachment />
            </TabStripTab>
        </TabStrip>
    );
};

export default PersonnelTabs;
