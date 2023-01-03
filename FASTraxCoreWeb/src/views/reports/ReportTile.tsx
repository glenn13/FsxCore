import React from 'react';
import styled from 'styled-components';
import {motion} from 'framer-motion';
import ReportTileItem from './ReportTileItem';
import {SvgIcon} from '@app/components/common';
import _ from 'lodash';

const ProjectContentBody = motion.custom(styled.div`
  padding-top: 10px;
  display: grid;
  grid-gap: 2em;
  text-align: center;
  position: relative;

  @media (min-width: 1280px) {
    grid-template-columns: repeat(5, 1fr);
  }

  @media (min-width: 1600px) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media screen and (min-width: 2400px) {
    grid-template-columns: repeat(8, 1fr);
  }

  @media (max-width: 400px) {
    grid-template-columns: 1fr;
    grid-gap: 1em;
  }
`);

const CardItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const CardTitle = styled.div`
  min-height: 45px;
  flex-shrink: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.2);
`;

const CardIcon = styled.div`
  flex-grow: 1;
  min-height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export interface ProjectGridViewProps {
  data?: ReportType[];
  groupByKey?: string;
  selectedGroupKey?: string;
  subReportToFind?: string;
  onReportItemClick?: (report: ReportType) => void;
}

const ReportTile: React.FC<ProjectGridViewProps> = ({
  data,
  groupByKey,
  selectedGroupKey,
  subReportToFind = '',
  onReportItemClick,
  ...rest
}) => {
  const [newData, setNewData] = React.useState<Array<any> | undefined>([]);

  const contentVariants = {
    hidden: {opacity: 0, y: 10},
    visible: {opacity: 1, y: 0, transition: {staggerChildren: 0.2, delayChildren: 0.2}},
  };

  const itemVariants = {
    hidden: {y: 10, opacity: 0},
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  React.useEffect(() => {
    if (!data) return;
    if (!_.isEmpty(groupByKey)) {
      const groupedData = _.chain(data)
        .filter(r =>
          !_.isEmpty(subReportToFind)
            ? r.reportName.toLowerCase().includes(subReportToFind.toLowerCase())
            : true,
        )
        .filter(d =>
          selectedGroupKey && selectedGroupKey !== 'All'
            ? _.get(d, groupByKey || '') === selectedGroupKey
            : true,
        )
        .groupBy('subModule')
        .map((value, key) => ({key: key, value: value}))
        .value();

      setNewData(groupedData);
    } else setNewData(data);
  }, [groupByKey, selectedGroupKey, subReportToFind]);

  const generateItems = () => {
    if (!newData) return;
    const items: any = [];
    _.each(newData, (values: any, index: number) => {
      if (_.has(values, 'key')) {
        const keyItems: any = [];

        _.each(values.value, (v: ReportType, index) => {
          keyItems.push(
            <ReportTileItem
              variants={itemVariants}
              onClick={() => onReportItemClick && onReportItemClick(v)}>
              <CardItemWrapper>
                <CardIcon>
                  <SvgIcon svgId={v.icon} size={32} color="#fff" svgPath />
                </CardIcon>
                <CardTitle className="text-white text-sm">{v.reportName}</CardTitle>
              </CardItemWrapper>
            </ReportTileItem>,
          );
        });

        items.push(
          <div key={index}>
            <div className="mt-5 text-gray-600 font-medium">{values.key}</div>
            <ProjectContentBody
              className="mb-8"
              initial="hidden"
              animate="visible"
              variants={contentVariants}
              transition={{delay: 0.4}}>
              {keyItems}
            </ProjectContentBody>
          </div>,
        );
      }
    });

    return <>{items}</>;
  };

  return <div className="px-5">{generateItems()}</div>;
};

export default React.memo(ReportTile);
