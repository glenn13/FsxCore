import {useRadialMenu} from '@app/hooks/useRadialMenu';
import {useFormikContext} from 'formik';
import React from 'react';
import {useHistory} from 'react-router-dom';

export const FsxFormikRadialNewItemMenu = () => {
  const {submitForm} = useFormikContext();
  const radialMenu = useRadialMenu({rerenderDelayMS: 100});
  const history = useHistory();
  React.useEffect(() => {
    radialMenu.generate([
      {
        icon: 'check',
        title: 'Save',
        onClick: () => {
          submitForm();
        },
      },
      {icon: 'cross', title: 'Cancel', onClick: () => history.goBack()},
      {icon: 'save-print', title: 'Save & Print'},
    ]);
  }, [history, radialMenu, submitForm]);

  return null;
};

export default FsxFormikRadialNewItemMenu;
