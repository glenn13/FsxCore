interface GeneralAssetLinkedAsset {
    tempId: number;

    /*Start - These are the important fields when posting to the API*/
    id: number;
    generalAssetId: number;
    linkedGeneralAssetId: number;
    /*End*/

    /*Start - These fields are for viewing purpose only*/
    assetRefId: string;
    serialNo: string;
    maintenanceStatus: string;
    hireStatus: string;
    processedBy: string;
    dateLinked:  Date,
    /*End*/
}