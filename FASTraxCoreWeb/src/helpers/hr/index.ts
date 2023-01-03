export default {
  all: `/hr`,
  get SE() {
    return {
      base: `${this.all}/standardentries`,
      get departments() {
        return {
          all: `${this.base}/departments`,
          find: (id: UrlParam) => `${this.departments.all}/${id}`,
        };
      },
      get personnelpositions() {
        return {
          all: `${this.base}/positions`,
          find: (id: UrlParam) => `${this.personnelpositions.all}/${id}`,
        };
      },
      get skilllevels() {
        return {
          all: `${this.base}/skilllevels`,
          find: (id: UrlParam) => `${this.skilllevels.all}/${id}`,
        };
      },
      get categories () {
        return {
          all: `${this.base}/categories`, 
          find: (id: UrlParam) => `${this.categories.all}/${id}`
        }
      },
      get status () {
        return {
          all: `${this.base}/status`, 
          default: () => `${this.status.all}/default`,
          find: (id: UrlParam) => `${this.status.all}/${id}`
        }
      }, 
      get jobcodes () {
        return {
          all: `${this.base}/jobcodes`, 
          find: (id: UrlParam) => `${this.jobcodes.all}/${id}`
        }
      },
      get personnelgroups () {
        return {
          all: `${this.base}/groups`, 
          find: (id: UrlParam) => `${this.personnelgroups.all}/${id}`
        }
      },
      get nationalities () {
        return {
          all: `${this.base}/nationalities`, 
          find: (id: UrlParam) => `${this.nationalities.all}/${id}`
        }
      },
      get maritalstatus () {
        return {
          all: `${this.base}/maritalstatus`, 
          default: () => `${this.maritalstatus.all}/default`,
          find: (id: UrlParam) => `${this.maritalstatus.all}/${id}`
        }
      },
      get contracttype () {
        return {
          all: `${this.base}/contracttype`, 
          find: (id: UrlParam) => `${this.contracttype.all}/${id}`
        }
      },
    };
  },
  get personnels() { 
    return {
      base: `${this.all}/personnel`,
      find: (id: UrlParam) => `${this.personnels.base}/${id}`,
      findFullInfo: (id: UrlParam) => `${this.personnels.base}/${id}`,
      update: (id: UrlParam) => `${this.personnels.base}/${id}`,
      getPersonnelWorkPermit: (id: UrlParam) => `${this.personnels.base}/${id}/work/permit`,
      postPersonnelWorkPermit: (id: UrlParam) => `${this.personnels.base}/${id}/work/permit`,
      patchPersonnelWorkPermit: (id: UrlParam) => `${this.personnels.base}/${id}/work/permit`,
      deletePersonnelWorkPermit: (id: UrlParam) => `${this.personnels.base}/${id}/work/permit`,
      getPersonnelWorkVisa: (id: UrlParam) => `${this.personnels.base}/${id}/work/visa`,
      postPersonnelWorkVisa: (id: UrlParam) => `${this.personnels.base}/${id}/work/visa`,
      patchPersonnelWorkVisa: (id: UrlParam) => `${this.personnels.base}/${id}/work/visa`,
      deletePersonnelWorkVisa: (id: UrlParam) => `${this.personnels.base}/${id}/work/visa`,
      getPersonnelBankAccount: (id: UrlParam) => `${this.personnels.base}/${id}/bankaccount`,
      postPersonnelBankAccount: (id: UrlParam) => `${this.personnels.base}/${id}/bankaccount`,
      patchPersonnelBankAccount: (id: UrlParam) => `${this.personnels.base}/${id}/bankaccount`,
      deletePersonnelBankAccount: (id: UrlParam) => `${this.personnels.base}/${id}/bankaccount`,
      getPersonnelAddress: (id: UrlParam) => `${this.personnels.base}/${id}/address`,
      postPersonnelAddress: (id: UrlParam) => `${this.personnels.base}/${id}/address`,
      patchPersonnelAddress: (id: UrlParam) => `${this.personnels.base}/${id}/address`,
      deletePersonnelAddress: (id: UrlParam) => `${this.personnels.base}/${id}/address`,
      getPersonnelWorkOtherClearance: (id: UrlParam) => `${this.personnels.base}/${id}/work/otherclearance`,
      postPersonnelWorkOtherClearance: (id: UrlParam) => `${this.personnels.base}/${id}/work/otherclearance`,
      patchPersonnelWorkOtherClearance: (id: UrlParam) => `${this.personnels.base}/${id}/work/otherclearance`,
      deletePersonnelWorkOtherClearance: (id: UrlParam) => `${this.personnels.base}/${id}/work/otherclearance`,
      
      getPersonnelImageAttachment: (id: UrlParam) => `${this.personnels.base}/${id}/customfield/imageattachment`,
      postPersonnelImageAttachment: (id: UrlParam) => `${this.personnels.base}/${id}/customfield/imageattachment`,
      patchPersonnelImageAttachment: (id: UrlParam) => `${this.personnels.base}/${id}/customfield/imageattachment`,
      deletePersonnelImageAttachment: (id: UrlParam) => `${this.personnels.base}/${id}/customfield/imageattachment`,
      
      getPersonnelDocumentAttachment: (id: UrlParam) => `${this.personnels.base}/${id}/customfield/documentattachment`,
      postPersonnelDocumentAttachment: (id: UrlParam) => `${this.personnels.base}/${id}/customfield/documentattachment`,
      patchPersonnelDocumentAttachment: (id: UrlParam) => `${this.personnels.base}/${id}/customfield/documentattachment`,
      deletePersonnelDocumentAttachment: (id: UrlParam) => `${this.personnels.base}/${id}/customfield/documentattachment`,

      getPersonnelWorkHistory: (id: UrlParam) => `${this.personnels.base}/${id}/work/history`,
    };
  },
};
