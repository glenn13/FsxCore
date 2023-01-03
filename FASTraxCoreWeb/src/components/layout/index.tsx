import React from 'react';
import {makeStyles} from '@material-ui/styles';
import {ThemeProvider} from 'styled-components';
import Header from './Header';
import RadialOptions from './Options';
import {getTheme} from '../../theme/getTheme';
import ChatbotProvider from '../../components/common/Chatbot/ChatbotProvider';
import {Aside, Footer, Banner, Wrapper, Content, ContentSidebar} from '../common';
import {useAppStore} from '../../providers/app.store';
import useRoute from '@app/hooks/useRoute';

interface IProps {
  isDefault?: boolean;
}

const useStyle = makeStyles({
  root: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  topBar: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row-reverse',
  },
  main: {
    display: 'flex',
    overflow: 'auto',
    height: '100%',
    width: '100%',
  },
});

export const Layout: React.FC<IProps> = ({isDefault = true, ...props}) => {
  const {currentPage} = useRoute();

  const findAndLoadElement = React.useCallback(
    (element: React.ReactNode, elementProps?: Object) => {
      const childElement = React.Children.toArray(props.children).find(
        (child: any) => child?.type === element,
      );

      if (React.isValidElement(childElement) && elementProps)
        return React.cloneElement(childElement, elementProps);

      return childElement;
    },
    [props.children],
  );

  //   React.Children.forEach(props.children, (child: any) => {
  //     if (
  //       child?.type !== Banner &&
  //       child?.type !== ContentSidebar &&
  //       child?.type !== Aside &&
  //       child?.type !== Content
  //     ) {
  //       throw new Error(
  //         '<Layout /> accepts only child element like <Banner /> | <Content /> | <ContentSidebar />',
  //       );
  //     }
  //   });

  const classes = useStyle();
  const {theme} = useAppStore();

  return (
    <ThemeProvider theme={getTheme(theme)}>
      <Wrapper className={`${theme}-theme`}>
        {isDefault && findAndLoadElement(Aside)}
        <div className={classes.root}>
          <ChatbotProvider>
            {isDefault && currentPage?.meta?.layoutPart?.header && <Header />}
          </ChatbotProvider>
          {isDefault && findAndLoadElement(Banner)}
          <div className={`${classes.main} justify-center`}>
            {findAndLoadElement(Content)}
            {findAndLoadElement(ContentSidebar, {
              isBannerVisible: findAndLoadElement(Banner),
            })}
          </div>
          {isDefault &&
            currentPage &&
            currentPage.meta &&
            !!currentPage.meta.layoutPart?.footer && <Footer />}
          <RadialOptions />
        </div>
      </Wrapper>
    </ThemeProvider>
  );
};

export default Layout;
