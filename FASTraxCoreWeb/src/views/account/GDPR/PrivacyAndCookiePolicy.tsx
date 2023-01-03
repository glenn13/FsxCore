import React from 'react';
import styled from 'styled-components';
import {TransitionWrapper, Button} from '@app/components/common';
import {ImageResources} from '@app/assets';

const PrivacyAndCookiePolicyWrapper = styled(TransitionWrapper)`
  display: flex;
  flex-direction: column;
  justify-content: center;

  strong {
    font-weight: 500;
  }
`;

const TopBarStyled = styled.div`
  min-height: 80px;
  background: #333;
  display: flex;
  align-items: center;
`;

const HeaderStyled = styled.div`
  text-align: center;
  font-size: 22px;
  font-weight: 600;
  color: #464646;
  margin-top: 20px;
  margin-bottom: 50px;
`;

const LastUpdateStyled = styled.div`
  text-align: center;
  font-size: 13px;
  font-weight: 400;
  margin-top: 8px;

  span {
    padding: 4px 8px;
    background: #fff;
    font-size: 0.9em;
    border: 1px dashed rgba(0, 0, 0, 0.1);
    color: #a2a2a2;
  }

  &:after {
    display: block;
    content: '';
    margin: 0;
    border-bottom: 1px dashed rgba(0, 0, 0, 0.1);
    margin-top: -8px;
  }
`;

const TitleStyled = styled.div`
  font-weight: 300;
  margin-bottom: 8px;
  font-weight: 600;
  color: #464646;
`;

const ParagraphStyled = styled.p`
  font-weight: 300;
  margin-bottom: 15px;
  letter-spacing: 0.032em;
`;

const BulletedListStyled = styled.ul`
  list-style: disc;
  padding-left: 45px;

  li {
    padding-bottom: 3px;
  }
`;

export const PrivacyAndCookiePolicy: React.FC<{}> = ({}) => {
  return (
    <PrivacyAndCookiePolicyWrapper>
      <TopBarStyled>
        <img
          alt="Fastrax White"
          style={{height: 40, width: 'auto'}}
          src={ImageResources.FastraxWhite}
          id="login-screen-logo"
        />
      </TopBarStyled>
      <div className="flex flex-col items-center">
        <div className="container">
          <HeaderStyled>
            AMS Privacy &amp; Cookies Policy
            <LastUpdateStyled>
              <span>Last Updated: 21/06/2018</span>
            </LastUpdateStyled>
          </HeaderStyled>
          <ParagraphStyled>
            At AMS, we respect your need for online privacy and protect any Personal Information
            that you may share with us, in an appropriate manner and in compliance with applicable
            laws and regulations, including the General Data Protection Regulations (“GDPR”). Our
            practice with respect to use of your Personal Information is as set forth below in this
            Privacy & Cookies Policy.
          </ParagraphStyled>
          <div className="mb-5">
            <TitleStyled>Legal Disclaimer</TitleStyled>
            <ParagraphStyled>
              This Privacy & Cookies Policy (“Policy”) sets out the basis on which Automotive
              Management Services (“AMS” or “We / Us”) collects personal data from you and how it
              will be processed by Us when you use our website at
              http://www.automotivemanagementservices.com/ and/or http://www.ams.global (“Website”)
              or any of our services, or where We enter into any other business relationship with
              you. Please read the following carefully to understand our views and practices
              regarding your personal data and how we will treat it.
            </ParagraphStyled>
            <ParagraphStyled>
              By accessing AMS’s Website, you are agreeing to this Policy. Please note that the
              Policy may change from time to time at our sole discretion. The new version will be
              posted on our Website with the effective date of the amended version and you are
              encouraged to review it regularly.
            </ParagraphStyled>
          </div>
          <div className="mb-5">
            <TitleStyled>Definitions</TitleStyled>
            <ParagraphStyled>
              <strong>Personal Data</strong> is any information relating to an identified or
              identifiable natural person (‘Data Subject’); an identifiable natural personal is one
              who can be identified, directly or indirectly, in particular by reference to an
              identifier such as a name, an identification number, location data, an online
              identifier or to one or more factors specific to the physical, physiological, genetic,
              mental, economic, cultural, or social identity of that natural person (voice, photo,
              etc.)
            </ParagraphStyled>
            <ParagraphStyled>
              Data Subject is a living individual to whom personal data relates.
            </ParagraphStyled>
            <ParagraphStyled>
              Consent of the Data Subject means any freely given, specific, informed, and
              unambiguous indication of the Data Subject’s wishes.
            </ParagraphStyled>
            <ParagraphStyled>
              Data Controller means the natural or legal person, public authority, agency or other
              body which, alone or jointly with others, determines the purposes and means of the
              processing of personal data.
            </ParagraphStyled>
          </div>

          <div className="mb-5">
            <TitleStyled>Who We Are</TitleStyled>
            <ParagraphStyled>
              For the purpose of this Policy and in compliance with GDPR, AMS is a “Data Controller”
              of the personal information.
            </ParagraphStyled>
          </div>

          <div className="mb-5">
            <TitleStyled>How We Collect Your Data</TitleStyled>
            <ParagraphStyled>
              We collect personal information from you when you give us your contacts via web forms
              on the Website, when you get in contact with us via email or when you otherwise
              correspond with us (e.g. by standard mail to our company address, social networks
              pages, telephone calls, personal contact, business meetings and other similar
              situations).
            </ParagraphStyled>
          </div>
          <div className="mb-5">
            <TitleStyled>Categories of Data Collected</TitleStyled>
            <ParagraphStyled>
              Personal Data: Information and documentation relating to your identity, location,
              family, employment background and financial details. Information may also be obtained
              from sources available in the public domain.
            </ParagraphStyled>
            <ParagraphStyled>
              We may use your Personal Data to contact you with newsletters, marketing or
              promotional materials and other information that may be of interest to you. You may
              opt out of receiving any, or all, of these communications from us by following the
              unsubscribe link or instructions provided in any email we send.
            </ParagraphStyled>
            <ParagraphStyled>
              Usage Data: We may also collect information how the Website is accessed and used. This
              Usage Data may include information such as your computer's Internet Protocol address
              (e.g. IP address), browser type, browser version, the pages of our Service that you
              visit, the time and date of your visit, the time spent on those pages, unique device
              identifiers and other diagnostic data.
            </ParagraphStyled>
          </div>
          <div className="mb-5">
            <TitleStyled>Information That We Collect</TitleStyled>
            <ParagraphStyled>
              The following non-exhaustive list includes the types of personal data that we may
              collect about you and, in some circumstances, your spouse, civil partner, partner or
              dependents:
            </ParagraphStyled>
            <ParagraphStyled>
              <BulletedListStyled>
                <li>Full name,</li>
                <li>Address and contact details;</li>
                <li>Date of birth;</li>
                <li>Gender; </li>
                <li>Nationality;</li>
                <li>Marital (or relationship) status;</li>
                <li>Passport, ID number;</li>
                <li>Details of bank account;</li>
                <li>Job title, company’s name;</li>
                <li>Other information contained in your Resume;</li>
                <li>Insurance Number</li>
                <li>Tax Identification Number</li>
                <li>We will keep a record of our correspondence with you;</li>
                <li>
                  Details of your visits to the Website including, but not limited to, traffic data,
                  location data, weblogs and other communication data, and the resources that you
                  access;
                </li>
                <li>
                  We may also ask you to complete surveys that We use for research purposes,
                  although you do not have to respond to the
                </li>
              </BulletedListStyled>
            </ParagraphStyled>
          </div>
          <div className="mb-5">
            <TitleStyled>Purpose of Processing your Data</TitleStyled>
            <ParagraphStyled>
              AMS will process your data for the following purposes:
            </ParagraphStyled>
            <ParagraphStyled>
              <BulletedListStyled>
                <li>In assessment of potential vendors;</li>
                <li>In the performance of the contract We have entered into with you;</li>
                <li>For vendors’ performance evalua;</li>
                <li>For employment purposes;</li>
                <li>
                  To provide you with news and general information about our services and events
                  unless you have opted not to receive such information;
                </li>
                <li>Where we need to comply with a legal obligation;</li>
                <li>To provide and maintain our Website;</li>
                <li>To notify you about changes to our Website;</li>
                <li>To provide customer support;</li>
                <li>
                  To gather analysis or valuable information so that we can improve our Website;
                </li>
                <li>
                  To detect, prevent and address technical issues. Your personal data is not further
                  processed in a manner that is incompatible with foregoing purposes without your
                  specific consent.
                </li>
              </BulletedListStyled>
            </ParagraphStyled>
          </div>
          <div className="mb-5">
            <TitleStyled>Consequences of Non-Provision of your Personal Data</TitleStyled>
            <ParagraphStyled>
              AMS would not be able to continue with its contractual / employment agreement with
              you.
            </ParagraphStyled>
          </div>
          <div className="mb-5">
            <TitleStyled>Recipients of your Personal Data</TitleStyled>
            <ParagraphStyled>
              We won’t disclose any of your personal information to third persons, unless with your
              consent, such as to the following:
            </ParagraphStyled>
            <ParagraphStyled>
              <BulletedListStyled>
                <li>Professional advisors (lawyers, accountants, financial advisors, e</li>
                <li>Other financial institutions (banks, insurance companies);</li>
                <li>Tax authorities and regulators for reporting purposes.</li>
              </BulletedListStyled>
            </ParagraphStyled>
            <ParagraphStyled>
              We may need to share some of your personal data with partners, who will provide us
              with marketing automation services. Our partners will not have any impact on the
              purposes of processing your data and shall process your data only in line with the
              instructions from us.
            </ParagraphStyled>
            <ParagraphStyled>
              On our website there are follow buttons to our social media accounts: to LinkedIn,
              Facebook, and YouTube. Please note that LinkedIn, Facebook, and YouTube have their own
              privacy rules. We have no impact on how th
            </ParagraphStyled>
            <ParagraphStyled>
              We may disclose your personal information in some cases to governmental agencies or
              entities, regulatory authorities or other persons in line with any applicable law,
              regulations, court order or official request. For example, your data may be shared
              with these entities where AMS would be expected to cooperate in the event of a
              criminal investigation.
            </ParagraphStyled>
          </div>
          <div className="mb-5">
            <TitleStyled>Where and How Do We Keep your Data</TitleStyled>
            <ParagraphStyled>
              Taking into account the state of the art, we have implemented appropriate technical
              and organizational measures to reduce the risks of loss, unauthorized access,
              disclosure of data and other unauthorized alteration of personal data. We make sure
              that your Personal Data are processed only by personnels, who are authorized and are
              familiar with applicable personal data protection rules.
            </ParagraphStyled>
            <ParagraphStyled>
              We store your data in the form of:
              <BulletedListStyled>
                <li>Database</li>
                <li>Excel files</li>
                <li>Email based (office 365)</li>
              </BulletedListStyled>
            </ParagraphStyled>
            <ParagraphStyled>
              On our server located in Microsoft Office 365 Cloud Storage Systems. Your data is not
              encrypted.
            </ParagraphStyled>
            <ParagraphStyled>
              Further details can be obtained from AMS IT Department, mail to{' '}
              <strong>ams-it@a-m-s.ae</strong>
            </ParagraphStyled>
          </div>
          <div className="mb-5">
            <TitleStyled>What is the Retention Period</TitleStyled>
            <ParagraphStyled>
              6 to 12 months, subject to the type of data and its purpose of use. Please find out
              more from AMS IT Department, mail to ams-it@a-m-s.ae.
            </ParagraphStyled>
            <ParagraphStyled>
              When we no longer need to use your Personal Data and they are not needed for any legal
              or regulatory obligations, we will erase any existing copy or use any anonymization
              technique in order to irreversibly prevent identification so that we can't identify
              you.
            </ParagraphStyled>
            <ParagraphStyled>
              In case you withdraw your consent for processing your data, they will be erased
              without any undue delay, unless there will be other legal ground for processing (e.g.
              for compliance with a legal obligation, exercise of legal claims).
            </ParagraphStyled>
          </div>
          <div className="mb-5">
            <TitleStyled>Your Rights</TitleStyled>
            <ParagraphStyled>
              <BulletedListStyled>
                <li>
                  <strong>The right to access, update or to delete</strong> the information We have
                  on you.
                </li>
                <li>
                  <strong>The right of rectification.</strong> You have the right to have your
                  information rectified if that information is inaccurate or incomplete.
                </li>
                <li>
                  <strong>The right to object.</strong> You have the right to object to our
                  processing of your Personal Data.
                </li>
                <li>
                  <strong>The right of restriction.</strong> You have the right to request that we
                  restrict the processing of your Personal Data.
                </li>
                <li>
                  <strong>The right to data portability.</strong> You have the right to be provided
                  with a copy of your Personal Data in a structured, machine-readable and commonly
                  used format.
                </li>
                <li>
                  <strong>The right to withdraw consent.</strong> You also have the right to
                  withdraw your consent at any time where We relied on your consent to process your
                  Personal Data.
                </li>
              </BulletedListStyled>
            </ParagraphStyled>
            <ParagraphStyled>
              Please note that we may ask you to verify your identity before responding to such
              requests.
            </ParagraphStyled>
            <ParagraphStyled>
              If you wish to demand erasure of your data or just the restriction of their use,
              withdraw your consent to process data, you can do so in writing free of charge, but
              such a withdrawal may affect the way in which we deal with you and/or any related
              entities.
            </ParagraphStyled>
            <ParagraphStyled>
              For any further information, or if you wish to access, rectify, block or erase your
              personal data, withdraw your consent please contact AMS IT Department, mail to
              ams-it@a-m-s.ae
            </ParagraphStyled>
          </div>
          <div className="mb-5">
            <TitleStyled>Complaints</TitleStyled>
            <ParagraphStyled>
              If you wish to make a complaint, please contact AMS IT Department, mail to{' '}
              <strong>ams-it@a-m-s.ae</strong> or, if you prefer to complain to a higher authority,
              please contact your local data protection commissioner.
            </ParagraphStyled>
          </div>
          <div className="mb-5">
            <TitleStyled>What About Cookies?</TitleStyled>
            <ParagraphStyled>
              Cookies are small pieces of data that are transferred to your computer’s hard drive
              through your Web browser from our Web Server. A cookie cannot read data from your hard
              disk or read cookie files that may have been created from other sites. The AMS Website
              utilizes cookies as a means of providing personalization features to our visitors. For
              example, we utilize cookies to remember settings (background music selections,
              wallpapers preferences, etc.) that you may have made at our website.
            </ParagraphStyled>
            <ParagraphStyled>
              You can choose whether to accept cookies by changing the settings of your browser.
              Typically, by accessing the browser’s help feature you can obtain information on how
              to prevent your browser from accepting all cookies or to notify you when a cookie is
              being sent. If you choose not to accept these cookies, your experience at our website
              and other websites may be diminished and some features may not work as intended.
            </ParagraphStyled>
          </div>
        </div>
      </div>
    </PrivacyAndCookiePolicyWrapper>
  );
};

export default PrivacyAndCookiePolicy;
