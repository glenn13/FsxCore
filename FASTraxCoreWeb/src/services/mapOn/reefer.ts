import {MapOnResponse} from './types';
import http from '@app/services/http.service';

export interface ReeferSettings {
  runmode: number;
  setpoint_temp: number;
  over_setpoint_temp: number;
  under_setpoint_temp: number;
  gmt_from: Date;
  gmt_to: Date;
  user_id: number;
  compartment: number;
  cargo_cooling: number;
  cargo_cooling_range: number;
  channels: string[];
  notes: string;
}

export interface ReeferAlert {
  alert_id: number;
  car_id: number;
  settings: ReeferSettings;
  last_data_gmt: Date;
  current_flags: number;
  current_flags_gmt: Date;
  current_runmode: number;
  current_runmode_gmt: Date;
  current_setpoint_temp: number;
  current_setpoint_temp_gmt: Date;
  current_return_temp: number;
  current_return_temp_gmt: Date;
  current_compartment_state: string;
  current_compartment_state_gmt: Date;
  test: {sample: string};
}

export interface ReeferAlerts {
  alerts: ReeferAlert[];
}

export const getAlerts = () => {
  return http.get<MapOnResponse<ReeferAlerts>>('/mapon/reefers/alerts');
};
