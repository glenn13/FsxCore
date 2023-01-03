export default {
  all: `/crm`,
  get sales() {
    return {
      base: `${this.all}/sales`,
      get customers() {
        return {
            all: `${this.base}/customers`,
        };
      },
    };
  },
  get SE() {
    return {
      base: `${this.all}/standardentries`, 

      get contractTypes() {
        return {
          all: `${this.base}/contracttypes`,
          find: (id: UrlParam) => `${this.contractTypes.all}/${id}`,
        };
      },
      get customerTiers() {
        return {
          all: `${this.base}/customertiers`,
          find: (id: UrlParam) => `${this.customerTiers.all}/${id}`,
        };
      },
      get customerGroups() {
        return {
          all: `${this.base}/customergroups`,
          find: (id: UrlParam) => `${this.customerGroups.all}/${id}`,
        };
      },
      get customerTypes() {
        return {
          all: `${this.base}/customertypes`,
          find: (id: UrlParam) => `${this.customerTypes.all}/${id}`,
        };
      },
      get customerPersonnelPositions() {
        return {
          all: `${this.base}/customerpersonnelpositions`,
          find: (id: UrlParam) => `${this.customerPersonnelPositions.all}/${id}`,
        };
      },
      get creditTerms() {
        return {
          all: `${this.base}/creditterms`,
          find: (id: UrlParam) => `${this.creditTerms.all}/${id}`,
        };
      },
    }
  }
};
