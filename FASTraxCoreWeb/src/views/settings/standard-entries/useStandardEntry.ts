import React from 'react';
import useEditHook from '@app/hooks/useAddEditHook';
import {RadialItem} from '@app/store/app/types';
import {useRadialMenu} from '@app/hooks/useRadialMenu';
import {Grid} from '@progress/kendo-react-grid';
import {DataResult} from '@progress/kendo-data-query';

export const useStandardEntry = <T extends {id: number; selected?: boolean} & unknown>(
  gridRef: React.RefObject<Grid>,
  key: string,
  Uri: string,
  onBeforeAdd: Function,
  onBeforeEdit: Function,
  onAfterSubmit?: Function,
) => {
  const [initialValue, setInitialValue] = React.useState<T>();
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const radialMenu = useRadialMenu({rerenderDelayMS: 100});
  const crudURI = React.useMemo(() => {
    if (!initialValue) return '';

    if (initialValue.id === 0) return Uri;
    else return `${Uri}/${initialValue.id}`;
  }, [initialValue, setInitialValue]);

  const [addEditFunc] = useEditHook<T>(crudURI, key);

  const handleAdd = React.useCallback(() => {
    onBeforeAdd();
    setIsOpen(true);
  }, [initialValue]);

  const handleEdit = React.useCallback(() => {
    if (!gridRef.current) return;
    if (!gridRef.current.props.data) alert("No Item's to Edit");

    const arrData = gridRef.current.props.data as DataResult;
    const currentSelected = arrData.data.filter(item => item.selected);
    setInitialValue(currentSelected && currentSelected[0]);

    onBeforeEdit();
    setIsOpen(true);
  }, [initialValue]);

  const handleSubmit = React.useCallback(
    
    (values: T) => {
      addEditFunc(values);

      if (onAfterSubmit) onAfterSubmit();

      setIsOpen(false);
      console.log(initialValue)
    },
    [initialValue],
    );
   

  React.useEffect(() => {
    const radialItems: RadialItem[] = [
      {onClick: handleAdd, icon: 'add', title: 'Add'},
      {onClick: handleEdit, icon: 'edit', title: 'Edit'},
    ];

    radialMenu.generate(radialItems);
    /* eslint-disable react-hooks/exhaustive-deps */
  }, [radialMenu]);

  return React.useMemo(() => {
    return {isOpen, setIsOpen, initialValue, setInitialValue, handleSubmit};
  }, [isOpen, setIsOpen, initialValue, setInitialValue, handleSubmit]);
};
