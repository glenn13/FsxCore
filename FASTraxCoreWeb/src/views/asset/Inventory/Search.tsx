import React from 'react';
import {useHistory} from 'react-router-dom';
import Search from '@app/components/common/Search';
import {StringKeyValuePair} from '@app/helpers/types';
import Container from '@app/components/common/Container';
import {Asset} from '@app/entities/asset/inventory/Asset';
import Placeholder from '@app/components/common/Placeholder';
import {Vehicle} from '@app/entities/asset/inventory/Vehicle';
import {Component} from '@app/entities/asset/inventory/Component';
import {GeneralAsset} from '@app/entities/asset/inventory/GeneralAsset';
import PlaceholderImage from '@app/components/common/Placeholder/Image';
import {
  getVehicleSearch,
  getVehiclesFirstOrDefaultImage,
} from '@app/services/asset/vehicles.service';
import {
  getGeneralAssetsFirstOrDefaultImage,
  getGeneralAssetsSearch,
} from '@app/services/asset/assets.service';
import {
  getComponentSearch,
  getComponentsFirstOrDefaultImage,
} from '@app/services/asset/inventory/components.service';

import { AssetCategoryEnum } from '@app/helpers/asset/enum'

export interface InventorySearchProps {
  query: string;
}

type MissingBase64 = {
  generalAssets: number[];
  vehicles: number[];
  components: number[];
};

const newAssets = () => ({
  generalAssets: [],
  vehicles: [],
  components: [],
});

type EntityAsset = {
  generalAssets: GeneralAsset[];
  vehicles: Vehicle[];
  components: Component[];
};

const base64stringMap: StringKeyValuePair<string> = {};

const getKeyWithPrefix = (category: AssetCategoryEnum, key: string | number): string =>
  `${category}-${key}`;

const baseUri = '/app/asset/inventory';
const getAssetUri = (category: AssetCategoryEnum, id: UrlParam) => {
    if (category === AssetCategoryEnum.GeneralAsset) return `${baseUri}/generals/${id}`;

    if (category === AssetCategoryEnum.Vehicle) return `${baseUri}/vehicles/${id}`;

  return `${baseUri}/components/${id}`;
};

const consolidateAssets = (category: AssetCategoryEnum, assets: Asset[]) =>
  assets.map(asset => {
    asset.uri = getAssetUri(category, asset.id);
    const key = getKeyWithPrefix(category, asset.id);

    if (!base64stringMap[key]) return asset;

    asset.base64stringImage = base64stringMap[key];

    return asset;
  });

const InventorySearch: React.FC<InventorySearchProps> = ({query}) => {
  const history = useHistory();
  const [isLoading, setIsLoading] = React.useState(() => false);
  const [data, setData] = React.useState<EntityAsset>(() => newAssets());
  const [assets, setAssets] = React.useState<EntityAsset>(() => newAssets());
  const [missingBase64, setEmptyBase64Assets] = React.useState<MissingBase64>(() => newAssets());

  React.useEffect(() => {
    for (const key in base64stringMap) base64stringMap[key] = '';
  }, []);

  React.useEffect(() => {
    if (!query) return;
    setIsLoading(true);
    setData(newAssets());

    Promise.all([
      getGeneralAssetsSearch(query),
      getVehicleSearch(query),
      getComponentSearch(query),
    ]).then(([gResponse, vResponse, cResponse]) =>
      setAssets({
        generalAssets: gResponse.data,
        vehicles: vResponse.data,
        components: cResponse.data,
      }),
    );
  }, [query]);

  React.useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
      setData(assets);
    }, 500);
  }, [assets]);

  React.useEffect(() => {
    const missingBase64s: MissingBase64 = newAssets();

      assets.generalAssets.forEach(ga => {
          const key = getKeyWithPrefix(AssetCategoryEnum.GeneralAsset, ga.id);

      if (base64stringMap[key]) return;

      missingBase64s.generalAssets.push(ga.id);
    });

    assets.vehicles.forEach(v => {
        const key = getKeyWithPrefix(AssetCategoryEnum.Vehicle, v.id);

      if (base64stringMap[key]) return;

      missingBase64s.vehicles.push(v.id);
    });

      assets.components.forEach(c => {
          const key = getKeyWithPrefix(AssetCategoryEnum.Component, c.id);

      if (base64stringMap[key]) return;

      missingBase64s.components.push(c.id);
    });

    if (
      missingBase64s.generalAssets.length === 0 &&
      missingBase64s.vehicles.length === 0 &&
      missingBase64s.components.length === 0
    )
      return;

    setEmptyBase64Assets(missingBase64s);
  }, [assets]);

  React.useEffect(() => {
    Promise.all([
      getGeneralAssetsFirstOrDefaultImage(missingBase64.generalAssets),
      getVehiclesFirstOrDefaultImage(missingBase64.vehicles),
      getComponentsFirstOrDefaultImage(missingBase64.components),
    ]).then(([gResponse, vResponse, cResponse]) => {
        gResponse.data.forEach(generalAsset => {
            const key = getKeyWithPrefix(AssetCategoryEnum.GeneralAsset, generalAsset.id);
        base64stringMap[key] = generalAsset.base64String;
      });

      vResponse.data.forEach(vehicles => {
          const key = getKeyWithPrefix(AssetCategoryEnum.Vehicle, vehicles.id);
        base64stringMap[key] = vehicles.base64String;
      });

        cResponse.data.forEach(components => {
            const key = getKeyWithPrefix(AssetCategoryEnum.Component, components.id);
        base64stringMap[key] = components.base64String;
      });

      setData(assets => ({...assets}));
    });
  }, [missingBase64]);

    const consolidatedAssets = [
        ...consolidateAssets(AssetCategoryEnum.GeneralAsset, data.generalAssets),
        ...consolidateAssets(AssetCategoryEnum.Vehicle, data.vehicles),
        ...consolidateAssets(AssetCategoryEnum.Component, data.components),
  ];

  const totalLength =
    assets.generalAssets.length + assets.vehicles.length + assets.components.length;

  return (
    <Search.Container>
      {!isLoading && totalLength === 0 && !!query && (
        <Search.NotFound query={query}>
          <span className="text-2xl ml-10 mt-4">Here are some tips:</span>
          <ul className="ml-16 mt-4">
            <li className="text-xl">• Make sure value was eneterd correctly</li>
            <li className="text-xl">• Make sure value is valid Asset ID, Serial or VIN</li>
          </ul>
        </Search.NotFound>
      )}
      {!!query && isLoading && totalLength > 0 ? (
        <Placeholder count={3} isLoading={isLoading} />
      ) : null}
      {consolidatedAssets.map((asset, index) => (
        <Search.Item key={index} bgWhite shadow sameAsPlaceHolderSize>
          <Container row fullWidth fullHeight className={isLoading ? 'placeholder__loading' : ''}>
            <PlaceholderImage base64string={asset.base64stringImage} />
            <Container col grow>
              <Container row grow>
                <Container row grow justify="center" items="center">
                  <Container col textAlignment="right">
                    <span className="my-2">VIN / Serial No:</span>
                    <span className="my-2">Asset ID:</span>
                    <span className="my-2">Status:</span>
                  </Container>
                  <Container col ml={4}>
                    <span className="my-2">{asset.serialNo}</span>
                    <span className="my-2">{asset.assetRefId}</span>
                    <span className="my-2">{asset.maintenanceStatus?.title}</span>
                  </Container>
                </Container>
                <Container row grow justify="center" items="center">
                  <Container col textAlignment="right">
                    <span className="my-2">Manufacturer:</span>
                    <span className="my-2">Model:</span>
                    <span className="my-2">Asset Type:</span>
                  </Container>
                  <Container col ml={4}>
                    <span className="my-2">{asset.assetManufacturer?.title}</span>
                    <span className="my-2">{asset.assetModel?.title}</span>
                    <span className="my-2">{asset.assetType?.title}</span>
                  </Container>
                </Container>
              </Container>
              <button className="text-right" onClick={() => asset.uri && history.push(asset.uri)}>
                View Details...
              </button>
            </Container>
          </Container>
        </Search.Item>
      ))}
    </Search.Container>
  );
};

export default InventorySearch;
