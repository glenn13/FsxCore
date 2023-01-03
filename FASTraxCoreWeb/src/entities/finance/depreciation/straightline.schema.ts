import { DepreciationPeriodTypeEnum } from "@app/helpers/finance/enum";

export const newStraightLineVariable = (): StraightLineVariable => ({
    acquisitionDate: new Date(),
    depreciationValue: 0,
    depreciationRate: 0,
    usefulLife: 36, 
    purchaseCost: 0,
    residualCost: 25
});

export const newStraightLineDetail = (): StraightLineDetail=> ({
    depreciationAmount: 0,
    depreciationRate: 0,
    purchaseCost: 0,
    residualCost: 0,
    usefulLife: 0
});


export const newStraightLineEntity = (): StraightLineEntity=> ({
    straightLineVariable: newStraightLineVariable(),
    straightLineDetail: [],
    depreciationPeriodTypeId: Number(DepreciationPeriodTypeEnum.Monthly) // Default to monthly since currently there's no other Depreciation Period Type to be selected
});



