import {useCallback, useState} from 'react';

export interface UseDisclosureProps {
  /**
   * Set default initial state to open.
   */
  defaultIsOpen?: boolean;
  /**
   * Call back to fire on close event.
   */
  onClose?: () => void;
  /**
   * Call back to fire on open event.
   */
  onOpen?: () => void;
}

/**
 * Hooks helper for toggling is open and close actions.
 * @param props UseDisclosureProps
 */
function useDisclosure(props: UseDisclosureProps) {
  const {defaultIsOpen, onClose: onCloseProp, onOpen: onOpenProp} = props;

  const [isOpen, setIsOpen] = useState(defaultIsOpen || false);

  const onClose = useCallback(() => {
    setIsOpen(false);
    onCloseProp?.();
  }, [onCloseProp]);

  const onOpen = useCallback(() => {
    setIsOpen(true);
    onOpenProp?.();
  }, [onOpenProp]);

  const onToggle = useCallback(() => {
    const action = isOpen ? onClose : onOpen;
    action();
  }, [isOpen, onClose, onOpen]);

  return {
    isOpen: !!isOpen,
    onOpen,
    onClose,
    onToggle,
  };
}

export default useDisclosure;
