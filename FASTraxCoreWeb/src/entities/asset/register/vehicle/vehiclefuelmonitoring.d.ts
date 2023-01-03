interface VehicleFuelMonitoring {
    tempId: number;
    id: number;
    averageConsumption: number;
    fuelCost: number;
    lastRefuelDate?: Date;
    odometerReadingCurrent: number;
    odometerReadingPrevious: number;
    totalDistanceTravelled: number;
    totalFuelCost: number;
    totalLitersLoaded: number;
    totalLitersLoadedPrevious: number;
    vehicleId: number;
}
