import {AnimatePresence, motion} from 'framer-motion';
import React, {useEffect, useRef, useState} from 'react';

import {ReactComponent as ErrorIcon} from '@app/assets/images/error.svg';
import FsxCardGrid from '@app/components/common/FsxCardGrid';
import {Loader} from '@app/components/common';
import {ReactComponent as SearchListIcon} from '@app/assets/images/magnifying-glass.svg';
import { useHistory } from 'react-router-dom';
import { AssetCategoryEnum } from '@app/helpers/asset/enum';
import { getDispositionPerRecord } from '@app/services/asset/disposition/disposition.service';

export interface DispositionPerRecordProps {
  filter?: string;
}

const DispositionPerRecord: React.VFC<DispositionPerRecordProps> = ({filter}) => {
  const history = useHistory();
  const [data, setData] = useState<DispositionSummary[]>();

  const [isSearchInitialize, setIsSearchInitialize] = useState(false);

  const [counter, setCounter] = useState(0);

  const [hasError, setHasError] = useState(false);

  const [error, setError] = useState<any>();

  const intervalRef = useRef<any>();

  const clearInterval = () => {
    window.clearInterval(intervalRef.current);
  };


  const handleViewDetails = React.useCallback((value: any) => {
    if (value !== undefined) {
    
      var _castValue = value as DispositionSummary;
      switch (_castValue.assetCategoryId) {
        case AssetCategoryEnum.Component: {
          history.push(`/app/asset/disposition/component/${_castValue.id}`);
          break;
        }
        case AssetCategoryEnum.GeneralAsset: {
          history.push(`/app/asset/disposition/generalasset/${_castValue.id}`);
          break;
        }
        case AssetCategoryEnum.Vehicle: {
          history.push(`/app/asset/disposition/vehicle/${_castValue.id}`);
          break;
        }
      }
    }
  }, [history]);

  useEffect(() => {
    if (filter)
      intervalRef.current = window.setInterval(() => {
        setCounter(counter - 1);
      }, 1000);

    return () => clearInterval();
  }, [counter, filter]);

  useEffect(() => {
    if (filter) {
      setIsSearchInitialize(true);
      setData(undefined);
    }

    if (!filter) {
      setIsSearchInitialize(false);
      setData(undefined);
      clearInterval();
    }

    setCounter(2);
  }, [filter]);

  useEffect(() => {
    if (counter === 0) {
      clearInterval();
      (async () => {
        if (filter) {
          await getDispositionPerRecord(filter)
            .then(res => setData(res.data))
            .catch(reason => {
              setError(reason.response ? reason.response.data : reason.message);
              setHasError(true);
              setIsSearchInitialize(false);
            });
        }
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [counter]);

  return (
    <div className="flex flex-col h-full">
      <AnimatePresence>
        <motion.div
          initial={{opacity: 0}}
          animate={{opacity: 1}}
          exit={{opacity: 0}}
          className="h-full ">
          {filter && data !== undefined ? (
            <FsxCardGrid
              data={data}
              id="refId"
              header={{key: 'dispositionNo', label: 'Disposition No.'}}
              contents={[
                {key: 'dispositionType', label: 'Disposition Type'},
                {key: 'assetCategory', label: 'Asset Category'},
                {key: 'vinSerialNo', label: 'VIN / Serial No.'},
                {key: 'assetItemName', label: 'Asset Name'},
                {key: 'assetManufacturer', label: 'Manufacturer'},
                {key: 'assetModel', label: 'Model'},
                {key: 'assetType', label: 'Asset Type'}
              ]}
              image={{key: 'imageURL'}}
              badge={{key: 'dispositionStatus'}}
              disableSearch
              filter={filter}
              onFilterOnly
              grid={{
                column: [1, 1, 2],
                gap: 6,
              }}
              contentStyle={{gridColumns: 2, gridRows: 4, gridFlow: 'col'}}
              onViewDetailsClick={e => handleViewDetails(e.dataItem)}
            />
          ) : (
            <motion.div
              initial={{opacity: 0}}
              animate={{opacity: 1}}
              className="flex flex-col items-center justify-center w-full h-40 col-span-full">
              <div>
                {hasError && (
                  <>
                    <ErrorIcon className="h-12 " />
                    <h1 className="mt-4 text-2xl text-center text-red-500">{`${error}`}</h1>
                  </>
                )}
                {isSearchInitialize && !hasError ? (
                  <>
                    <Loader />
                    <p className="text-2xl text-center text-gray-600 ">Searching records...</p>
                  </>
                ) : (
                  <>
                    {!hasError && (
                      <>
                        <SearchListIcon className="h-12 " />
                        <p className="mt-4 text-2xl text-center text-gray-600">Search per record</p>
                      </>
                    )}
                  </>
                )}
              </div>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default DispositionPerRecord;
