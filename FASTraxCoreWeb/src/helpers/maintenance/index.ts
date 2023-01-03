export default {
  base: `/maintenances`,

  get estimate() {
    return {
      base: `${this.base}/estimate`,
      summaryForGrid: () => `${this.estimate.base}/summary`,
    };
  },
  get estimatecomponent() {
    return {
      base: `${this.base}/estimate/estimatecomponent`,
      additionalcharges: (id: UrlParam) => `${this.estimatecomponent.base}/${id}/additionalcharges`,
      delete: (id: UrlParam) => `${this.estimatecomponent.base}/${id}`,
      deleteAdditionalCharges: (id: UrlParam) =>
        `${this.estimatecomponent.base}/${id}/additionalcharges`,
      deleteDocuments: (id: UrlParam) => `${this.estimatecomponent.base}/${id}/documents`,
      deleteImages: (id: UrlParam) => `${this.estimatecomponent.base}/${id}/images`,
      deleteMaterials: (id: UrlParam) => `${this.estimatecomponent.base}/${id}/materials`,
      documents: (id: UrlParam) => `${this.estimatecomponent.base}/${id}/documents`,
      findFullInfo: (id: UrlParam) => `${this.estimatecomponent.base}/${id}/fullinfo`,
      images: (id: UrlParam) => `${this.estimatecomponent.base}/${id}/images`,
      materials: (id: UrlParam) => `${this.estimatecomponent.base}/${id}/materials`,
      patchAdditionalCharges: (id: UrlParam) =>
        `${this.estimatecomponent.base}/${id}/additionalcharges`,
      patchDocuments: (id: UrlParam) => `${this.estimatecomponent.base}/${id}/documents`,
      patchImages: (id: UrlParam) => `${this.estimatecomponent.base}/${id}/images`,
      patchMaterials: (id: UrlParam) => `${this.estimatecomponent.base}/${id}/materials`,
      postAdditionalCharges: (id: UrlParam) =>
        `${this.estimatecomponent.base}/${id}/additionalcharges`,
      postDocuments: (id: UrlParam) => `${this.estimatecomponent.base}/${id}/documents`,
      postImages: (id: UrlParam) => `${this.estimatecomponent.base}/${id}/images`,
      postMaterials: (id: UrlParam) => `${this.estimatecomponent.base}/${id}/materials`,
      update: (id: UrlParam) => `${this.estimatecomponent.base}/${id}`,
    };
  },
  get estimategeneralasset() {
    return {
      base: `${this.base}/estimate/estimategeneralasset`,
      additionalcharges: (id: UrlParam) =>
        `${this.estimategeneralasset.base}/${id}/additionalcharges`,
      delete: (id: UrlParam) => `${this.estimategeneralasset.base}/${id}`,
      deleteAdditionalCharges: (id: UrlParam) =>
        `${this.estimategeneralasset.base}/${id}/additionalcharges`,
      deleteDocuments: (id: UrlParam) => `${this.estimategeneralasset.base}/${id}/documents`,
      deleteImages: (id: UrlParam) => `${this.estimategeneralasset.base}/${id}/images`,
      deleteMaterials: (id: UrlParam) => `${this.estimategeneralasset.base}/${id}/materials`,
      documents: (id: UrlParam) => `${this.estimategeneralasset.base}/${id}/documents`,
      findFullInfo: (id: UrlParam) => `${this.estimategeneralasset.base}/${id}/fullinfo`,
      images: (id: UrlParam) => `${this.estimategeneralasset.base}/${id}/images`,
      materials: (id: UrlParam) => `${this.estimategeneralasset.base}/${id}/materials`,
      patchAdditionalCharges: (id: UrlParam) =>
        `${this.estimategeneralasset.base}/${id}/additionalcharges`,
      patchDocuments: (id: UrlParam) => `${this.estimategeneralasset.base}/${id}/documents`,
      patchImages: (id: UrlParam) => `${this.estimategeneralasset.base}/${id}/images`,
      patchMaterials: (id: UrlParam) => `${this.estimategeneralasset.base}/${id}/materials`,
      postAdditionalCharges: (id: UrlParam) =>
        `${this.estimategeneralasset.base}/${id}/additionalcharges`,
      postDocuments: (id: UrlParam) => `${this.estimategeneralasset.base}/${id}/documents`,
      postImages: (id: UrlParam) => `${this.estimategeneralasset.base}/${id}/images`,
      postMaterials: (id: UrlParam) => `${this.estimategeneralasset.base}/${id}/materials`,
      update: (id: UrlParam) => `${this.estimategeneralasset.base}/${id}`,
    };
  },
  get estimatevehicle() {
    return {
      base: `${this.base}/estimate/estimatevehicle`,
      additionalcharges: (id: UrlParam) => `${this.estimatevehicle.base}/${id}/additionalcharges`,
      delete: (id: UrlParam) => `${this.estimatevehicle.base}/${id}`,
      deleteAdditionalCharges: (id: UrlParam) =>
        `${this.estimatevehicle.base}/${id}/additionalcharges`,
      deleteDocuments: (id: UrlParam) => `${this.estimatevehicle.base}/${id}/documents`,
      deleteImages: (id: UrlParam) => `${this.estimatevehicle.base}/${id}/images`,
      deleteMaterials: (id: UrlParam) => `${this.estimatevehicle.base}/${id}/materials`,
      documents: (id: UrlParam) => `${this.estimatevehicle.base}/${id}/documents`,
      findFullInfo: (id: UrlParam) => `${this.estimatevehicle.base}/${id}/fullinfo`,
      images: (id: UrlParam) => `${this.estimatevehicle.base}/${id}/images`,
      materials: (id: UrlParam) => `${this.estimatevehicle.base}/${id}/materials`,
      patchAdditionalCharges: (id: UrlParam) =>
        `${this.estimatevehicle.base}/${id}/additionalcharges`,
      patchDocuments: (id: UrlParam) => `${this.estimatevehicle.base}/${id}/documents`,
      patchImages: (id: UrlParam) => `${this.estimatevehicle.base}/${id}/images`,
      patchMaterials: (id: UrlParam) => `${this.estimatevehicle.base}/${id}/materials`,
      postAdditionalCharges: (id: UrlParam) =>
        `${this.estimatevehicle.base}/${id}/additionalcharges`,
      postDocuments: (id: UrlParam) => `${this.estimatevehicle.base}/${id}/documents`,
      postImages: (id: UrlParam) => `${this.estimatevehicle.base}/${id}/images`,
      postMaterials: (id: UrlParam) => `${this.estimatevehicle.base}/${id}/materials`,
      update: (id: UrlParam) => `${this.estimatevehicle.base}/${id}`,
    };
  },
  get inspection() {
    return {
      base: `${this.base}/inspection`,
      summary: () => `${this.inspection.base}/summary`,
      inspectionCount: () => `${this.inspection.base}/count`,
    };
  },
  get inspectionVehicle() {
    return {
      base: `${this.base}/inspections/inspectionvehicle`,
      delete: (id: UrlParam) => `${this.inspectionVehicle.base}/${id}`,
    };
  },
  get inspectionGeneralAsset() {
    return {
      base: `${this.base}/inspections/inspectiongeneralasset`,
      delete: (id: UrlParam) => `${this.inspectionGeneralAsset.base}/${id}`,
    };
  },
  get inspectionComponent() {
    return {
      base: `${this.base}/inspections/inspectioncomponent`,
      delete: (id: UrlParam) => `${this.inspectionComponent.base}/${id}`,
    };
  },
  get workorder() {
    return {
      base: `${this.base}/workorder`,
      summaryForGrid: () => `${this.workorder.base}/summary`,
      undermaintenanceCount: () => `${this.workorder.base}/undermaintenance/count`,
    };
  },
  get workordercomponent() {
    return {
      base: `${this.base}/workorder/workordercomponent`,
      additionalcharges: (id: number | string) =>
        `${this.workordercomponent.base}/${id}/additionalcharges`,
      delete: (id: number | string) => `${this.workordercomponent.base}/${id}`,
      deleteAdditionalCharges: (id: number | string) =>
        `${this.workordercomponent.base}/${id}/additionalcharges`,
      deleteDocuments: (id: number | string) => `${this.workordercomponent.base}/${id}/documents`,
      deleteImages: (id: number | string) => `${this.workordercomponent.base}/${id}/images`,
      deleteLabours: (id: number | string) => `${this.workordercomponent.base}/${id}/labours`,
      deleteMaterials: (id: number | string) => `${this.workordercomponent.base}/${id}/materials`,
      documents: (id: number | string) => `${this.workordercomponent.base}/${id}/documents`,
      findFullInfo: (id: number | string) => `${this.workordercomponent.base}/${id}/fullinfo`,
      images: (id: number | string) => `${this.workordercomponent.base}/${id}/images`,
      labours: (id: number | string) => `${this.workordercomponent.base}/${id}/labours`,
      materials: (id: number | string) => `${this.workordercomponent.base}/${id}/materials`,
      patchAdditionalCharges: (id: number | string) =>
        `${this.workordercomponent.base}/${id}/additionalcharges`,
      patchDocuments: (id: number | string) => `${this.workordercomponent.base}/${id}/documents`,
      patchImages: (id: number | string) => `${this.workordercomponent.base}/${id}/images`,
      patchLabours: (id: number | string) => `${this.workordercomponent.base}/${id}/labours`,
      patchMaterials: (id: number | string) => `${this.workordercomponent.base}/${id}/materials`,
      postAdditionalCharges: (id: number | string) =>
        `${this.workordercomponent.base}/${id}/additionalcharges`,
      postDocuments: (id: number | string) => `${this.workordercomponent.base}/${id}/documents`,
      postImages: (id: number | string) => `${this.workordercomponent.base}/${id}/images`,
      postLabours: (id: number | string) => `${this.workordercomponent.base}/${id}/labours`,
      postMaterials: (id: number | string) => `${this.workordercomponent.base}/${id}/materials`,
      repairOperationAction: () => `${this.workordercomponent.base}/repairoperationaction`,
      repairOperationSelection: () => `${this.workordercomponent.base}/repairoperationselection`,
      update: (id: number | string) => `${this.workordercomponent.base}/${id}`,
    };
  },
  get workorderbom() {
    return {
      base: `${this.base}/workorder/workorderbom`,
      additionalcharges: (id: number | string) =>
        `${this.workorderbom.base}/${id}/additionalcharges`,
      delete: (id: number | string) => `${this.workorderbom.base}/${id}`,
      deleteAdditionalCharges: (id: number | string) =>
        `${this.workorderbom.base}/${id}/additionalcharges`,
      deleteDocuments: (id: number | string) => `${this.workorderbom.base}/${id}/documents`,
      deleteImages: (id: number | string) => `${this.workorderbom.base}/${id}/images`,
      deleteLabours: (id: number | string) => `${this.workorderbom.base}/${id}/labours`,
      deleteMaterials: (id: number | string) => `${this.workorderbom.base}/${id}/materials`,
      documents: (id: number | string) => `${this.workorderbom.base}/${id}/documents`,
      findFullInfo: (id: number | string) => `${this.workorderbom.base}/${id}/fullinfo`,
      images: (id: number | string) => `${this.workorderbom.base}/${id}/images`,
      labours: (id: number | string) => `${this.workorderbom.base}/${id}/labours`,
      materials: (id: number | string) => `${this.workorderbom.base}/${id}/materials`,
      patchAdditionalCharges: (id: number | string) =>
        `${this.workorderbom.base}/${id}/additionalcharges`,
      patchDocuments: (id: number | string) => `${this.workorderbom.base}/${id}/documents`,
      patchImages: (id: number | string) => `${this.workorderbom.base}/${id}/images`,
      patchLabours: (id: number | string) => `${this.workorderbom.base}/${id}/labours`,
      patchMaterials: (id: number | string) => `${this.workorderbom.base}/${id}/materials`,
      postAdditionalCharges: (id: number | string) =>
        `${this.workorderbom.base}/${id}/additionalcharges`,
      postDocuments: (id: number | string) => `${this.workorderbom.base}/${id}/documents`,
      postImages: (id: number | string) => `${this.workorderbom.base}/${id}/images`,
      postLabours: (id: number | string) => `${this.workorderbom.base}/${id}/labours`,
      postMaterials: (id: number | string) => `${this.workorderbom.base}/${id}/materials`,
      update: (id: number | string) => `${this.workorderbom.base}/${id}`,
    };
  },
  get workordergeneralasset() {
    return {
      base: `${this.base}/workorder/workordergeneralasset`,
      additionalcharges: (id: number | string) =>
        `${this.workordergeneralasset.base}/${id}/additionalcharges`,
      delete: (id: number | string) => `${this.workordergeneralasset.base}/${id}`,
      deleteAdditionalCharges: (id: number | string) =>
        `${this.workordergeneralasset.base}/${id}/additionalcharges`,
      deleteDocuments: (id: number | string) =>
        `${this.workordergeneralasset.base}/${id}/documents`,
      deleteImages: (id: number | string) => `${this.workordergeneralasset.base}/${id}/images`,
      deleteLabours: (id: number | string) => `${this.workordergeneralasset.base}/${id}/labours`,
      deleteMaterials: (id: number | string) =>
        `${this.workordergeneralasset.base}/${id}/materials`,
      documents: (id: number | string) => `${this.workordergeneralasset.base}/${id}/documents`,
      findFullInfo: (id: number | string) => `${this.workordergeneralasset.base}/${id}/fullinfo`,
      images: (id: number | string) => `${this.workordergeneralasset.base}/${id}/images`,
      labours: (id: number | string) => `${this.workordergeneralasset.base}/${id}/labours`,
      materials: (id: number | string) => `${this.workordergeneralasset.base}/${id}/materials`,
      patchAdditionalCharges: (id: number | string) =>
        `${this.workordergeneralasset.base}/${id}/additionalcharges`,
      patchDocuments: (id: number | string) => `${this.workordergeneralasset.base}/${id}/documents`,
      patchImages: (id: number | string) => `${this.workordergeneralasset.base}/${id}/images`,
      patchLabours: (id: number | string) => `${this.workordergeneralasset.base}/${id}/labours`,
      patchMaterials: (id: number | string) => `${this.workordergeneralasset.base}/${id}/materials`,
      postAdditionalCharges: (id: number | string) =>
        `${this.workordergeneralasset.base}/${id}/additionalcharges`,
      postDocuments: (id: number | string) => `${this.workordergeneralasset.base}/${id}/documents`,
      postImages: (id: number | string) => `${this.workordergeneralasset.base}/${id}/images`,
      postLabours: (id: number | string) => `${this.workordergeneralasset.base}/${id}/labours`,
      postMaterials: (id: number | string) => `${this.workordergeneralasset.base}/${id}/materials`,
      update: (id: number | string) => `${this.workordergeneralasset.base}/${id}`,
    };
  },
  get workordervehicle() {
    return {
      base: `${this.base}/workorder/workordervehicle`,
      additionalcharges: (id: number | string) =>
        `${this.workordervehicle.base}/${id}/additionalcharges`,
      delete: (id: number | string) => `${this.workordervehicle.base}/${id}`,
      deleteAdditionalCharges: (id: number | string) =>
        `${this.workordervehicle.base}/${id}/additionalcharges`,
      deleteDocuments: (id: number | string) => `${this.workordervehicle.base}/${id}/documents`,
      deleteImages: (id: number | string) => `${this.workordervehicle.base}/${id}/images`,
      deleteLabours: (id: number | string) => `${this.workordervehicle.base}/${id}/labours`,
      deleteMaterials: (id: number | string) => `${this.workordervehicle.base}/${id}/materials`,
      documents: (id: number | string) => `${this.workordervehicle.base}/${id}/documents`,
      findFullInfo: (id: number | string) => `${this.workordervehicle.base}/${id}/fullinfo`,
      images: (id: number | string) => `${this.workordervehicle.base}/${id}/images`,
      labours: (id: number | string) => `${this.workordervehicle.base}/${id}/labours`,
      materials: (id: number | string) => `${this.workordervehicle.base}/${id}/materials`,
      patchAdditionalCharges: (id: number | string) =>
        `${this.workordervehicle.base}/${id}/additionalcharges`,
      patchDocuments: (id: number | string) => `${this.workordervehicle.base}/${id}/documents`,
      patchImages: (id: number | string) => `${this.workordervehicle.base}/${id}/images`,
      patchLabours: (id: number | string) => `${this.workordervehicle.base}/${id}/labours`,
      patchMaterials: (id: number | string) => `${this.workordervehicle.base}/${id}/materials`,
      postAdditionalCharges: (id: number | string) =>
        `${this.workordervehicle.base}/${id}/additionalcharges`,
      postDocuments: (id: number | string) => `${this.workordervehicle.base}/${id}/documents`,
      postImages: (id: number | string) => `${this.workordervehicle.base}/${id}/images`,
      postLabours: (id: number | string) => `${this.workordervehicle.base}/${id}/labours`,
      postMaterials: (id: number | string) => `${this.workordervehicle.base}/${id}/materials`,
      update: (id: number | string) => `${this.workordervehicle.base}/${id}`,
    };
  },
  get timesheet() {
    return {
      base: `${this.base}/timesheet`,
      summary: () => `${this.timesheet.base}/summary`,
    };
  },
  get timesheetpersonnelmaintenance() {
    return {
      base: `${this.base}/timesheet`,
      summary: () => `${this.timesheetpersonnelmaintenance.base}/personnel`,
      findFullInfo: (id: number | string) => `${this.timesheetpersonnelmaintenance.base}/details/${id}`,
    };
  },
  get SE() {
    return {
      all: `${this.base}/standardentries`,
      get statuses() {
        return {
          all: `${this.all}/statuses`,
          find: (id: number) => `${this.statuses.all}/${id}`,
        };
      },

      get approvalstatuses() {
        return {
          all: `${this.all}/approvalstatuses`,
          find: (id: number) => `${this.approvalstatuses.all}/${id}`,
        };
      },

      get areaofconfirmations() {
        return {
          all: `${this.all}/areaofconfirmations`,
          find: (id: number) => `${this.areaofconfirmations.all}/${id}`,
        };
      },

      get daterangetypes() {
        return {
          all: `${this.all}/daterangetypes`,
          find: (id: number) => `${this.daterangetypes.all}/${id}`,
        };
      },

      get estimationstatuses() {
        return {
          all: `${this.all}/estimationstatuses`,
          find: (id: number) => `${this.estimationstatuses.all}/${id}`,
        };
      },

      get estimationtypes() {
        return {
          all: `${this.all}/estimationtypes`,
          find: (id: number) => `${this.estimationtypes.all}/${id}`,
        };
      },

      get maintenancedepartments() {
        return {
          all: `${this.all}/maintenancedepartments`,
          find: (id: number) => `${this.maintenancedepartments.all}/${id}`,
        };
      },

      get maintenancelocations() {
        return {
          all: `${this.all}/maintenancelocations`,
          find: (id: number) => `${this.maintenancelocations.all}/${id}`,
        };
      },

      get maintenanceschedules() {
        return {
          all: `${this.all}/maintenanceschedules`,
          find: (id: number) => `${this.maintenanceschedules.all}/${id}`,
        };
      },

      get maintenancestatuses() {
        return {
          all: `${this.all}/statuses`,
          find: (id: number) => `${this.maintenancestatuses.all}/${id}`,
          get default() {
            return `${this.all}/default`;
          },
        };
      },

      get prioritylevels() {
        return {
          all: `${this.all}/prioritylevels`,
          find: (id: number) => `${this.prioritylevels.all}/${id}`,
        };
      },

      get repairLevels() {
        return {
          all: `${this.all}/repairlevels`,
          find: (id: number) => `${this.repairLevels.all}/${id}`,
        };
      },

      get repairGroups() {
        return {
          all: `${this.all}/repairgroups`,
          find: (id: number) => `${this.repairGroups.all}/${id}`,
        };
      },

      get repairSubGroups() {
        return {
          all: `${this.all}/repairsubgroups`,
          find: (id: number) => `${this.repairSubGroups.all}/${id}`,
        };
      },

      get repairActions() {
        return {
          all: `${this.all}/repairactions`,
          find: (id: number) => `${this.repairActions.all}/${id}`,
        };
      },

      get repairTypes() {
        return {
          all: `${this.all}/repairtypes`,
          find: (id: number) => `${this.repairTypes.all}/${id}`,
        };
      },

      get repairOperations() {
        return {
          all: `${this.all}/repairoperations`,
          find: (id: number) => `${this.repairOperations.all}/${id}`,
          findByAssetCategory: (assetCategoryId: number) =>
            `${this.repairOperations.all}/categories/${assetCategoryId}`,
        };
      },

      get repaircategories() {
        return {
          all: `${this.all}/repaircategories`,
          find: (id: number) => `${this.repaircategories.all}/${id}`,
        };
      },

      get repairOperationActions() {
        const base = `${this.all}/repairoperationactions`;

        return {
          get vehicles() {
            return {
              all: `${base}/vehicles`,
            };
          },

          get components() {
            return {
              all: `${base}/components`,
            };
          },

          get generalAssets() {
            return {
              all: `${base}/generalassets`,
            };
          },
        };
      },

      get repairstatuses() {
        return {
          all: `${this.all}/repairstatuses`,
          find: (id: number) => `${this.repairstatuses.all}/${id}`,
        };
      },

      get workorderstatuses() {
        return {
          all: `${this.all}/workorderstatuses`,
          find: (id: number) => `${this.workorderstatuses.all}/${id}`,
        };
      },

      get workordertypes() {
        return {
          all: `${this.all}/workordertypes`,
          find: (id: number) => `${this.workordertypes.all}/${id}`,
        };
      },
      get inspectionAreas() {
        return {
          vehicle: `${this.all}/inspectionArea/vehicle`,
          findVehicle: (id: number) => `${this.inspectionAreas.vehicle}/${id}`,
          component: `${this.all}/inspectionArea/component`,
          findComponent: (id: number) => `${this.inspectionAreas.component}/${id}`,
          generalAsset: `${this.all}/inspectionArea/generalAsset`,
          findGeneralAsset: (id: number) => `${this.inspectionAreas.generalAsset}/${id}`,
        };
      },

      get failureCauses() {
        return {
          all: `${this.all}/failurecauses`,
          find: (id: number) => `${this.failureCauses.all}/${id}`,
        };
      },

      get typeOfFaults() {
        return {
          all: `${this.all}/typeoffaults`,
          find: (id: number) => `${this.typeOfFaults.all}/${id}`,
        };
      },

      get serviceTypes() {
        return {
          all: `${this.all}/servicetypes`,
          find: (id: number) => `${this.serviceTypes.all}/${id}`,
        };
      },

      get serviceGroups() {
        return {
          all: `${this.all}/servicegroups`,
          find: (id: number) => `${this.serviceGroups.all}/${id}`,
        };
      },
    };
  },
};
