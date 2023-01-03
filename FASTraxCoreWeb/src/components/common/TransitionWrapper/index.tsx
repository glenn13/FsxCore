import React from 'react';
import {motion, HTMLMotionProps, AnimatePresence} from 'framer-motion';

interface ITransitionWrapperProps {
  delay?: number;
  hidden?: boolean;
}

const TransitionWrapper: React.FC<
  ITransitionWrapperProps & React.HtmlHTMLAttributes<HTMLDivElement> & HTMLMotionProps<'div'>
> = ({children, hidden = false, ...props}) => {
  const [isVisible, setIsVisible] = React.useState<boolean>(hidden);
  const variants = {
    hidden: {opacity: 0, y: 10, display: 'none'},
    visible: {opacity: 1, y: 0, display: 'block'},
  };

  React.useEffect(() => {
    setIsVisible(!isVisible);
  }, [hidden]);

  return (
    <>
    <AnimatePresence>
     { isVisible && <motion.div
        initial="hidden"
        animate={'visible'}
        exit={{ opacity: 0 }}
        variants={variants}
        transition={{delay: props.delay || 0.2}}
        {...props}>
        {children}
        </motion.div>}
      </AnimatePresence>
      </>
  );
};

export default TransitionWrapper;
