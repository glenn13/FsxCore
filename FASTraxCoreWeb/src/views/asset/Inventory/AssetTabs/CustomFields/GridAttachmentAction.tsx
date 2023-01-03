import React from 'react';

export type GridAttachmentActionProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {};

const GridAttachmentAction: React.FC<GridAttachmentActionProps> = ({onClick, children}) => {
  return (
    <button
      className="mr-1 text-white py-1 text-base flex-1 lg:flex-none lg:w-40 rounded-md"
      style={{backgroundColor: '#4f5761'}}
      onClick={onClick}
      type="button">
      {children}
    </button>
  );
};

export default React.memo(GridAttachmentAction);
