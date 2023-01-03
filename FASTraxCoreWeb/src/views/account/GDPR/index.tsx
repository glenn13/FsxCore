import React from 'react';
import styled from 'styled-components';
import {TransitionWrapper, Button} from '@app/components/common';
import {Link} from 'react-router-dom';

const GDPRWrapper = styled(TransitionWrapper)`
  position: fixed;
  z-index: 9999;
  left: 0;
  bottom: 0;
  background: rgba(51, 51, 51, 0.9);
  padding: 15px 20%;
  line-height: 1.5;
  font-weight: 300;

  p {
    color: #a5a5a5;

    a {
      color: #fff;

      &:hover {
        text-decoration: underline;
        cursor: pointer;
      }
    }
  }

  button {
    white-space: nowrap;
  }
`;

export interface AcceptCookieType {
  accept?: boolean;
}

export const GDPR: React.FC<{}> = ({}) => {
  const KEY = 'ACCEPT-COOKIE';
  const acceptLocalData = JSON.parse(localStorage.getItem(KEY) || '{}') as AcceptCookieType;
  const [isHidden, setIsHidden] = React.useState<boolean>(acceptLocalData.accept || false);

  const handleAccept = () => {
    setIsHidden(!isHidden);
    localStorage.setItem(KEY, JSON.stringify({accept: true}));
  };

  return (
    <GDPRWrapper hidden={isHidden}>
      <div className="flex flex-row">
        <p className="flex-grow">
          This site uses cookies on your computer. These cookies are used to improve your website
          experience and provide more personalized services to you. By continuing on this site, you
          are consenting to AMS’s use of cookie policy. To learn more, see{' '}
          <Link to="/privacy-and-cookie-policy">AMS Privacy & Cookies Policy</Link> and{' '}
          <Link to="/terms-and-condition">AMS Terms and Conditions</Link>.
        </p>
        <div className="flex items-center lg:pl-8 flex-shrink">
          <Button ripple colorType="tertiary" oval onClick={e => handleAccept()}>
            I Accept
          </Button>
        </div>
      </div>
    </GDPRWrapper>
  );
};

export default GDPR;
