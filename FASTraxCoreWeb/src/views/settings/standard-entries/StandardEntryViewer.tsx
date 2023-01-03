import React from 'react';
import {TransitionWrapper} from '@app/components/common';

import {Assets, Maintenance, Finance, HumanResource, CRM, Stock} from './standard.component.lists';

export interface IStandardEntryViewerProps {
  standardEntryName: string;
}

const componentsMap: any = {
  ...Assets,
  ...Maintenance,
  ...Finance,
  ...HumanResource,
  ...CRM,
  ...Stock,
};

const StandardEntryViewer: React.FC<IStandardEntryViewerProps> = ({
  standardEntryName,
  ...props
}) => {
  const name = standardEntryName.replace(/(?:[ -])/g, '').replace(/^[^*]/g, x => x.toLowerCase());
  if (typeof componentsMap[name] === 'undefined') return <></>;

  const DynamicComponent = componentsMap[name];
  return (
    <TransitionWrapper className="flex flex-1 flex-col h-full">
      <DynamicComponent />
    </TransitionWrapper>
  );
};

export default React.memo(StandardEntryViewer);
