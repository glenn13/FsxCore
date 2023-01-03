import React from 'react';
import {FsxFormikTextArea} from '@app/components/common/FsxFormik';

export interface DispositionJustificationProps {
  isReadOnly: boolean;
}

const DispositionJustification: React.FC<DispositionJustificationProps> = ({isReadOnly}) => {
  return (
    <>
      <div className="flex flex-col h-40 my-4">
        <FsxFormikTextArea
          name={`dispositionVehicleJustification.justification`}
          label="Justification :"
          className="flex-grow"
          disabled={isReadOnly}
        />
      </div>
    </>
  );
};

export default React.memo(DispositionJustification);
