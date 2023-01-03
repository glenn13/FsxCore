interface VehicleDepreciation {

    id: number;
    depreciationMethodId?: number;
    depreciationPeriodTypeId?: number;
    vehicleId: number;
    usefulLife: number;
    residualValue: number;
}
