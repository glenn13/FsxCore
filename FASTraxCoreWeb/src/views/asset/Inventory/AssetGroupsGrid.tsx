import React from 'react';
import clx from 'classnames';
import {makeStyles} from '@material-ui/styles';
import {Grid, GridColumn as Column} from '@progress/kendo-react-grid';

export interface AssetGroupsGridProps {
  assetGroups: AssetGroup[];
  columns: string[];
  classes?: string;
  styles?: React.CSSProperties;
}

const useStyle = makeStyles({
  assetGroupsGrid: {
    flex: 1,
    display: 'flex',
  },
});

const AssetGroupsGrid: React.FC<AssetGroupsGridProps> = ({
  assetGroups,
  columns,
  classes,
  styles,
}) => {
  const classesHook = useStyle();

  const generateColumns = React.useCallback((): React.ReactNode | React.ReactNode[] => {
    return columns?.map((column, i) => <Column key={i} field={column} />);
  }, [columns]);

  return (
    <div className="px-5 py-5">
      <Grid data={assetGroups} className={clx(classesHook.assetGroupsGrid, classes)} style={styles}>
        {generateColumns()}
      </Grid>
    </div>
  );
};

export default AssetGroupsGrid;
