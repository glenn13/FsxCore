export default {
  base: `/projects`,
  get projectSites() {
    return {
      find: (id: number) => `${this.base}/${id}/sites`,
    };
  },
};
