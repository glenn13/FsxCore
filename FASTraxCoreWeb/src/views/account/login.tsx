import * as Yup from 'yup';

import {Block, Button, Checkbox, Content, FsxInput} from '../../components/common';
import {ConnectedProps, connect, useDispatch, useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';
import React, {useEffect} from 'react';
import {RootState, StoreDispatch} from '../../store/rootReducer';

import {ILoginRequest} from '../../helpers/api.endpoints';
import {ImageResources} from '../.././assets';
import Layout from '../../components/layout';
import {StringKeyValuePair} from '../../helpers/types';
import Toast from '@app/components/common/Alert/Toast';
import {authenticateUser} from '../../store/catalog/users/actions';
import mySvg from '../.././assets/images/split-screen7.svg';
import {setStatus} from '@app/store/common/status.reducer';
import styled from 'styled-components';
import {useAppStore} from '../../providers/app.store';
import GDPR from './GDPR';
import {decryptMe} from '@app/utils/encryption.util';
import {RequestHeader} from '@app/entities/RequestHeader';

const FormWrapper = styled.div`
  display: inline-block;
  background-color: white;
  padding: 40px;
  //  box-shadow: 0 8px 15px -9px #dedede;
  min-width: 450px;
`;

interface IFormRowProps {
  center?: boolean;
  paddingBottom?: number;
  paddingTop?: number;
}

/**
 * INFO: FIXED PROPER SETTINGS OF STYLE PROPERTIES
 */
const FormRow = styled.div<IFormRowProps>`
  display: block;
  text-align: ${props => (props.center ? 'center' : '')};
  padding-top: ${props => (props.paddingTop ? `${props.paddingTop}px` : '')};
  padding-bottom: ${props => (props.paddingBottom ? `${props.paddingBottom}px` : '15px')};
`;

const mapDispatch = (dispatch: StoreDispatch) => ({
  authenticate: (payload: ILoginRequest) => dispatch(authenticateUser(payload)),
});

const connector = connect(null, mapDispatch);

type ReduxProps = ConnectedProps<typeof connector>;

interface LoginProps extends ReduxProps {}

const schema = Yup.object().shape({
  username: Yup.string().required('Username is required'),
  password: Yup.string().required('Password is required'),
});

type Form = ILoginRequest & StringKeyValuePair<string | boolean>;

export const Login: React.FC<LoginProps> = ({authenticate}) => {
  const history = useHistory();
  const {setAuthenticated} = useAppStore();
  const [errors, setErrors] = React.useState<Form>({username: '', password: '', isPersistent: false});
  const [form, setForm] = React.useState({username: '', password: '', isPersistent: false});
  const [isLoading, setIsLoading] = React.useState(false);
  const dispatch = useDispatch();
  const {status} = useSelector((state: RootState) => {
    return {
      status: state.status,
    };
  });
  
  const requestHeaders = decryptMe<RequestHeader>(localStorage.getItem('X-HEADERS') || '');
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    schema
      .validate(form, {abortEarly: false})
      .then(() => {
        setIsLoading(true);
        authenticate(form)
          .then(response => {
            if (!response) return;

            setAuthenticated();
          })
          .catch((err: any) => {
            setTimeout(() => {
              if (err.message.includes('Network Error'))
                dispatch(setStatus('Unable to connect to api.'));
              else if (err.response.status == 403) {
                alert(err.response.data?.error || err.response.data);
                history.push(`/account-verification?sessionId=${requestHeaders.sessionId}`)
              }
              else dispatch(setStatus(err.response.data?.error || err.response.data));
            }, 300);
          })
          .finally(() => setTimeout(() => setIsLoading(false), 300));
      })
      .catch(err => {
        const newError: Form = {username: '', password: '', isPersistent: false};
        err.inner.forEach((ex: Yup.ValidationError) => (newError[ex.path] = ex.errors[0]));
        setErrors(newError);
      });
  };

  const handleClose = () => dispatch(setStatus(''));

  useEffect(() => {
    return () => {
      dispatch(setStatus(''));
    };
  }, [dispatch]);

  return (
    <Layout isDefault={false}>
      <Content>
        <Block flex wrapFlex grow style={{height: '100%'}}>
          <Block
            grow
            id="login-split-left"
            style={{
              backgroundImage: `url(${mySvg})`,
            }}>
            <div className="login-screen-logo-wrapper">
              <img alt="Fastrax White" src={ImageResources.FastraxWhite} id="login-screen-logo" />
            </div>
          </Block>
          <Block inlineFlex grow center middle style={{backgroundColor: '#ffffff'}}>
            <FormWrapper>
              {status !== '' && (
                <Toast
                  title="System Notification"
                  message={status}
                  type="danger"
                  position="top-right"
                  onClose={handleClose}
                />
              )}
              <form onSubmit={handleSubmit}>
                <FormRow paddingBottom={80} center>
                  <img alt="Fastrax" src={ImageResources.Fastrax} id="login-fsx-logo" />
                </FormRow>
                <FormRow>
                  <FsxInput
                    name="username"
                    placeholder="Username"
                    oval
                    onChange={e => setForm({...form, username: e.value})}
                    value={form.username}
                  />
                  {errors.username && <div className="errorMessage">{errors.username}</div>}
                </FormRow>
                <FormRow>
                  <FsxInput
                    name="password"
                    type="password"
                    placeholder="Password"
                    oval
                    onChange={e => setForm({...form, password: e.value})}
                    value={form.password}
                  />
                  {errors.password && <div className="errorMessage">{errors.password}</div>}
                </FormRow>

                <FormRow paddingTop={10}>
                  <Checkbox text="Keep me signed in" checked={form.isPersistent} onChange={e => setForm({...form, isPersistent: e.target.checked})} />
                </FormRow>

                <FormRow>
                  <Button block oval shadow ripple loading={isLoading}>
                    Login
                    <i className=""></i>
                  </Button>
                </FormRow>
              </form>

              <FormRow center paddingTop={30}>
                {/* <Link to="/">Terms and Condition</Link> */}
              </FormRow>
              <FormRow center paddingTop={30} id="login-footer">
                <div>© Copyright 2019.</div>
                <div>All rights reserved.</div>
              </FormRow>
            </FormWrapper>
          </Block>
        </Block>
        <GDPR />
      </Content>
    </Layout>
  );
};

export default connector(Login);
