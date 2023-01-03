import {createReducer} from '@reduxjs/toolkit';
import {PagesState, setPagesCurrent} from './types';

const initialState: PagesState = {
  all: [],
  current: [],
};

export const pagesReducer = createReducer(initialState, builder =>
  builder.addCase(setPagesCurrent, (state, action) => {
    state.current = action.payload;
  }),
);

// export const pages = createReducer(mockAccesses, builder =>
//   builder
//     .addCase(initPagesState, (state, action) => {
//       const {all} = action.payload;
//       const length = Object.values(state.mappedPages).length;
//       const mappedPages = length > 0 ? state.mappedPages : {};

//       if (length === 0) {
//         all.forEach(page => (mappedPages[page.id] = page));
//         all.forEach(page => {
//           if (!page.parentId) return;

//           if (!mappedPages[page.parentId] || !mappedPages[page.parentId].children) return;

//           mappedPages[page.parentId].children.push(page);
//         });
//       }

//       return {
//         all,
//         mappedPages,
//         current: action.payload.current,
//         selected: action.payload.selected,
//       };
//     })
//     .addCase(setPagesCurrent, (state, action) => ({...state, current: action.payload}))
//     .addCase(setPagesSelected, (state, action) => ({
//       ...state,
//       current: action.payload.current,
//       selected: action.payload.selected,
//     })),
// );
