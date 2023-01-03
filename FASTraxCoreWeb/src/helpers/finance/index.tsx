export default {
  all: `/finances`,
  get depreciationMethod() {
    return {
      base: `${this.all}/depreciationmethods`,
      get straightLine() {
        return {
          base: `${this.base}/straightline`,
        };
      },
    };
  },
  get SE() {
    return {
      base: `${this.all}/standardentries`,

      get paymentTypes() {
        return {
          all: `${this.base}/paymenttypes`,
          find: (id: UrlParam) => `${this.paymentTypes.all}/${id}`,
        };
      },
      get costCenters() {
        return {
          all: `${this.base}/costcenters`,
          find: (id: UrlParam) => `${this.costCenters.all}/${id}`,
        };
      },
      get currencies() {
        return {
          all: `${this.base}/currencies`,
          find: (id: UrlParam) => `${this.currencies.all}/${id}`,
        };
      },
      get depreciationMethods() {
        return {
          all: `${this.base}/depreciationmethods`,
          find: (id: UrlParam) => `${this.depreciationMethods.all}/${id}`,
        };
      },
      get depreciationPeriodTypes() {
        return {
          all: `${this.base}/depreciationperiodtypes`,
          find: (id: UrlParam) => `${this.depreciationPeriodTypes.all}/${id}`,
        };
      },
      get financeAccountType() {
        return {
          all: `${this.base}/financeaccounttypes`,
          find: (id: UrlParam) => `${this.financeAccountType.all}/${id}`,
        }
      },
      get financeAccountGroup() {
        return {
          all: `${this.base}/financeaccountgroups`,
          find: (id: UrlParam) => `${this.financeAccountGroup.all}/${id}`
        }
      }
    };
  },
};
