import CustomField from "./CustomField";

export interface EntityCustomField {
  id: number;
  value: string;
  customFieldId: number;

  customField?: CustomField;
}

export interface GeneralCustomField extends EntityCustomField {
  generalId: number;
}

export interface VehicleCustomField extends EntityCustomField {
  vehicleId: number;
}

export interface ComponentCustomField extends EntityCustomField {
  componentId: number;
}
