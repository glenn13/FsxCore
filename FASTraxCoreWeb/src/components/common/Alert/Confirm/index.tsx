import Swal, {SweetAlertIcon} from 'sweetalert2';

import withReactContent from 'sweetalert2-react-content';

interface AlertConfirmOptions {
  html?: string;
  icon?: SweetAlertIcon;
  text?: string;
  title?: string | HTMLElement;
  onConfirm?: () => void;
  onCancel?: () => void;
  showCancelButton?: boolean;
  confirmButtonText?: string;
}

/**
 * Component for showing beautiful modal alert.
 * @param options Alert confirm options
 */
const Confirm = (options: AlertConfirmOptions = {title: 'Confirm Action'}) => {
  const {onConfirm, ...rsaOptions} = options;

  const ConfirmMixin = Swal.mixin({
    position: 'top',
    showCancelButton: options.showCancelButton,
    confirmButtonText: options.confirmButtonText ? options.confirmButtonText : 'Confirm',
    reverseButtons: true,
    showClass: {
      popup: 'animated zoomIn faster',
    },
    customClass: {
      popup: 'fsx-alert-confirm fsx-alert-container',
      confirmButton: 'fsx-alert-confirm-button',
      cancelButton: 'fsx-alert-cancel-button',
      title: 'fsx-alert-title',
      header: 'fsx-alert-header',
      icon: 'fsx-alert-icon',
    },
    padding: '8px',
  });

  const ConfirmAlert = withReactContent(ConfirmMixin);

  ConfirmAlert.fire({...rsaOptions}).then(result => {
    if (result.isConfirmed) onConfirm && onConfirm();

    if (result.dismiss === Swal.DismissReason.cancel) options.onCancel && options.onCancel();
  });
};

export default Confirm;
