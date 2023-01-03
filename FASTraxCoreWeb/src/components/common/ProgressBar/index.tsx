import React from 'react';
import styled from 'styled-components';
import {motion} from 'framer-motion';

export interface IProgressBarProps {
  showLabelProgress?: boolean;
  labelProgressText?: string;
  loading?: boolean;
}

const ProgressWrapperStyled = styled.div`
  display: flex;
  flex-direction: row;
  background: #3c3c3c;
`;

export const Index: React.FC<IProgressBarProps> = ({loading, showLabelProgress = true, labelProgressText = 'Progress', ...props}) => {
  const [percentageValue, setPercentageValue] = React.useState(0);
  const loadingState = React.useMemo(() => loading, [loading]);
  const variants = {
    hidden: {opacity: 0},
    visible: {opacity: 1},
  };

  const calculatePercent = React.useCallback(() => {
    if (!loadingState) return setPercentageValue(0);
    let percentage = 0;

    setTimeout(() => {
      while (percentage < 100) {
        percentage += Math.floor(Math.random() * 100) / 100;
        if (percentage > 100) setPercentageValue(100);
        else setPercentageValue(percentage);
      }
    }, 500);
  }, [loadingState]);

  React.useEffect(() => {
    calculatePercent();

    return () => {
      setPercentageValue(0);
    };
  }, [loadingState]);

  return (
    <motion.div
      className="flex flex-row h-4 items-center"
      variants={variants}
      initial="hidden"
      animate={percentageValue > 0 && percentageValue < 100 ? 'visible' : 'hidden'}
      transition={{ease: 'easeOut', duration: 0}}>
      {showLabelProgress && <span className="text-white uppercase">{labelProgressText}</span>}
      <ProgressWrapperStyled className="h-3 ml-4 mr-8 rounded-full w-40">
        <div className="h-3 rounded-full bg-yellow-600 from-white-400 bg-gradient-to-r" style={{width: `${percentageValue}%`}} />
      </ProgressWrapperStyled>
    </motion.div>
  );
};

export default React.memo(Index);
