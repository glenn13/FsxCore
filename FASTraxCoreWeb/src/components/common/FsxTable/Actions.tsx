import FsxTableAction from './Action';
import React from 'react';
import styled from 'styled-components';

export const ActionWrapperContainer = styled.div``;
export const ActionWrapperStyled = styled.div`
  display: flex;
  flex-direction: row;
  background: #fbfcfd;
  padding: 6px 15px;
  border: 1px solid rgba(0, 0, 0, 0.08);
`;

export interface FsxTableActionsProps {
  onAdd?: () => void;
  onEdit?: () => void;
  onView?: () => void;
  onDelete?: () => void;
  onExport?: () => void;
  children?: React.ReactNode;
  isReadOnly?: boolean;
}

const FsxTableActions: React.FC<FsxTableActionsProps> = ({
  onAdd,
  onEdit,
  onView,
  onDelete,
  onExport,
  children,
  isReadOnly,
}) => {

  return (    
    <ActionWrapperContainer>
      {!isReadOnly && (
        <ActionWrapperStyled>
          {onAdd && <FsxTableAction label="Add" onClick={onAdd} />}
          {onEdit && <FsxTableAction label="Edit" onClick={onEdit} />}
          {onView && <FsxTableAction label="View" onClick={onView} />}
          {onDelete && <FsxTableAction label="Remove" onClick={onDelete} />}
          {onExport && <FsxTableAction label="Export" onClick={onExport} />}
          {children}
        </ActionWrapperStyled>
      )}
    </ActionWrapperContainer>
  );
};

export default React.memo(FsxTableActions);
