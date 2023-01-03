export const Dashboard = {
  base: `dashboard`,
};

export const CRM = {
  base: `crm`,
};

/* -------------------------------------------------------------------------- */
/*                         Asset Keys                                         */
/* -------------------------------------------------------------------------- */
export const Asset = {
  base: `asset`,

  get MyPanel() {
    return {
      base: `${this.base}.mypanel`,
    };
  },

  get Register() {
    return {
      base: `${this.base}.register`,
      get Vehicle() {
        return `${this.base}.vehicle`;
      },
      get Component() {
        return `${this.base}.component`;
      },
      get GeneralAsset() {
        return `${this.base}.generalasset`;
      },
    };
  },

  get Disposition() {
    return {
      base: `${this.base}.disposition`,
      get Vehicle() {
        return `${this.base}.vehicle`;
      },
      get Component() {
        return `${this.base}.component`;
      },
      get GeneralAsset() {
        return `${this.base}.generalasset`;
      },
    };
  },

  get Hire() {
    return {
      base: `${this.base}.hire`,
    };
  },

  get Report() {
    return {
      base: `${this.base}.report`,
    };
  },
};

/* -------------------------------------------------------------------------- */
/*                         Maintenance Keys                                   */
/* -------------------------------------------------------------------------- */

export const Maintenance = {
  base: `maintenance`,

  get MyPanel() {
    return {
      base: `${this.base}.mypanel`,
    };
  },

  get Estimate() {
    return {
      base: `${this.base}.estimate`,
      get Vehicle() {
        return `${this.base}.vehicle`;
      },
      get Component() {
        return `${this.base}.component`;
      },
      get GeneralAsset() {
        return `${this.base}.generalasset`;
      },
    };
  },

  get Inspection() {
    return {
      base: `${this.base}.inspection`,
      get Vehicle() {
        return `${this.base}.vehicle`;
      },
      get Component() {
        return `${this.base}.component`;
      },
      get GeneralAsset() {
        return `${this.base}.generalasset`;
      },
    };
  },

  get WorkOrder() {
    return {
      base: `${this.base}.workorder`,
      get Vehicle() {
        return `${this.base}.vehicle`;
      },
      get Component() {
        return `${this.base}.component`;
      },
      get GeneralAsset() {
        return `${this.base}.generalasset`;
      },
      get BOM() {
        return `${this.base}.bom`;
      },
    };
  },

  get Timesheet() {
    return {
      base: `${this.base}.timesheet`,
    };
  },

  get DamagedAsset() {
    return {
      base: `${this.base}.damagedasset`,
    };
  },

  get Report() {
    return {
      base: `${this.base}.report`,
    };
  },
};

/* -------------------------------------------------------------------------- */
/*                         Stock Inventory Keys                               */
/* -------------------------------------------------------------------------- */

export const Stock = {
  base: `stock`,

  get Inventory() {
    return {
      base: `${this.base}.inventory`,
    };
  },

  get Quotation() {
    return {
      base: `${this.base}.quotation`,
    };
  },

  get PurchaseOrder() {
    return {
      base: `${this.base}.purchaseorder`,
    };
  },

  get Invoice() {
    return {
      base: `${this.base}.invoice`,

      get Purchase() {
        return {
          base: `${this.base}.purchase`,
        };
      },

      get Freight() {
        return {
          base: `${this.base}.freight`,
        };
      },
    };
  },

  get Discrepancy() {
    return {
      base: `${this.base}.discrepancyreport`,
    };
  },

  get DirectReceipt() {
    return {
      base: `${this.base}.directreceipt`,
    };
  },

  get Report() {
    return {
      base: `${this.base}.report`,
    };
  },
};

/* -------------------------------------------------------------------------- */
/*                         Sales Keys                                         */
/* -------------------------------------------------------------------------- */

export const Sales = {
  base: `sales`,
};

/* -------------------------------------------------------------------------- */
/*                         Human Resource Keys                                         */
/* -------------------------------------------------------------------------- */

export const HumanResource = {
  base: `humanresource`,
  
  get Personnel() {
    return {
      base: `${this.base}.personnel`,
    };
  },
};

/* -------------------------------------------------------------------------- */
/*                         Finance Keys                                         */
/* -------------------------------------------------------------------------- */

export const Finance = {
  base: `finance`,
};

/* -------------------------------------------------------------------------- */
/*                         Setting Keys                                         */
/* -------------------------------------------------------------------------- */

export const Setting = {
  base: `settings`,

  get User() {
    return {
      base: `${this.base}.user`,
      get ChangePassword() {
        return {
          base: `${this.base}.changepassword`,
        };
      },

      get Session() {
        return {
          base: `${this.base}.session`,
        };
      },

      get Profile() {
        return {
          base: `${this.base}.profile`,
        };
      },

      get Management() {
        return {
          base: `${this.base}.management`,
        };
      },
    };
  },

  get Project() {
    return {
      base: `${this.base}.project`,
    };
  },

  get Role() {
    return {
      base: `${this.base}.role`,
    };
  },

  get StandardEntries() {
    return {
      base: `${this.base}.standardentries`,
    };
  },
};

/* -------------------------------------------------------------------------- */
/*                         Report Keys                                         */
/* -------------------------------------------------------------------------- */

export const Report = {
  base: `report`,
};
