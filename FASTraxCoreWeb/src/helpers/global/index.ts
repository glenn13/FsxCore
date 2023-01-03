import {generateArrayQuery} from './../../services/http.service';

export default {
  all: `/global`,
  get modules() {
    return {
      all: `${this.all}/modules`,
      get assetManagement() {
        return {
          all: `${this.all}/asset-management`,
          get forms() {
            return {
              all: `${this.all}/forms`,
              get general() {
                return `${this.all}/general-asset`;
              },
              get vehicle() {
                return `${this.all}/vehicle`;
              },
              get component() {
                return `${this.all}/component`;
              },
            };
          },
        };
      },
    };
  },
  get attachments() {
    return {
      all: `${this.all}/attachments`,
      base64: (ids: number[]) => `${this.attachments.all}/base64?${generateArrayQuery('ids', ids)}`,
    };
  },
};
