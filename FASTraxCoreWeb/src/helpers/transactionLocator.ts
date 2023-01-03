import endpoints from '@app/helpers/endpoints';

enum CategoryEnum {
  VEHICLE = 'Vehicle',
  COMPONENT = 'Compoennt',
  GENERALASSET = 'General Asset',
}

export const findUriPath = (moduleName: string, category: string, referenceId: number) => {
  const transactionName = `${moduleName}${category ? ` - ${category}` : ''}`;

  switch (transactionName) {
    case `Disposition - ${String(CategoryEnum.VEHICLE)}`:
      return `/app/asset/disposition/vehicle/${referenceId}`;
      break;
    case `Disposition - ${String(CategoryEnum.COMPONENT)}`:
      return `/app/asset/disposition/component/${referenceId}`;
      break;
    case `Disposition - ${String(CategoryEnum.GENERALASSET)}`:
      return `/app/asset/disposition/generalasset/${referenceId}`;
      break;

    case `Inspection - ${String(CategoryEnum.VEHICLE)}`:
      return `/app/maintenance/inspection/vehicles/${referenceId}`;
      break;
    case `Inspection - ${String(CategoryEnum.COMPONENT)}`:
      return `/app/maintenance/inspection/component/${referenceId}`;
      break;
    case `Inspection - ${String(CategoryEnum.GENERALASSET)}`:
      return `/app/maintenance/inspection/generalassets/${referenceId}`;
      break;

    case `Work Order - ${String(CategoryEnum.VEHICLE)}`:
      return `/app/maintenance/workorder/${referenceId}/vehicle`;
      break;
    case `Work Order - ${String(CategoryEnum.COMPONENT)}`:
      return `/app/maintenance/workorder/${referenceId}/component`;
      break;
    case `Work Order - ${String(CategoryEnum.GENERALASSET)}`:
      return `/app/maintenance/workorder/${referenceId}/generalasset`;
      break;

    case `Work Estimate - ${String(CategoryEnum.VEHICLE)}`:
      return `/app/maintenance/estimate/${referenceId}/vehicle`;
      break;
    case `Work Estimate - ${String(CategoryEnum.COMPONENT)}`:
      return `/app/maintenance/estimate/${referenceId}/component`;
      break;
    case `Work Estimate - ${String(CategoryEnum.GENERALASSET)}`:
      return `/app/maintenance/estimate/${referenceId}/generalasset`;
      break;
    default:
      break;
  }
};

export default {findUriPath};
