import http from '../http.service';
import uri from '../../helpers/endpoints';
import {ModuleForm} from '../../entities/global/ModuleForm';

export const getModules = () => {
  return http.get<ModuleForm>('');
};

export const getModuleForms = () => {
  return http.get<ModuleForm[]>('');
};

export const getModuleFormGeneralAsset = () => {
  return http.get<ModuleForm>(uri.global.modules.assetManagement.forms.general);
};

export const getModuleFormVehicle = () => {
  return http.get<ModuleForm>(uri.global.modules.assetManagement.forms.vehicle);
};

export const getModuleFormComponent = () => {
  return http.get<ModuleForm>(uri.global.modules.assetManagement.forms.component);
};

export default {
  get: {
    all: getModules,
    forms: {
      all: getModuleForms,
      asset: {
        generals: getModuleFormGeneralAsset,
        vehicles: getModuleFormVehicle,
        components: getModuleFormComponent,
      },
    },
  },
};
