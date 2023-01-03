import {ReduxThunk} from './../../rootReducer';
import pageService from '../../../services/settings/pages.service';
import {Page, initPagesState, setPagesSelected, InitializePagesPayload} from './types';

const defaultNav = (pages: Page[], selected?: number): InitializePagesPayload => ({
  selected,
  all: pages,
  current: pages.filter(page => !page.parentId),
});

// export const initPages = (currentPath: string): ReduxThunk => async dispatch => {
//   const pages = await pageService.pullPages(true);

//   const currentPage = pages.find(p => p.uri && p.uri.toLowerCase() === currentPath.toLowerCase());

//   if (!currentPage) return dispatch(initPagesState(defaultNav(pages)));

//   if (currentPath.split('/').length === 2)
//     return dispatch(initPagesState(defaultNav(pages, currentPage.id)));

//   const parent = pages.find(p => p.id === currentPage.parentId);

//   if (!parent) return dispatch(initPagesState(defaultNav(pages, currentPage.id)));

//   const pagesState: InitializePagesPayload = {
//     all: pages,
//     selected: currentPage.id,
//     current: [parent, ...pages.filter(page => page.parentId === parent?.id)],
//   };

//   return dispatch(initPagesState(pagesState));
// };

// export const patchPagesCurrent = (clicked: Page, back: boolean = false): ReduxThunk => async (
//   dispatch,
//   getState,
// ) => {
//   console.log('click');
//   const selected = clicked.id;
//   //   const pages = getState().pages;

//   if (pages.mappedPages[selected] === pages.current[0] && !back)
//     return dispatch(
//       setPagesSelected({
//         current: pages.current,
//         selected,
//       }),
//     );

//   if (!pages.all.some(page => page.parentId === clicked.id))
//     return dispatch(setPagesSelected({current: pages.current, selected}));

//   if (!clicked.parentId && pages.current.some(p => p.parentId))
//     return dispatch(
//       setPagesSelected({
//         current: pages.all.filter(p => !p.parentId),
//         selected,
//       }),
//     );

//   const current = pages.all.filter(page => page.parentId === clicked.id);

//   return dispatch(setPagesSelected({current: [clicked, ...current], selected}));
// };
