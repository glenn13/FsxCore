import {Pager} from '@progress/kendo-react-data-tools';
import React from 'react';
import styled from 'styled-components';
import {useGridStore} from '@app/providers/grid.store';

const FooterControlsWrapperStyled = styled.div`
  display: flex;
  background: #4e4e4e;
  width: 400px;
`;

const FooterControlsStyled = styled.div`
  width: 100%;
  padding-top: 5px;
  display: flex;
  background: ${props => props.theme.content.bgColor};
  flex-direction: column;
  padding-right: 15px;

  .k-pager-wrap {
    padding: 4px !important;
    border-radius: 4px;
  }

  .k-pager-sizes {
    flex-grow: 1;
    justify-content: flex-end;
    white-space: nowrap;
    color: #949494;
    user-select: none;
  }

  .k-pager-numbers-wrap {
    display: none;
  }

  .k-textbox {
    border: none;
    text-align: center;
    padding: 0;
    margin: 0;
    pointer-events: none;
  }

  .k-textbox,
  .k-pager-sizes,
  .k-pager-input {
    font-size: 11px;
  }

  .k-pager-wrap > *:not(.k-pager-info):not(.k-pager-numbers-wrap) {
    display: inline-flex;
  }

  .k-widget.k-dropdown.k-header {
    width: 60px;
  }

  .k-dropdown .k-dropdown-wrap {
    padding: 0 !important;
  }

  .k-pager-input {
    margin: 0 !important;
  }
`;

export interface FooterControlsProps {}

const FooterControls: React.FC<FooterControlsProps> = () => {
  const {pager, setPager, footerPagerVisibility} = useGridStore();
  const [state, setState] = React.useState({
    skip: pager.skip,
    take: pager.take,
    total: pager.pageTotal,
  });

  const handlePageChange = (event: any) => {
    setState({skip: event.skip, take: event.take, total: pager.pageTotal});
    setPager({skip: event.skip, take: event.take, pageTotal: pager.pageTotal});
  };

  React.useEffect(() => {
    setState({skip: pager.skip, take: pager.take, total: pager.pageTotal});
  }, [pager]);

  return (
    <>
      {footerPagerVisibility && (
        <FooterControlsWrapperStyled id="footer_control">
          <FooterControlsStyled>
            <Pager
              skip={state.skip}
              take={state.take}
              total={state.total}
              onPageChange={handlePageChange}
              buttonCount={5}
              info={true}
              previousNext={true}
              type={state.total === 0 ? 'numeric' : 'input'}
              pageSizes={[10, 15, 20]}
            />
          </FooterControlsStyled>
        </FooterControlsWrapperStyled>
      )}
    </>
  );
};

export default FooterControls;
