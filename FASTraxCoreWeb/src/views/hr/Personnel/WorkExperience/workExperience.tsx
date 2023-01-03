import React, {useState, Suspense} from 'react';

import WorkInformationForm from './workInformationForm';
import OtherClearance from './tab.PersonnelWorkOtherClerance.Index';
import WorkHistory from './workHistory';
import PersonnelWorkPermit from './tab.WorkPermit.Index';
import PersonnelWorkVisa from './tab.PersonnelWorkVisa.Index';

const WorkExperience = () => {


    return (  
        <>  
            <div className="p-4 bg-white rounded shadow-lg col-span-full lg:col-span-2">
                <WorkInformationForm />
                <div className="w-full mb-8" />
                <PersonnelWorkPermit />
                <div className="w-full mb-8" /> 
                <PersonnelWorkVisa />
                <div className="w-full mb-8" />
                <OtherClearance />
                <div className="w-full mb-8" />
                <WorkHistory />

            </div>
        </>
    );




};

export default WorkExperience;
