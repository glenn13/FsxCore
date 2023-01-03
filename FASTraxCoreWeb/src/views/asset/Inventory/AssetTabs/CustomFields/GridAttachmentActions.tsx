import React from 'react';
import styled from 'styled-components';
import GridAttachmentAction from './GridAttachmentAction';

const ActionWrapperStyled = styled.div`
  display: flex;
  flex-direction: row;
  background: #fbfcfd;
  padding: 6px 15px;
  border: 1px solid rgba(0, 0, 0, 0.08);
`;

export interface GridAttachmentActionsProps {
  onAdd?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  onExport?: () => void;
}

const GridAttachmentActions: React.FC<GridAttachmentActionsProps> = ({
  onAdd,
  onEdit,
  onDelete,
  onExport,
}) => {
  return (
    <ActionWrapperStyled>
      <GridAttachmentAction onClick={onAdd}>Add</GridAttachmentAction>
      <GridAttachmentAction onClick={onEdit}>Edit</GridAttachmentAction>
      <GridAttachmentAction onClick={onDelete}>Delete</GridAttachmentAction>
      <GridAttachmentAction onClick={onExport}>Export</GridAttachmentAction>
    </ActionWrapperStyled>
  );
};

export default React.memo(GridAttachmentActions);
