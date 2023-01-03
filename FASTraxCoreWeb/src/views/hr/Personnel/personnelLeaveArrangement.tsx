import React, {Suspense} from 'react';
import Heading from '@app/views/common/Heading';

const PersonnelLeaveArrangement = () => {
    return (
        <>
            <Heading title="Leave Arrangement" />
            
            <div className="grid flex-1 grid-cols-3">
                <div className="p-2 col-span-full lg:col-span-2">
                    Leave Entitlement (Day)
                </div>
                <div className="p-2 col-span-full lg:col-span-1" style={{textAlign: 'right'}}>
                    00
                </div>
            </div>
            <div className="grid flex-1 grid-cols-3">
                <div className="p-2 col-span-full lg:col-span-2">
                    Holiday Rotation (Days)
                </div>
                <div className="p-2 col-span-full lg:col-span-1" style={{textAlign: 'right'}}>
                    00
                </div>
            </div>
            <div className="grid flex-1 grid-cols-3">
                <div className="p-2 col-span-full lg:col-span-2">
                    Leave Days per Travel
                </div>
                <div className="p-2 col-span-full lg:col-span-1" style={{textAlign: 'right'}}>
                    00
                </div>
            </div>
            <div className="grid flex-1 grid-cols-3">
                <div className="p-2 col-span-full lg:col-span-2">
                    Adjustment in Days for Travel
                </div>
                <div className="p-2 col-span-full lg:col-span-1" style={{textAlign: 'right'}}>
                    00
                </div>
            </div>
            <div className="grid flex-1 grid-cols-3 mb-4">
                <div className="p-2 col-span-full lg:col-span-2">
                    Provided Trips
                </div>
                <div className="p-2 col-span-full lg:col-span-1" style={{textAlign: 'right'}}>
                    00
                </div>
            </div>
            
            <Heading title="Alerts" />

            <div className="grid flex-1 grid-cols-3 gap-4">
                <div className="p-2 col-span-full lg:col-span-2">
                    Contract for Renewal
                </div>
                <div className="p-2 col-span-full lg:col-span-1" style={{textAlign: 'right'}}>
                    00
                </div>
            </div>
            <div className="grid flex-1 grid-cols-3 gap-4">
                <div className="p-2 col-span-full lg:col-span-2">
                    Document for Renewal
                </div>
                <div className="p-2 col-span-full lg:col-span-1" style={{textAlign: 'right'}}>
                    00
                </div>
            </div>
            <div className="grid flex-1 grid-cols-3 gap-4 mb-3">
                <div className="p-2 col-span-full lg:col-span-2">
                    Scheduled Vaccination
                </div>
                <div className="p-2 col-span-full lg:col-span-1" style={{textAlign: 'right'}}>
                    03
                </div>
            </div>
          <div className="flex flex-col mb-3"> </div>
        </>
    );
};

export default PersonnelLeaveArrangement;
