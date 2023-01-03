import React from 'react';
import styled from 'styled-components';
import {TransitionWrapper, Button} from '@app/components/common';
import {ImageResources} from '@app/assets';

const TermsAndConditionWrapper = styled(TransitionWrapper)`
  display: flex;
  flex-direction: column;
  justify-content: center;

  strong,
  a {
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

const AlphaListStyled = styled.ul`
  list-style: lower-alpha;
  padding-left: 45px;

  li {
    padding-bottom: 3px;
  }
`;

export const TermsAndCondition: React.FC<{}> = ({}) => {
  return (
    <TermsAndConditionWrapper>
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
            AMS Terms &amp; Conditions
            <LastUpdateStyled>
              <span>Last Updated: 21/06/2018</span>
            </LastUpdateStyled>
          </HeaderStyled>
          <div className="mb-5">
            <ParagraphStyled>
              <a href="https://www.ams.global">https://www.ams.global</a>
              and/or <a href="http://www.ams.global">http://www.ams.global</a> is a website (the
              “Website”) operated by Automotive Management Services FZ-LLC (License No 150034,
              registered address: Office 222, Building 1, International Humanitarian City, Dubai,
              UAE, P.O. Box 214355) and Automotive Management Services FZ-LLC (License No JLT-65465,
              registered address: Unit 3401, SABA 1, Cluster E, Jumeirah Lakes Towers, Dubai, UAE,
              P.O. Box 214355), referred to as "AMS, We, Our or Us".
            </ParagraphStyled>
            <ParagraphStyled>
              By accessing and using this Website of AMS you agree, without limitation or
              qualification, to the following terms and conditions.
            </ParagraphStyled>
          </div>
          <div className="mb-5">
            <TitleStyled>Copyright Notice</TitleStyled>
            <ParagraphStyled>
              All content included on the Website, such as text, graphics, logos, button icons,
              images, audio clips and software is the property of AMS, its subsidiaries, affiliates,
              licensors. All rights are reserved. The information made available on the Website may
              not be reproduced, duplicated, copied, transferred, transmitted, distributed, stored,
              modified, downloaded, reused, published, licensed, reposted, sold or otherwise
              exploited for any commercial use without the prior written approval of AMS, its
              subsidiaries, affiliates, licensors. However, it may be reproduced, stored, and
              downloaded for strictly personal use and non-commercial purposes, or where otherwise
              indicated, provided that all copyright and other proprietary notices contained on the
              material is retained.
            </ParagraphStyled>
            <ParagraphStyled>
              The use of press releases and other documents classified as public is permitted in
              public communications if the source of the information has been stated.
            </ParagraphStyled>
            <ParagraphStyled>Copyright &copy; AMS 2018.</ParagraphStyled>
          </div>
          <div className="mb-5">
            <TitleStyled>Trademark Notice</TitleStyled>
            <ParagraphStyled>
              <img
                alt="Fastrax White"
                style={{height: 40, width: 'auto'}}
                className="float-left pr-3"
                src={ImageResources.AMSLogo}
                id="login-screen-logo"
              />
              is registered trademark of Automotive Management Services FZ-LLC (“Trademark”). Your
              access to the Website should not be construed as granting, by implication, estoppel or
              otherwise, any license or right to use Trademark appearing on the Website without the
              prior written consent of AMS. Any reproduction, distribution, transmission,
              modification or use of Trademark for any purpose without prior written consent of AMS
              is prohibited. Any logos, trademarks, or service marks of third parties that may also
              appear on this Website are the exclusive property of their respective owners, and no
              use or other rights are granted with respect to these trademarks without the express
              written approval of the owners of such trademarks and service marks.
            </ParagraphStyled>
          </div>
          <div className="mb-5">
            <TitleStyled>Links</TitleStyled>
            <ParagraphStyled>
              AMS provides hypertext links to sites on the Internet, which are owned or operated by
              third parties. These are provided for your convenience and AMS is not responsible for
              and has no control over such other sites. Using an external hypertext link means that
              you may be leaving the Website and AMS therefore takes no responsibility for and gives
              no warranties, guarantees or representations in respect of such linked third-party
              websites. By linking to such third-party site, you shall review and agree to that
              site's rules of use before using such site. You also agree that AMS is not responsible
              for the privacy policies or procedures or the content of such third-party websites and
              cannot assume any responsibility for material created or published by such third-party
              sites. In addition, a link to a non-AMS site does not imply that AMS endorses the site
              or the products or services referenced in such third-party site
            </ParagraphStyled>
          </div>
          <div className="mb-5">
            <TitleStyled>Disclaimer and Limitation of Liability</TitleStyled>
            <ParagraphStyled>
              Although every care has been taken to assure the accuracy of the information on the
              Website, AMS provides this information "as is" and disclaims all warranties, expressed
              or implied, including, but not limited to, implied warranties of merchantability and
              fitness for any particular purpose. You acknowledge that your use of the Website is at
              your sole risk and that you assume full responsibility for all costs associated with
              use of this Website. Under no circumstances will AMS, its subsidiaries, affiliates,
              licensors be liable to any person or business entity for any direct, indirect,
              special, incidental, consequential, or other damages based on any use of, or inability
              to use, the information or software made available on the AMS Website, including,
              without limitation, any lost profits, business interruption, or loss of programs of
              information or otherwise, even if AMS has been specifically advised of the possibility
              of such damages.
            </ParagraphStyled>
            <ParagraphStyled>
              AMS makes no warranty that the Website is free from infection by viruses or anything
              else that has contaminating or destructive properties. In addition, AMS also assumes
              no responsibility and shall not be liable for any damage to, or viruses that may
              infect your computer equipment or other property on account of your access to, use of
              this Website, or downloading of any materials, data, text, images, video, or audio
              from this Website.
            </ParagraphStyled>
            <ParagraphStyled>
              Further, for non-AMS websites that are referenced in our Site or where a hyperlink
              appears, AMS makes no warranties concerning the accuracy or reliability of the
              information in these websites and assumes no responsibility for material created or
              published by third parties contained therein. In addition, it is up to you to take
              precautions and to ensure that whatever you select for your use is free of such items
              as viruses, worms, Trojan horses and other items of a destructive nature. Information
              on the Website may contain technical inaccuracies or typographical errors. The
              information contained on the Website may be changed at any time without prior
              notification or obligation. AMS makes no commitment to update the information or other
              materials entered in the Website. We do not warrant that this Website will be
              uninterrupted or error-free.
            </ParagraphStyled>
            <ParagraphStyled>
              AMS reserves the right to withdraw access to the pages at any time
            </ParagraphStyled>
          </div>
          <div className="mb-5">
            <TitleStyled>User Submissions</TitleStyled>
            <ParagraphStyled>
              By submitting information (questions, comments, suggestions) to any of our servers,
              for example, by e-mail or via the AMS Website, you agree that:
              <AlphaListStyled>
                <li>the material will not contain any item that is unlawful;</li>
                <li>you have the unlimited right to provide information t</li>
                <li>
                  you agree not to take action against us in relation to information that you submit
                  and you agree to indemnify us if any third party takes action against us in
                  relation to the information you submit.
                </li>
              </AlphaListStyled>
            </ParagraphStyled>
            <ParagraphStyled>
              AMS assumes no responsibility or liability for any information submitted to any of our
              servers. Please note that any information, unsolicited suggestions, ideas or other
              communications you transmit to the Website will be considered non-confidential,
              non-exclusive, royalty-free, irrevocable, fully sub licensable and non-proprietary
              ("communications"). AMS will have no obligations concerning the communications.
            </ParagraphStyled>
          </div>
          <div className="mb-5">
            <TitleStyled>Revision of Terms and Conditions</TitleStyled>
            <ParagraphStyled>
              AMS may without prior notice change, modify or withdraw access to this Website, or the
              content of these pages at any time. It is your responsibility to review any changes.
              They will come into effect immediately on posting.
            </ParagraphStyled>
          </div>
          <div className="mb-5">
            <TitleStyled>Applicable Law</TitleStyled>
            <ParagraphStyled>
              This Website was created, and is operated, according to the federal laws of United
              Arab Emirates (UAE). In determining any disputes in relation to the Website the laws
              of UAE will apply, and the Courts of UAE will have exclusive jurisdiction. If any
              term, condition or provision of these Legal Notice is determined to be unlawful,
              invalid, void or for any reason unenforceable, the validity and enforceability of the
              remaining terms, conditions and provisions shall not in any way be affected or
              impaired thereby.
            </ParagraphStyled>
          </div>
        </div>
      </div>
    </TermsAndConditionWrapper>
  );
};

export default TermsAndCondition;
