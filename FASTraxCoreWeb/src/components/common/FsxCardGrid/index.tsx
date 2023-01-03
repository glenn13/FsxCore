import {AnimateSharedLayout, motion} from 'framer-motion/dist/framer-motion';
import FsxAssetCard, {
  FsxAssetCardOnClickEvent,
  FsxAssetCardOnViewDetailsClick,
  FsxAssetCardProps,
} from '../FsxAssetCard';
import React, {useEffect, useState} from 'react';
import {find, get} from 'lodash';

import {ReactComponent as EmptyIcon} from './empty.svg';
import {FsxInput} from '..';
import Fuse from 'fuse.js';
import mapDataToCardData from './mapDataToCardData';

type FsxCardGridOnClickEvent = React.MouseEvent<HTMLDivElement, MouseEvent> & {dataItem: any};

interface KeyValuePair {
  key: string;
  label?: string;
}
export interface FsxCardGridProps {
  /**
   * Card data.
   */
  data?: any;
  /**
   * Id key, useful for getting the reference of the current card data.
   */
  id?: any;
  /**
   * Label for the card header.
   */
  header?: KeyValuePair;
  /**
   * Card badge indicator key.
   */
  badge?: KeyValuePair;
  /**
   * Image url key.
   */
  image?: KeyValuePair;
  /**
   * Object key to map as content list.
   */
  contents?: KeyValuePair[];
  /**
   * Disable search filter.
   */
  disableSearch?: boolean;
  /**
   * When using custom filter make sure to disable search by specifying `disableSearch` to true.
   */
  filter?: string;
  /**
   * Hide cards on empty filter.
   */
  onFilterOnly?: boolean;
  /**
   * Customizing grid columns and gap.
   */
  grid?: {
    column?: [number, number, number];
    gap?: number;
  };
  /**
   * Card on click event and returns selected data. must set the `id` key props for this to properly work.
   */
  onClick?: (e: FsxCardGridOnClickEvent) => void;
  /**
   * View details button event handler, returns the card data reference.
   */
  onViewDetailsClick?: (e: FsxAssetCardOnViewDetailsClick) => void;
  /**
   * Content grid stylings.
   */
  contentStyle?: {
    gridFlow?: 'row' | 'col';
    gridColumns?: number;
    gridRows?: number;
  };
}

/**
 * Fsx Card Grid Component
 */
const FsxCardGrid: React.VFC<FsxCardGridProps> = ({
  grid = {column: [1, 3, 5], gap: 6},
  ...props
}) => {
  const [cardsData, setCardsData] = useState<FsxAssetCardProps[]>([]);

  const [filter, setFilter] = useState(props.filter || '');

  const [selected, setSelected] = useState<string>();

  //* Initial mapping of props data to card data.
  useEffect(() => {
    if (props.data) {
      const mappedData: FsxAssetCardProps[] = mapDataToCardData(props.data, {
        id: props.id,
        header: props.header,
        contents: props.contents,
        badge: props.badge,
        image: props.image,
      });
      setCardsData(mappedData);
    }
  }, [props.badge, props.contents, props.data, props.header, props.id, props.image]);

  //* Filter cards data.
  useEffect(() => {
    if (props.data) {
      const dataPool = mapDataToCardData(props.data, {
        id: props.id,
        header: props.header,
        contents: props.contents,
        badge: props.badge,
        image: props.image,
      });

      const keys: string[] = props.contents?.map(content => content.key) || [];
      if (props.header?.key) keys.push(props.header.key);
      if (props.badge?.key) keys.push(props.badge.key);

      const fuse = new Fuse(dataPool, {
        keys: ['header.value', 'badge.value', 'contents.value'],
        includeMatches: true,
        threshold: 0.1,
      });

      const filtered = fuse.search(filter).map(items => items.item);

      if (props.onFilterOnly) {
        setCardsData(filter ? filtered : []);
      } else {
        setCardsData(filter ? filtered : dataPool);
      }
    }
  }, [
    filter,
    props.badge,
    props.contents,
    props.data,
    props.header,
    props.id,
    props.image,
    props.onFilterOnly,
  ]);

  //* Sets props filter to state filter.
  useEffect(() => {
    setFilter(props.filter || '');
  }, [props.filter]);

  //* Pass the selected card data item to on click event.
  const handleOnCardClick = (e: FsxAssetCardOnClickEvent) => {
    setSelected(e.dataItem.id);
    props.onClick &&
      props.onClick({
        ...e,
        dataItem: find(props.data, data => get(data, props.id) === e.dataItem.id),
      });
  };

  const handleOnViewDetailsClick = (e: FsxAssetCardOnViewDetailsClick) => {
    setSelected(e.dataItem.id);
    props.onViewDetailsClick &&
      props.onViewDetailsClick({
        ...e,
        dataItem: find(props.data, data => get(data, props.id) === e.dataItem.id),
      });
  };

  //* Map cards data to FsxAssetCard component
  const cards = cardsData.map(card => {
    return (
      <FsxAssetCard
        key={card.header?.value}
        {...card}
        onClick={handleOnCardClick}
        isSelected={selected !== undefined && selected === card.id}
        onViewDetailsClick={handleOnViewDetailsClick}
        contentStyle={{...props.contentStyle}}
        imageUrl={card.imageUrl}
      />
    );
  });

  return (
    <div className="h-full" style={{marginTop: !props.disableSearch ? '-12px' : '12px'}}>
      {!props.disableSearch && (
        <div className="grid grid-cols-5 gap-6 ">
          <FsxInput
            className="fsx_grid_search_text"
            icon
            iconName="ams-search1"
            value={filter}
            onChange={event => setFilter(event.value)}
          />
        </div>
      )}
      <div
        className={`grid grid-cols-${grid.column?.[0]} md:grid-cols-${grid.column?.[1]} lg:grid-cols-${grid.column?.[2]} gap-${grid.gap}`}>
        <AnimateSharedLayout>
          {cards}
          {filter && cards.length === 0 && (
            <motion.div
              initial={{opacity: 0}}
              animate={{opacity: 1}}
              exit={{opacity: 0}}
              className="h-40 col-span-full">
              <div className="flex h-full">
                <EmptyIcon className="h-12" style={{width: '100px'}} />
                <div>
                  <h2 className="text-3xl">
                    No match found for search value{' '}
                    <span className="text-3xl font-bold text-red-500">{`<${filter}>`}</span>
                  </h2>
                  <h5 className="mb-4 text-xl">Here are some search tips:</h5>
                  <ul className="ml-12 list-disc">
                    <li className="text-xl">Make sure value was entered correctly</li>
                    <li className="mt-2 text-xl">
                      Make sure value is valid{' '}
                      {props.header?.label && (
                        <span className="p-2 mx-2 border border-gray-400 rounded">
                          {props.header?.label}
                        </span>
                      )}
                      {props.contents &&
                        props.contents?.map(content => (
                          <span
                            key={content.label}
                            className="p-2 mr-2 border border-gray-400 rounded">
                            {content.label}
                          </span>
                        ))}
                      {props.badge?.label && (
                        <span className="p-2 mx-2 border border-gray-400 rounded">
                          {props.badge?.label}
                        </span>
                      )}
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>
          )}
        </AnimateSharedLayout>
      </div>
    </div>
  );
};

export default FsxCardGrid;
