import React, {useEffect, useState} from 'react';
import {FsxFormikInput} from '@app/components/common/FsxFormik';
import {Checkbox, CheckboxChangeEvent} from '@progress/kendo-react-inputs';
import PasswordGenerator from './User.PasswordGenerator';
import {useField, useFormikContext} from 'formik';
import {useSelector, shallowEqual} from 'react-redux';
import {RootState} from '@app/store/rootReducer';

interface IUserCredentialProps {}

const UserCredential: React.FC<IUserCredentialProps> = props => {
  const [isGenerate, setIsGenerate] = useState(false);

  const {setFieldValue, isSubmitting: formIsSubmittting, values} = useFormikContext();
  const [userId] = useField('id');
  const [userPassword] = useField('password');
  const [passwordValue, setPasswordValue] = useState('');
  const user = useSelector((state: RootState) => state.users.current, shallowEqual);
  const isVisiblePass = user?.isAdmin || user?.isSuperAdmin;

  useEffect(() => {
    setFieldValue('oldPassword', userPassword.value);
  }, []);

  useEffect(() => {
    if (!formIsSubmittting) return;

    setFieldValue('password', isVisiblePass ? passwordValue : userPassword.value);
  }, [formIsSubmittting]);

  const onCheckChange = (event: CheckboxChangeEvent) => {
    const checked = event.syntheticEvent.currentTarget.checked;

    if (!checked) setPasswordValue('');

    setIsGenerate(checked);
  };

  const handleOnInputChange = React.useCallback((event: any) => {
    setPasswordValue(event.target.value);
  }, []);

  return (
    <div className="flex px-10 py-5 pb-10 w-full">
      <div className="w-full md:w-3/4">
        <div className="flex">
          <div className="w-col w-full">
            <FsxFormikInput
              label="Username"
              name="username"
              type="text"
              required
              className="mb-3"
            />
            {isVisiblePass && (
              <>
                {!isGenerate ? (
                  <>
                    {userId.value === 0 ? (
                      <FsxFormikInput
                        label="Password"
                        name="password"
                        type="password"
                        value={passwordValue || ''}
                        onChange={handleOnInputChange}
                      />
                    ) : (
                      <>
                        <FsxFormikInput
                          label="Password"
                          name="password"
                          type="password"
                          value={passwordValue || ''}
                          onChange={handleOnInputChange}
                        />
                      </>
                    )}
                  </>
                ) : (
                  <FsxFormikInput
                    label="Password"
                    name="password"
                    type="text"
                    readOnly={isGenerate}
                    onChange={handleOnInputChange}
                    value={passwordValue}
                  />
                )}
              </>
            )}
            {/* <FsxFormikInput
              label="Password"
              name="password"
              type="text"
              required
              readOnly={isGenerate}
              onChange={handleOnInputChange}
              value={passwordValue}
            /> */}

            {isVisiblePass && (
              <div className="mt-5">
                <span className="pr-4">
                  <Checkbox checked={isGenerate} onChange={onCheckChange} />
                </span>
                <label>Generate Password</label>
              </div>
            )}
          </div>
          <div className="w-col w-full">
            <div className="lg:pl-24">
              {isGenerate && <PasswordGenerator setPassword={setPasswordValue} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(UserCredential);
