import React from 'react';
import LeaveAllowanceChart from './leaveAllowanceChart';
import PersonnelIformationForm from './personnelInformationForm';
import PersonnelTabs from './Tabs';
import PersonnelLeaveArrangement from './personnelLeaveArrangement';

export interface PersonnelInformationProps {
    isEdit: boolean;
}

const PersonnelInformation: React.FC<PersonnelInformationProps> = ({isEdit}) => {

    return (
       
        <>
            <div className="h-full"> 
                <div className="flex flex-col h-full">
                    <LeaveAllowanceChart />
                    

                    <div className="grid flex-1 grid-cols-4 gap-4">

                        <div className="p-4 bg-white rounded shadow-lg col-span-full lg:col-span-3">
                            <PersonnelIformationForm  />
                        </div>
                        <div className="p-4 bg-white rounded shadow-lg col-span-full lg:col-span-1">
                            <PersonnelLeaveArrangement />

                        </div>
                    </div>

                    <PersonnelTabs />
                    <div className="grid flex-1 grid-cols-3 gap-4">
                    </div>
                </div>
            </div>
        </>
    );
};

export default React.memo(PersonnelInformation);
