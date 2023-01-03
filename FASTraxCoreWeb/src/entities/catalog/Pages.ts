export interface PageModuleAccess {
  id: number;
  accessModuleId: number;
  parentAccessModuleId: number | null;
  moduleName: string;
  moduleKeyLabel: string;
  visible: boolean;
  children?: Array<PageModuleAccess>;
}

export interface ModulePermissionDefault {
  displayName: string;
  name: string;
  parentName: string;
  editable: boolean;
  visible: boolean;
  referenceId: number;
  isModule: boolean;
  roleId: number;
  accessModuleId: number;
}

export interface ModulePermissionCustom {
  displayName: string;
  name: string;
  parentName: string;
  editable: boolean;
  visible: boolean;
  referenceId: number;
  isModule: boolean;
  roleId: number;
  userId: number;
  projectSiteId: number;
  accessModuleId: number;
}
