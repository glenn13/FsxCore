export interface FuelMonitoring {
  id: number;
  vehicleId: number;
  lastRefuelDate: Date;
  prevOdometerReading: number;
  prevTotalLitersLoaded: number;
  currentOdometerReading: number;
  totalLitersLoaded: number;
  fuelCost: number;
  totalDistanceTraveledKm: number;
  totalFuelCost: number;
  averageConsumption: number;
}
