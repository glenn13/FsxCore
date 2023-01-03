import React from 'react';
import styled from 'styled-components';
import FsxTabItem, { FsxTabItemProps } from './FsxTabItem';
import { MotionProps, motion, AnimatePresence } from 'framer-motion';

const TabWrapper = styled.div`
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    min-height: 300px;
`;

const TabNavWrapper = styled.div`
    display: flex;
    flex-direction: row;
    margin-bottom: 1.0rem;

    > div:first-child {padding-left: 1rem;}
    > div + div{ padding: 0 1rem;}
    flex-basis: 50%;
    flex-wrap: nowrap;
`;

const TabContentWrapper = styled.div`
    display: flex;
    flex-grow: 1;
    flex-direction: column;

    .fsxtab-tab-pane:not(.active) {
        display: none;
    }
`;

export interface FsxTabProps extends React.HTMLAttributes<HTMLDivElement>  {
    children: React.ReactElement<FsxTabItemProps>[]
};

const FsxTab: React.FC<FsxTabProps> = ({children, className, ...props}) => {
    const [tabActiveItemIndx, setTabActiveItemIndex] = React.useState<number>(-1);

  return (
    <TabWrapper>
        <TabNavWrapper {...props}>
            {children.map(({props: {title, active}, type}, index: number) => {
                if(type != FsxTabItem)  throw 'type is not a valid FsxTabItem.';
                    
                    const isActive = (index === tabActiveItemIndx || active || (tabActiveItemIndx == -1 && index == 0));

                    return (
                        <FsxTabItem onClick={() => setTabActiveItemIndex(index)} title={title} active={isActive}/>
                    );
                })}
        </TabNavWrapper>

        <TabContentWrapper className="fsxtab-content-wrapper">
            {children.map(({props: {active, children: tabItemChild}}, index: number) => {
                return (
                    <>
                        {
                            (index === tabActiveItemIndx || active || (tabActiveItemIndx == -1 && index == 0)) && 
                            (
                                <AnimatePresence exitBeforeEnter>
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ delay: .2 }}
                                        className={`fsxtab-tab-pane flex flex-col flex-grow active`}>
                                    {tabItemChild}
                                    </motion.div>
                                </AnimatePresence>)
                        }
                       
                    </>
                );
            })}
        </TabContentWrapper>
  </TabWrapper> );
};

export default FsxTab;
