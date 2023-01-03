import {createStore} from './createStore';

type Pager = {
  skip: number;
  take: number;
  pageTotal: number;
};

type StateType = {
  pager: Pager;
  footerPagerVisibility: boolean;
};

type DispatchType = {
  setFooterPagerVisibility: (visible: boolean) => void;
  setPager: (pager: Pager) => void;
};

const initialState: StateType = {
  pager: {
    skip: 0,
    take: 15,
    pageTotal: 0,
  },
  footerPagerVisibility: false,
};

type StoreProps = StateType & DispatchType;

export const useGridStore = createStore<StoreProps>(`useGridStore`, (set, get) => ({
  ...initialState,
  setFooterPagerVisibility: (visible: boolean) =>
    set(state => {
      state.footerPagerVisibility = visible;
    }),
  setPager: (pager: Pager) =>
    set(state => {
      state.pager = pager;
    }),
}));
