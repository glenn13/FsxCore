const baseUri = 'https://mapon.com/api';

export default {
  get reefer() {
    const base = `${baseUri}/v1/reefer`;

    return {
      alerts: `${base}/alert_list.json`,
    };
  },
};
