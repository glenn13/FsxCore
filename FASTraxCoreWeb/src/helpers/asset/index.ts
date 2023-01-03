import {generateArrayQuery} from './../../services/http.service';

export default {
  base: `/assets`,
  get registers() {
    return {
      base: `${this.base}/registers`,
      registerCount: () => `${this.registers.base}/count`,
      get components() {
        return {
          base: `${this.base}/components`,
          customFieldsDefault: () => `${this.components.base}/customfields/default`,
          customFields: (id: UrlParam) => `${this.components.base}/${id}/customfields`,
          delete: (id: UrlParam) => `${this.components.base}/${id}`,
          deleteCustomFields: (id: UrlParam) => `${this.components.base}/${id}/customfields`,
          deleteDepreciation: (id: UrlParam) => `${this.components.base}/${id}/depreciation`,
          deleteDepreciationDetails: (id: UrlParam) => `${this.components.base}/${id}/depreciationdetails`,
          deleteDocuments: (id: UrlParam) => `${this.components.base}/${id}/documents`,
          deleteImages: (id: UrlParam) => `${this.components.base}/${id}/images`,
          deleteRegistrationDetails: (id: UrlParam) => `${this.components.base}/${id}/registrationdetails`,
          deleteWarrantyDetails: (id: UrlParam) => `${this.components.base}/${id}/warrantydetails`,
          depreciationDetails: (id: UrlParam) => `${this.components.base}/${id}/depreciationdetails`,
          documents: (id: UrlParam) => `${this.components.base}/${id}/documents`,
          fullInfo: (id: UrlParam) => `${this.components.base}/${id}/fullinfo`,
          images: (id: UrlParam) => `${this.components.base}/${id}/images`,
          patch: (id: UrlParam) => `${this.components.base}/${id}`,
          patchCustomFields: (id: UrlParam) => `${this.components.base}/${id}/customfields`,
          patchDepreciationDetails: (id: UrlParam) => `${this.components.base}/${id}/depreciationdetails`,
          patchDocuments: (id: UrlParam) => `${this.components.base}/${id}/documents`,
          patchImages: (id: UrlParam) => `${this.components.base}/${id}/images`,
          patchRegistrationDetails: (id: UrlParam) => `${this.components.base}/${id}/registrationdetails`,
          patchWarrantyDetails: (id: UrlParam) => `${this.components.base}/${id}/warrantydetails`,
          postCustomFields: (id: UrlParam) => `${this.components.base}/${id}/customfields`,
          postDepreciationDetails: (id: UrlParam) => `${this.components.base}/${id}/depreciationdetails`,
          postDocuments: (id: UrlParam) => `${this.components.base}/${id}/documents`,
          postImages: (id: UrlParam) => `${this.components.base}/${id}/images`,
          postRegistrationDetails: (id: UrlParam) => `${this.components.base}/${id}/registrationdetails`,
          postSecondaryDetails: () => `${this.components.base}/secondarydetails`,
          postWarrantyDetails: (id: UrlParam) => `${this.components.base}/${id}/warrantydetails`,
          registrationDetails: (id: UrlParam) => `${this.components.base}/${id}/registrationdetails`,
          summaryForGrid: () => `${this.components.base}/summary`,
          warrantyDetails: (id: UrlParam) => `${this.components.base}/${id}/warrantydetails`,
          transactionHistory: (id: UrlParam) => `${this.components.base}/${id}/transactionhistories`
        }
      },
      get generalassets() {
        return {
          base: `${this.base}/generalassets`,
          customFieldsDefault: () => `${this.generalassets.base}/customfields/default`,
          customFields: (id: UrlParam) => `${this.generalassets.base}/${id}/customfields`,
          delete: (id: UrlParam) => `${this.generalassets.base}/${id}`,
          deleteCustomFields: (id: UrlParam) => `${this.generalassets.base}/${id}/customfields`,
          deleteDepreciation: (id: UrlParam) => `${this.generalassets.base}/${id}/depreciation`,
          deleteDepreciationDetails: (id: UrlParam) => `${this.generalassets.base}/${id}/depreciationdetails`,
          deleteDocuments: (id: UrlParam) => `${this.generalassets.base}/${id}/documents`,
          deleteImages: (id: UrlParam) => `${this.generalassets.base}/${id}/images`,
          deleteLinkedAssets: (id: UrlParam) => `${this.generalassets.base}/${id}/linkedassets`,
          deleteRegistrationDetails: (id: UrlParam) => `${this.generalassets.base}/${id}/registrationdetails`,
          deleteWarrantyDetails: (id: UrlParam) => `${this.generalassets.base}/${id}/warrantydetails`,
          depreciationDetails: (id: UrlParam) => `${this.generalassets.base}/${id}/depreciationdetails`,
          documents: (id: UrlParam) => `${this.generalassets.base}/${id}/documents`,
          fullInfo: (id: UrlParam) => `${this.generalassets.base}/${id}/fullinfo`,
          images: (id: UrlParam) => `${this.generalassets.base}/${id}/images`,
          itemGroups: () => `${this.generalassets.base}/itemgroups`,
          linkedAssets: (id: UrlParam) => `${this.generalassets.base}/${id}/linkedassets`,
          patch: (id: UrlParam) => `${this.generalassets.base}/${id}`,
          patchCustomFields: (id: UrlParam) => `${this.generalassets.base}/${id}/customfields`,
          patchDepreciationDetails: (id: UrlParam) => `${this.generalassets.base}/${id}/depreciationdetails`,
          patchDocuments: (id: UrlParam) => `${this.generalassets.base}/${id}/documents`,
          patchImages: (id: UrlParam) => `${this.generalassets.base}/${id}/images`,
          patchLinkedAssets: (id: UrlParam) => `${this.generalassets.base}/${id}/linkedassets`,
          patchRegistrationDetails: (id: UrlParam) => `${this.generalassets.base}/${id}/registrationdetails`,
          patchWarrantyDetails: (id: UrlParam) => `${this.generalassets.base}/${id}/warrantydetails`,
          postCustomFields: (id: UrlParam) => `${this.generalassets.base}/${id}/customfields`,
          postDepreciationDetails: (id: UrlParam) => `${this.generalassets.base}/${id}/depreciationdetails`,
          postDocuments: (id: UrlParam) => `${this.generalassets.base}/${id}/documents`,
          postImages: (id: UrlParam) => `${this.generalassets.base}/${id}/images`,
          postLinkedAssets: (id: UrlParam) => `${this.generalassets.base}/${id}/linkedassets`,
          postRegistrationDetails: (id: UrlParam) => `${this.generalassets.base}/${id}/registrationdetails`,
          postSecondaryDetails: () => `${this.generalassets.base}/secondarydetails`,
          postWarrantyDetails: (id: UrlParam) => `${this.generalassets.base}/${id}/warrantydetails`,
          registrationDetails: (id: UrlParam) => `${this.generalassets.base}/${id}/registrationdetails`,
          toLinkedAssets: (id: UrlParam) => `${this.generalassets.base}/${id}/tolinkedassets`,
          warrantyDetails: (id: UrlParam) => `${this.generalassets.base}/${id}/warrantydetails`,
          transactionHistory: (id: UrlParam) => `${this.generalassets.base}/${id}/transactionhistories`
        }
      },
      get vehicles() {
        return {
          base: `${this.base}/vehicles`,
          armourDetails: (id: UrlParam) => `${this.vehicles.base}/${id}/armourdetails`,
          customFields: (id: UrlParam) => `${this.vehicles.base}/${id}/customfields`,
          customFieldsDefault: () => `${this.generalassets.base}/customfields/default`,
          delete: (id: UrlParam) => `${this.vehicles.base}/${id}`,
          deleteArmourDetails: (id: UrlParam) => `${this.vehicles.base}/${id}/armourdetails`,
          deleteCustomFields: (id: UrlParam) => `${this.vehicles.base}/${id}/customfields`,
          deleteDepreciation: (id: UrlParam) => `${this.vehicles.base}/${id}/depreciation`,
          deleteDepreciationDetails: (id: UrlParam) => `${this.vehicles.base}/${id}/depreciationdetails`,
          deleteDocuments: (id: UrlParam) => `${this.vehicles.base}/${id}/documents`,
          deleteEngineHistory: (id: UrlParam) => `${this.vehicles.base}/${id}/enginehistory`,
          deleteFuelMonitoring: (id: UrlParam) => `${this.vehicles.base}/${id}/fuelmonitoring`,
          deleteImages: (id: UrlParam) => `${this.vehicles.base}/${id}/images`,
          deleteLinkedAssets: (id: UrlParam) => `${this.vehicles.base}/${id}/linkedassets`,
          deleteOdometerHistory: (id: UrlParam) => `${this.vehicles.base}/${id}/odometerhistory`,
          deleteRegistrationDetails: (id: UrlParam) => `${this.vehicles.base}/${id}/registrationdetails`,
          deleteWarrantyDetails: (id: UrlParam) => `${this.vehicles.base}/${id}/warrantydetails`,
          depreciationDetails: (id: UrlParam) => `${this.vehicles.base}/${id}/depreciationdetails`,
          documents: (id: UrlParam) => `${this.vehicles.base}/${id}/documents`,
          engineHistory: (id: UrlParam) => `${this.vehicles.base}/${id}/enginehistory`,
          fullInfo: (id: UrlParam) => `${this.vehicles.base}/${id}/fullinfo`,
          fuelMonitoring: (id: UrlParam) => `${this.vehicles.base}/${id}/fuelmonitoring`,
          images: (id: UrlParam) => `${this.vehicles.base}/${id}/images`,
          linkedAssets: (id: UrlParam) => `${this.vehicles.base}/${id}/linkedassets`,
          odometerHistory: (id: UrlParam) => `${this.vehicles.base}/${id}/odometerhistory`,
          patch: (id: UrlParam) => `${this.vehicles.base}/${id}`,
          patchArmourDetails: (id: UrlParam) => `${this.vehicles.base}/${id}/armourdetails`,
          patchCustomFields: (id: UrlParam) => `${this.vehicles.base}/${id}/customfields`,
          patchDepreciation: (id: UrlParam) => `${this.vehicles.base}/${id}/depreciation`,
          patchDepreciationDetails: (id: UrlParam) => `${this.vehicles.base}/${id}/depreciationdetails`,
          patchDocuments: (id: UrlParam) => `${this.vehicles.base}/${id}/documents`,
          patchEngineHistory: (id: UrlParam) => `${this.vehicles.base}/${id}/enginehistory`,
          patchFuelMonitoring: (id: UrlParam) => `${this.vehicles.base}/${id}/fuelmonitoring`,
          patchImages: (id: UrlParam) => `${this.vehicles.base}/${id}/images`,
          patchLinkedAssets: (id: UrlParam) => `${this.vehicles.base}/${id}/linkedassets`,
          patchOdometerHistory: (id: UrlParam) => `${this.vehicles.base}/${id}/odometerhistory`,
          patchRegistrationDetails: (id: UrlParam) => `${this.vehicles.base}/${id}/registrationdetails`,
          patchWarrantyDetails: (id: UrlParam) => `${this.vehicles.base}/${id}/warrantydetails`,
          post: (id: UrlParam) => `${this.vehicles.base}/${id}`,
          postArmourDetails: (id: UrlParam) => `${this.vehicles.base}/${id}/armourdetails`,
          postCustomFields: (id: UrlParam) => `${this.vehicles.base}/${id}/customfields`,
          postDepreciation: (id: UrlParam) => `${this.vehicles.base}/${id}/depreciation`,
          postDepreciationDetails: (id: UrlParam) => `${this.vehicles.base}/${id}/depreciationdetails`,
          postDocuments: (id: UrlParam) => `${this.vehicles.base}/${id}/documents`,
          postEngineHistory: (id: UrlParam) => `${this.vehicles.base}/${id}/enginehistory`,
          postFuelMonitoring: (id: UrlParam) => `${this.vehicles.base}/${id}/fuelmonitoring`,
          postImages: (id: UrlParam) => `${this.vehicles.base}/${id}/images`,
          postLinkedAssets: (id: UrlParam) => `${this.vehicles.base}/${id}/linkedassets`,
          postOdometerHistory: (id: UrlParam) => `${this.vehicles.base}/${id}/odometerhistory`,
          postRegistrationDetails: (id: UrlParam) => `${this.vehicles.base}/${id}/registrationdetails`,
          postWarrantyDetails: (id: UrlParam) => `${this.vehicles.base}/${id}/warrantydetails`,
          registrationDetails: (id: UrlParam) => `${this.vehicles.base}/${id}/registrationdetails`,
          summaryForGrid: () => `${this.vehicles.base}/summary`,
          toLinkedAssets: () => `${this.vehicles.base}/tolinkedassets`,
          warrantyDetails: (id: UrlParam) => `${this.vehicles.base}/${id}/warrantydetails`,
          transactionHistory: (id: UrlParam) => `${this.vehicles.base}/${id}/transactionhistories`
        }
      },
      get summary() {
        return {
          base: `${this.base}/summary`,
        };
      },
      get perRecord() {
        return {
          base: `${this.base}/perrecord`,
        };
      },
    };
  },

  get dispositions() {
    const base = `${this.base}/dispositions`;
    return {
      base,
      dispositionCount: () => `${this.dispositions.base}/count`,
      get approvers() {
        return {
          base: `${base}/approvers`,
          add: (userId: number) => `${this.approvers.base}/users/${userId}`,
        };
      },
      get generals() {
        const base = `${this.base}/dispositiongeneralasset`;
        return {
          base,
          all: `${base}`,
          find: (id: UrlParam) => `${this.generals.base}/${id}`,
          update: (id: UrlParam) => `${this.generals.base}/${id}`,
          delete: (id: UrlParam) => `${this.generals.base}/${id}`,

          damagedAreas: (id: UrlParam) => `${this.generals.base}/${id}/damagedareas`,
          postDamagedAreas: (id: UrlParam) => `${this.generals.base}/${id}/damagedareas`,
          patchDamagedAreas: (id: UrlParam) => `${this.generals.base}/${id}/damagedareas`,
          deleteDamagedAreas: (id: UrlParam) => `${this.generals.base}/${id}/damagedareas`,

          requiredRepairs: (id: UrlParam) => `${this.generals.base}/${id}/requiredrepairs`,
          postRequiredRepairs: (id: UrlParam) => `${this.generals.base}/${id}/requiredrepairs`,
          patchRequiredRepairs: (id: UrlParam) => `${this.generals.base}/${id}/requiredrepairs`,
          deleteRequiredRepairs: (id: UrlParam) => `${this.generals.base}/${id}/requiredrepairs`,

          images: (id: UrlParam) => `${this.generals.base}/${id}/images`,
          postImages: (id: UrlParam) => `${this.generals.base}/${id}/images`,
          patchImages: (id: UrlParam) => `${this.generals.base}/${id}/images`,
          deleteImages: (id: UrlParam) => `${this.generals.base}/${id}/images`,

          documents: (id: UrlParam) => `${this.generals.base}/${id}/documents`,
          postDocuments: (id: UrlParam) => `${this.generals.base}/${id}/documents`,
          patchDocuments: (id: UrlParam) => `${this.generals.base}/${id}/documents`,
          deleteDocuments: (id: UrlParam) => `${this.generals.base}/${id}/documents`,

          approvals: (id: UrlParam) => `${this.generals.base}/${id}/approvals`,
          postApprovals: (id: UrlParam) => `${this.generals.base}/${id}/approvals`,
          patchApprovals: (id: UrlParam) => `${this.generals.base}/${id}/approvals`,
          deleteApprovals: (id: UrlParam) => `${this.generals.base}/${id}/approvals`,
        };
      },
      get vehicles() {
        const base = `${this.base}/dispositionvehicle`;
        return {
          base,
          all: `${base}`,
          find: (id: UrlParam) => `${this.vehicles.base}/${id}`,
          update: (id: UrlParam) => `${this.vehicles.base}/${id}`,
          delete: (id: UrlParam) => `${this.vehicles.base}/${id}`,

          damagedAreas: (id: UrlParam) => `${this.vehicles.base}/${id}/damagedareas`,
          postDamagedAreas: (id: UrlParam) => `${this.vehicles.base}/${id}/damagedareas`,
          patchDamagedAreas: (id: UrlParam) => `${this.vehicles.base}/${id}/damagedareas`,
          deleteDamagedAreas: (id: UrlParam) => `${this.vehicles.base}/${id}/damagedareas`,

          requiredRepairs: (id: UrlParam) => `${this.vehicles.base}/${id}/requiredrepairs`,
          postRequiredRepairs: (id: UrlParam) => `${this.vehicles.base}/${id}/requiredrepairs`,
          patchRequiredRepairs: (id: UrlParam) => `${this.vehicles.base}/${id}/requiredrepairs`,
          deleteRequiredRepairs: (id: UrlParam) => `${this.vehicles.base}/${id}/requiredrepairs`,

          images: (id: UrlParam) => `${this.vehicles.base}/${id}/images`,
          postImages: (id: UrlParam) => `${this.vehicles.base}/${id}/images`,
          patchImages: (id: UrlParam) => `${this.vehicles.base}/${id}/images`,
          deleteImages: (id: UrlParam) => `${this.vehicles.base}/${id}/images`,

          documents: (id: UrlParam) => `${this.vehicles.base}/${id}/documents`,
          postDocuments: (id: UrlParam) => `${this.vehicles.base}/${id}/documents`,
          patchDocuments: (id: UrlParam) => `${this.vehicles.base}/${id}/documents`,
          deleteDocuments: (id: UrlParam) => `${this.vehicles.base}/${id}/documents`,
          
          approvals: (id: UrlParam) => `${this.vehicles.base}/${id}/approvals`,
          postApprovals: (id: UrlParam) => `${this.vehicles.base}/${id}/approvals`,
          patchApprovals: (id: UrlParam) => `${this.vehicles.base}/${id}/approvals`,
          deleteApprovals: (id: UrlParam) => `${this.vehicles.base}/${id}/approvals`,
        };
      },
      get components() {
        const base = `${this.base}/dispositioncomponent`;
        return {
          base,
          all: `${base}`,
          find: (id: UrlParam) => `${this.components.base}/${id}`,
          update: (id: UrlParam) => `${this.components.base}/${id}`,
          delete: (id: UrlParam) => `${this.components.base}/${id}`,

          damagedAreas: (id: UrlParam) => `${this.components.base}/${id}/damagedareas`,
          postDamagedAreas: (id: UrlParam) => `${this.components.base}/${id}/damagedareas`,
          patchDamagedAreas: (id: UrlParam) => `${this.components.base}/${id}/damagedareas`,
          deleteDamagedAreas: (id: UrlParam) => `${this.components.base}/${id}/damagedareas`,

          requiredRepairs: (id: UrlParam) => `${this.components.base}/${id}/requiredrepairs`,
          postRequiredRepairs: (id: UrlParam) => `${this.components.base}/${id}/requiredrepairs`,
          patchRequiredRepairs: (id: UrlParam) => `${this.components.base}/${id}/requiredrepairs`,
          deleteRequiredRepairs: (id: UrlParam) => `${this.components.base}/${id}/requiredrepairs`,

          images: (id: UrlParam) => `${this.components.base}/${id}/images`,
          postImages: (id: UrlParam) => `${this.components.base}/${id}/images`,
          patchImages: (id: UrlParam) => `${this.components.base}/${id}/images`,
          deleteImages: (id: UrlParam) => `${this.components.base}/${id}/images`,

          documents: (id: UrlParam) => `${this.components.base}/${id}/documents`,
          postDocuments: (id: UrlParam) => `${this.components.base}/${id}/documents`,
          patchDocuments: (id: UrlParam) => `${this.components.base}/${id}/documents`,
          deleteDocuments: (id: UrlParam) => `${this.components.base}/${id}/documents`,

          approvals: (id: UrlParam) => `${this.components.base}/${id}/approvals`,
          postApprovals: (id: UrlParam) => `${this.components.base}/${id}/approvals`,
          patchApprovals: (id: UrlParam) => `${this.components.base}/${id}/approvals`,
          deleteApprovals: (id: UrlParam) => `${this.components.base}/${id}/approvals`,
        };
      },
      get summary() {
        return {
          base: `${this.base}/summary`,
        };
      },
      get perRecord() {
        return {
          base: `${this.base}/perrecord`,
        };
      },
    };
  },

  //[Start] -- Need to delete this entire code
  get generals() {
    const base = `${this.base}/generals`;

    return {
      base,
      forGrid: `${base}/grid`,
      maintenance: `${base}/under-maintenance`,
      find: (id: UrlParam) => `${this.generals.base}/${id}`,
      search: (query: string) => `${this.generals.base}/search/${query}`,
      findFullInfo: (id: UrlParam, withStandardEntries: boolean = false) =>
        `${this.generals.base}/${id}/info?withStandardEntries=${withStandardEntries}`,
      update: (id: UrlParam) => `${this.generals.base}/${id}`,
      defaultImages: (ids: number[]) =>
        `${this.generals.base}/defaultImages?${generateArrayQuery('ids', ids)}`,
      images: (id: UrlParam) => `${this.generals.base}/${id}/images`,
      documents: (id: UrlParam) => `${this.generals.base}/${id}/documents`,
      linkedAssets: (id: UrlParam) => `${this.generals.base}/${id}/linkedAssets`,
      warrantyDetails: (id: UrlParam) => `${this.generals.base}/${id}/warrantydetails`,
      registrationDetails: (id: UrlParam) => `${this.generals.base}/${id}/registrationdetails`,
      get groups() {
        const base = `${this.base}/groups`;

        return {
          base,
          find: (id: UrlParam) => `${base}/${id}`,
          findByAssetName: (generalAssetNameId: UrlParam) => `${base}/names/${generalAssetNameId}`,
          findAssets: (id: number) => `${base}/${id}/assets`,
        };
      },
      get names() {
        const base = `${this.base}/names`;

        return {
          base,
          findByAssetGroup: (assetGroupId: UrlParam) => `${base}/assetGroups/${assetGroupId}`,
          find: (id: UrlParam) => `${base}/${id}`,
        };
      },
    };
  },

  get vehicles() {
    const base = `${this.base}/vehicles`;

    return {
      base,
      forGrid: `${base}/grid`,
      maintenance: `${base}/under-maintenance`,
      find: (id: UrlParam) => `${this.vehicles.base}/${id}`,
      search: (query: string) => `${this.vehicles.base}/search/${query}`,
      findFullInfo: (id: UrlParam, withStandardEntries: boolean = false) =>
        `${this.vehicles.base}/${id}/info?withStandardEntries=${withStandardEntries}`,
      update: (id: UrlParam) => `${this.vehicles.base}/${id}`,
      defaultImages: (ids: number[]) =>
        `${this.vehicles.base}/defaultImages?${generateArrayQuery('ids', ids)}`,
      images: (id: UrlParam) => `${this.vehicles.base}/${id}/images`,
      documents: (id: UrlParam) => `${this.vehicles.base}/${id}/documents`,
      linkedAssets: (id: UrlParam) => `${this.vehicles.base}/${id}/linkedAssets`,
      armourDetails: (id: UrlParam) => `${this.vehicles.base}/${id}/armourdetails`,
      warrantyDetails: (id: UrlParam) => `${this.vehicles.base}/${id}/warrantydetails`,
      registrationDetails: (id: UrlParam) => `${this.vehicles.base}/${id}/registrationdetails`,
    };
  },
  get components() {
    const base = `${this.base}/components`;

    return {
      base,
      forGrid: `${base}/grid`,
      maintenance: `${base}/under-maintenance`,
      find: (id: UrlParam) => `${this.components.base}/${id}`,
      search: (query: string) => `${this.components.base}/search/${query}`,
      findFullInfo: (id: UrlParam, withStandardEntries: boolean = false) =>
        `${this.components.base}/${id}/info?withStandardEntries=${withStandardEntries}`,
      update: (id: UrlParam) => `${this.components.base}/${id}`,
      defaultImages: (ids: number[]) =>
        `${this.components.base}/defaultImages?${generateArrayQuery('ids', ids)}`,
      images: (id: UrlParam) => `${this.components.base}/${id}/images`,
      documents: (id: UrlParam) => `${this.components.base}/${id}/documents`,
      linkedAssets: (id: UrlParam) => `${this.components.base}/${id}/linkedAssets`,
      warrantyDetails: (id: UrlParam) => `${this.components.base}/${id}/warrantydetails`,
      registrationDetails: (id: UrlParam) => `${this.components.base}/${id}/registrationdetails`,
    };
  },
  //[End]

  get SE() {
    return {
      all: `${this.base}/standardentries`,
      get assetCategory() {
        return {
          all: `${this.all}/assetcategory`,
          find: (id: number) => `${this.assetCategory.all}/${id}`,
        };
      },
      get assetColor() {
        return {
          all: `${this.all}/assetcolor`,
          find: (id: number) => `${this.assetColor.all}/${id}`,
        };
      },
      get assetDepartment() {
        return {
          all: `${this.all}/assetdepartment`,
          find: (id: number) => `${this.assetDepartment.all}/${id}`,
        };
      },
      get assetEngineType() {
        return {
          all: `${this.all}/assetenginetype`,
          find: (id: number) => `${this.assetEngineType.all}/${id}`,
        };
      },
      get assetFuelType() {
        return {
          all: `${this.all}/assetfueltype`,
          find: (id: number) => `${this.assetFuelType.all}/${id}`,
        };
      },
      get assetGroup() {
        return {
          all: `${this.all}/assetgroup`,
          find: (id: number) => `${this.assetGroup.all}/${id}`,
        };
      },
      get assetItemName() {
        return {
          all: `${this.all}/assetitemname`,
          find: (id: number) => `${this.assetItemName.all}/${id}`,
          findbygroupid: (id: number) => `${this.assetItemName.all}/group/${id}`,
        };
      },
      get assetLocation() {
        return {
          all: `${this.all}/assetlocation`,
          find: (id: number) => `${this.assetLocation.all}/${id}`,
        };
      },
      get assetManufacturer() {
        return {
          all: `${this.all}/assetmanufacturer`,
          find: (id: number) => `${this.assetManufacturer.all}/${id}`,
          findbyassettypeid: (id: number) => `${this.assetManufacturer.all}/assettype/${id}`,
        };
      },
      get assetMeterType() {
        return {
          all: `${this.all}/assetmetertype`,
          find: (id: number) => `${this.assetMeterType.all}/${id}`,
        };
      },
      get assetModel() {
        return {
          all: `${this.all}/assetmodel`,
          find: (id: number) => `${this.assetModel.all}/${id}`,
          findbymanufacturerid: (id: number) => `${this.assetModel.all}/manufacturer/${id}`,
        };
      },
      get assetModelYear() {
        return {
          all: `${this.all}/assetmodelyear`,
          find: (id: number) => `${this.assetModelYear.all}/${id}`,
          findbymodelid: (id: number) => `${this.assetModelYear.all}/model/${id}`,
        };
      },
      get assetOwnershipType() {
        return {
          all: `${this.all}/assetownershiptype`,
          find: (id: number) => `${this.assetOwnershipType.all}/${id}`,
        };
      },
      get assetSeries() {
        return {
          all: `${this.all}/assetseries`,
          find: (id: number) => `${this.assetSeries.all}/${id}`,
        };
      },
      get assetState() {
        return {
          all: `${this.all}/assetstate`,
          find: (id: number) => `${this.assetState.all}/${id}`,
        };
      },
      get assetStatus() {
        return {
          all: `${this.all}/assetstatus`,
          default: () => `${this.assetStatus.all}/default`,
          find: (id: number) => `${this.assetStatus.all}/${id}`,
        };
      },
      get assetTransmissionType() {
        return {
          all: `${this.all}/assettransmissiontype`,
          find: (id: number) => `${this.assetTransmissionType.all}/${id}`,
        };
      },
      get assetType() {
        return {
          all: `${this.all}/assettype`,
          find: (id: number) => `${this.assetType.all}/${id}`,
          findBycategoryid: (id: number) => `${this.assetType.all}/category/${id}`,
        };
      },
      //[Start] - Commented this code. Need to confirm the data list being provided
      //get assetUnit() {
      //    return {
      //        all: `${this.all}/assetunit`,
      //        find: (id: number) => `${this.assetUnit.all}/${id}`
      //    };
      //},
      //[End]
      
      get assetUOM() {
        return {
            all: `${this.all}/assetuom`,
            find: (id: number) => `${this.assetUOM.all}/${id}`,
        };
      },
      get dispositionDamagedArea() {
        return {
            all: `${this.all}/dispositiondamagedarea`,
            find: (id: number) => `${this.dispositionDamagedArea.all}/${id}`,
            findbyassettypeid: (id: number) => `${this.dispositionDamagedArea.all}/assettype/${id}`,
        };
      },
      get dispositionRequiredRepair() {
        return {
          all: `${this.all}/dispositionrequiredrepair`,
          find: (id: number) => `${this.dispositionRequiredRepair.all}/${id}`,
          findbyassettypeid: (id: number) => `${this.dispositionRequiredRepair.all}/assettype/${id}`,
        };
      },
      get dispositionStatus() {
        return {
          all: `${this.all}/dispositionstatus`,
          find: (id: number) => `${this.dispositionStatus.all}/${id}`,
        };
      },
      get dispositionApprovalStatus() {
        return {
          all: `${this.all}/dispositionapprovalstatus`,
          find: (id: number) => `${this.dispositionApprovalStatus.all}/${id}`,
        };
      },
      get dispositionType() {
        return {
          all: `${this.all}/dispositiontype`,
          find: (id: number) => `${this.dispositionType.all}/${id}`,
        };
      },
      get generalAssetGroupItem() {
        return {
          all: `${this.all}/generalassetgroupitem`,
          find: (id: number) => `${this.generalAssetGroupItem.all}/${id}`,
          findBycategoryid: (id: number) => `${this.generalAssetGroupItem.all}/group/${id}`,
        };
      },
      get fuelTankSize() {
        return {
          all: `${this.all}/fueltanksize`,
          find: (id: number) => `${this.fuelTankSize.all}/${id}`,
        };
      },
      get warrantyType() {
        return {
          all: `${this.all}/warrantytype`,
          find: (id: number) => `${this.warrantyType.all}/${id}`,
        };
      },
      get customField() {
        return {
          all: `${this.all}/customfield`,
          find: (id: number) => `${this.customField.all}/${id}`,
        };
      },
      get customFieldType() {
        return {
          all: `${this.all}/customfieldtype`,
          find: (id: number) => `${this.customFieldType.all}/${id}`,
        };
      },
    }
  },
}
