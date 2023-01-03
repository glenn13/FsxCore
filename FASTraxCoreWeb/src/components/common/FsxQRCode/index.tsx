import React, { useState } from "react";
 
import { FsxModal } from "@app/components/common";
import {useField, useFormikContext} from 'formik';
import QRCode from "qrcode.react";
 
export interface FsxQRCodeProps {
        value: string
}
 
const FsxQRCode: React.FC<FsxQRCodeProps> = ({value, ...props}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
 
  return (
    <div>
      <FsxModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="QR Code">
        <div className="py-2 px-24">
          <QRCode value={value} size={380}/>
        </div>
      </FsxModal>
 
        <button type='button' onClick={() => setIsModalOpen(!isModalOpen)} 
                className="bg-gray-800 hover:bg-gray-900 text-white py-2 px-12 rounded">Print QR Code
        </button>
    </div>
  );
};
 
export default FsxQRCode;