import React from 'react';
import {FsxInput} from '@app/components/common';
import AssignedTo from '@app/entities/types/AssignedTo';

export interface AssetAssignedPersonnelProps {
  assignedTo: AssignedTo;
}

const AssetAssignedPersonnel: React.FC<AssetAssignedPersonnelProps> = ({
  assignedTo: {name, department, contactNo, email},
}) => {
  return (
    <>
      <label className="text-2xl uppercase mt-8">Assigned Personnel</label>
      <div className="grid grid-cols-1 gap-x-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <FsxInput value={name} label="Assigned Person:" disabled />
        <FsxInput value={department} label="Assigned Department:" disabled />
        <FsxInput value={contactNo} label="Contact No.:" disabled />
        <FsxInput value={email} label="Email Address:" disabled />
      </div>
    </>
  );
};

export default React.memo(AssetAssignedPersonnel);
