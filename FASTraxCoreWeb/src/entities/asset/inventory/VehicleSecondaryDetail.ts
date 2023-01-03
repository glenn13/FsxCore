import * as yup from 'yup';
import {FuelType} from '../standard-entries/FuelType';
import {MeterType} from '../standard-entries/MeterType';
import {EngineType} from '../standard-entries/EngineType';
import {TransmissionType} from '../standard-entries/TransmissionType';

export const newVehicleSecondaryDetail = () => ({
  id: 0,
  fuelTypeId: 0,
  meterTypeId: 0,
  engineTypeId: 0,
  transmissionTypeId: 0,
  transmissionCode: '',
  engineNo: '',
  engineSize: '',
  lastOdometerReading: 0,
  engineCode: '',
  fuelCapacity: 0,
  assignedToName: '',
  contactNo: '',
  email: '',
});

export interface VehicleSecondaryDetail {
  id: number;
  fuelTypeId: number;
  meterTypeId: number;
  engineTypeId: number;
  transmissionTypeId: number;
  // temporary
  transmissionCode: string;
  engineNo: string;
  engineSize: string;
  engineCode: string;
  lastOdometerReading: number;
  fuelCapacity: number;
  assignedToName: string;
  contactNo: string;
  email: string;

  fuelType?: FuelType;
  meterType?: MeterType;
  engineType?: EngineType;
  transmissionType?: TransmissionType;
}

export const vehicleSecondaryDetailPath = 'vehicleSecondaryDetail';

export const vehicleSecondaryDetailShape = {
  fuelTypeId: yup.number().required().min(1, 'Fuel Type is required!'),
  meterTypeId: yup.number().required().min(1, 'Meter Type is required!'),
  engineTypeId: yup.number().required().min(1, 'Engine Type is required!'),
  transmissionTypeId: yup.number().required().min(1, 'Transmission Type is required!'),
  transmissionCode: yup.string().required('Transmission Code is required!'),
  engineNo: yup.string().required('Engine No. is required!'),
  engineSize: yup.string().required('Engine Size is required!'),
  engineCode: yup.string().required('Engine Code is required!'),
  lastOdometerReading: yup.number().required('Last Odometer Reading is required!'),
  fuelCapacity: yup.number().required('Fuel Capacity is required!'),
  assignedToName: yup.string().nullable(),
  contactNo: yup.string().nullable(),
  email: yup.string().nullable(),
};
