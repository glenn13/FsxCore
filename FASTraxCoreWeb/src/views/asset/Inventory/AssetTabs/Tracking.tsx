import React from 'react';
import config from '@app/config/default';
import './styles.scss';
import UnderConstruction from '@app/components/layout/UnderConstruction';
import {getVehicleMapOnInfo} from '@app/services/mapOn/unit';

const mapboxGL = require('mapbox-gl/dist/mapbox-gl');

export interface VehicleTrackingProps {
  vehicleId: number;
}

mapboxGL.accessToken = config.MapBox.token;

const VehicleTracking: React.FC<VehicleTrackingProps> = ({vehicleId}) => {
  const [notFound, setNotFound] = React.useState(() => false);

  React.useEffect(() => {
    if (!config.MapBox.token) return;

    if (!vehicleId) return;

    getVehicleMapOnInfo(vehicleId).then(response => {
      if (response.data.error) return setNotFound(true);

      const unit = response.data.data?.units[0];

      if (!unit) return;

      const coordinates = [unit.lng, unit.lat];
      const map = new mapboxGL.Map({
        center: coordinates,
        container: 'map__container',
        style: 'mapbox://styles/mapbox/streets-v11',
        zoom: 8,
      });
      new mapboxGL.Marker().setLngLat(coordinates).addTo(map);
    });
  }, [vehicleId]);

  if (!vehicleId) return <UnderConstruction />;

  if (notFound)
    return (
      <UnderConstruction
        title="Vehicle Not Found"
        description="Kindly check with the site Administrators if the current Vehicle is correctly referenced"
      />
    );

  return (
    <div className="h-full w-full">
      <div id="map__container" className="w-full" style={{height: '680px'}}></div>
    </div>
  );
};

export default React.memo(VehicleTracking);
