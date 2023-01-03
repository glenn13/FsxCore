import Badge, {ColorsType} from '../Badge';
import Card, {CardProps} from '../Card';
import React, {useEffect, useRef, useState} from 'react';
import {motion, useAnimation} from 'framer-motion';

import ImageNotFound from '@app/assets/images/no-image-available.jpg';
import httpService from '@app/services/http.service';
import styles from './fsx-asset-card.module.scss';
import {useInView} from 'react-intersection-observer';

interface FsxCardProperty {
  value: Status;
  label?: string;
}

export type FsxAssetCardOnClickEvent = React.MouseEvent<HTMLDivElement, MouseEvent> & {
  dataItem: {id: any; header: any; contents: any; badge: any};
};

export type FsxAssetCardOnViewDetailsClick = React.MouseEvent<HTMLButtonElement, MouseEvent> & {
  dataItem: {id: any; header: any; contents: any; badge: any};
};
export interface FsxAssetCardProps extends CardProps {
  id?: any;
  header?: FsxCardProperty;
  contents?: FsxCardProperty[];
  badge?: FsxCardProperty;
  onClick?: (event: FsxAssetCardOnClickEvent) => void;
  onViewDetailsClick?: (event: FsxAssetCardOnViewDetailsClick) => void;
  contentStyle?: {
    gridFlow?: 'row' | 'col';
    gridColumns?: number;
    gridRows?: number;
  };
  imageUrl?: string;
}

const FsxAssetCard: React.VFC<FsxAssetCardProps> = ({
  id,
  badge,
  contents,
  header,
  onViewDetailsClick,
  contentStyle = {gridFlow: 'col'},
  imageUrl,
  ...props
}) => {
  const {ref, inView} = useInView();

  const controls = useAnimation();

  const [isViewDetailsHovered, setIsViewDetailsHovered] = useState(false);

  const imageRef = useRef<HTMLImageElement>(null);

  const cardContent = contents?.map((content, key) => (
    <li key={key} className="mb-4">
      <div>{content.label && `${content.label}: `}</div>
      <span className="font-medium">{content.value}</span>
    </li>
  ));

  const handleOnClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.stopPropagation();

    if (!isViewDetailsHovered)
      props.onClick && props.onClick({...event, dataItem: {id, header, contents, badge}});
  };

  const handleOnViewDetailsClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.stopPropagation();

    onViewDetailsClick && onViewDetailsClick({...event, dataItem: {id, header, contents, badge}});
  };

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  useEffect(() => {
    (async () => {
      if (imageUrl) {
        const res = await httpService.get(imageUrl, {responseType: 'arraybuffer'});

        if (imageRef.current) {
          imageRef.current.src = `data:${res.headers['content-type']};base64,${Buffer.from(
            res.data,
            'binary',
          ).toString('base64')}`;
        }
      }
    })();
  }, [imageUrl]);

  return (
    <motion.div
      ref={ref}
      className="flex"
      variants={{
        visible: {x: 0, opacity: 1},
        hidden: {x: -100, opacity: 0},
      }}
      key={header?.value}
      layoutId={header?.value}
      animate={controls}
      initial="hidden">
      <Card {...props} onClick={handleOnClick}>
        <div className="flex h-full">
          {imageUrl && (
            <div className={`${styles['card-container']} mr-4`}>
              <img ref={imageRef} className={`${styles['card-image']} h-full`} alt="thumb" />
            </div>
          )}
          {imageUrl === '' && (
            <div className={`${styles['card-container']} mr-4`}>
              <img
                src={ImageNotFound}
                className={`${styles['not-found-image']} h-full`}
                alt="thumb"
              />
            </div>
          )}
          <div className="flex flex-col w-full">
            {header?.label && <h1>{header?.label}</h1>}
            {header?.value && (
              <h4 className="px-2 py-1 text-lg bg-gray-300 rounded">{header.value}</h4>
            )}
            {contents && (
              <div className="p-2 my-3 border-2 border-gray-300 border-dashed rounded ">
                <ul
                  className={`grid grid-flow-${contentStyle.gridFlow} ${
                    contentStyle.gridColumns ? `grid-cols-${contentStyle.gridColumns}` : ''
                  }  ${contentStyle.gridRows ? `grid-rows-${contentStyle.gridRows}` : ''}`}>
                  {cardContent}
                </ul>
              </div>
            )}
            {badge && (
              <div className="flex w-full mt-auto">
                <Badge label={badge.value || ''} type={getStatusType(badge.value)} />
                <button
                  onClick={handleOnViewDetailsClick}
                  className="px-2 ml-auto transition-all duration-300 bg-gray-200 rounded hover:bg-gray-400">
                  View details
                </button>
              </div>
            )}
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

type Status =
  | 'Active'
  | 'Active - Issued'
  | 'Active - Off Lease'
  | 'Active - Refurbished'
  | 'Approved'
  | 'For Inspection'
  | 'In-Active'
  | 'In-Progress'
  | 'Open'
  | 'Rejected';

function getStatusType(status: Status): keyof ColorsType {
  switch (status) {
    case 'Active':
    case 'Active - Issued':
    case 'Active - Off Lease':
    case 'Active - Refurbished':
    case 'Approved':
      return 'info';
    case 'For Inspection':
    case 'Open':
      return 'warning';
    case 'In-Active':
    case 'Rejected':
      return 'danger';
    case 'In-Progress':
      return 'success';
    default:
      return 'default';
  }
}

export default FsxAssetCard;
