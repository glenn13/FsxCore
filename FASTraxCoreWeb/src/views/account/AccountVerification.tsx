import React from 'react';
import {FsxInput, Content, Button, SvgIcon} from '@app/components/common'
import Toast from '@app/components/common/Alert/Toast';
import Layout from '@app/components/layout'
import styled from 'styled-components';
import validator from 'validator';
import {InputChangeEvent} from '@progress/kendo-react-inputs';
import {submitVerificationCode} from '@app/store/catalog/users/actions'
import defaultTheme from '@app/theme/presets/base';
import {useDispatch} from 'react-redux';
import { useHistory} from 'react-router-dom';
import {ImageResources} from '@app/assets';

type ColorsType = typeof defaultTheme.color;

const FormVerification = styled.div`
    border-top: 5px solid #f1b819;
    background: #fff;
    height: 400px;
    border-radius: 5px;
`;


const FormVerificationInputWrapper = styled.div`
    padding: 0 20%;
    align-items: center;
    justify-content: center;
    display: flex;
    flex-direction: column;

    input {
        font-size: 1.5rem !important;
        font-weight: 400 !important;
        letter-spacing: 1.2rem;
        text-align: center;
    }
`;

const ImageWrapper = styled.img`
margin: 17px auto 12px;
height: 6.4em;
`

interface StatusAlert {
    message: string;
    type: keyof ColorsType;
}

export const AccountVerficiation: React.FC<{}> = ({}) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const query = new URLSearchParams(window.location.search);
    const sessionId = query.get("sessionId") as string;

    const [status, setStatus] = React.useState<StatusAlert>({message: "", type: "info"})
    const [verificationCode, setVerificationCode] = React.useState<string>("");

    const handleKeyPress = (e: any) => !validator.isNumeric(e.key) && e.preventDefault();
    
    const handleSubmitCode = React.useCallback(() => {
        submitVerificationCode({ verificationCode, sessionId }).then(response => {
            if(response.data.verified){
                setStatus({message: response.data.message, type: "info"});
                setTimeout(() => {
                        history.push('/');
                  }, 3000)
            }
        }).catch(err => {
            setTimeout(() => {
                setStatus({message: err.response.data?.error || err.response.data, type: "danger"});
              }, 300)
        } );
    }, [verificationCode]);

  return (
    <Layout>
        <Content className="flex flex-col flex-grow items-center justify-center">
            <>
            {status.message !== '' && (
                <Toast
                  title="System Notification"
                  message={status.message}
                  type="danger"
                  position="top-center"
                  onClose={() => setStatus({message: "", type: "info"})}
                />
              )}

            <div style={{width: 455}} className="card-box p-0">
                <FormVerification>
                    <ImageWrapper src={ImageResources.Verification} />
                    <h1 className="pb-3 text-2xl text-gray-700 font-medium text-center">Verify your Account Identity</h1>
                    <small className="font-light text-base text-gray-700 block px-8 py-5">For you to be able to redirected to Page, we would like you enter the verification code. Code was sent to your registered email.</small>
                    <FormVerificationInputWrapper>
                        <FsxInput name="verificationCode" autoComplete="off" maxLength={6} onKeyPress={handleKeyPress} onChange={(event : InputChangeEvent) => setVerificationCode(event.value)} onPasteCapture={e => e.preventDefault()}/>
                        <Button
                        rounded
                        ripple
                        shadow
                        className="mt-8" onClick={() => handleSubmitCode()}>
                            <SvgIcon size={14} color="#fff" svgId="check" style={{marginRight: 8}} />
                            Submit Code
                        </Button>
                    </FormVerificationInputWrapper>
                </FormVerification>
            </div>
            </>
        </Content>
 
    </Layout>
  );
};

export default AccountVerficiation;
