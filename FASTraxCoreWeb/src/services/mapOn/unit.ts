import {MapOnResponse} from './types';
import http from '@app/services/http.service';

export interface Unit {
  unit_id: number;
  box_id: number;
  company_id: number;
  country_code: string;
  label: string;
  number: string;
  shortcut: string;
  vehicle_title?: any;
  car_reg_certificate: string;
  vin: string;
  type: string;
  icon: string;
  lat: number;
  lng: number;
  direction: number;
  speed?: any;
  mileage: number;
  last_update: string;
  ignition_total_time: number;
  state: State;
  movement_state: MovementState;
  fuel_type: string;
  avg_fuel_consumption: Avgfuelconsumption;
  created_at: string;
}

interface Avgfuelconsumption {
  norm: number;
  measurement: string;
}

interface MovementState {
  name: string;
  start: string;
  duration: number;
}

interface State {
  name: string;
  start: string;
  duration: number;
  debug_info: Debuginfo;
}

interface Debuginfo {
  boxId: number;
  carId: number;
  msg: string;
  lastUpdate: number;
  lastValues: LastValues;
}

interface LastValues {
  VOLTAGE: string;
}

export interface UnitList {
  units: Unit[];
}

export const getVehicleMapOnInfo = (id: UrlParam) => {
  return http.get<MapOnResponse<UnitList>>(`/mapOn/units/vehicles/${id}`);
};
