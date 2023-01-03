export default {
  base: `/scm`,
  get procurement() {
    return {
      all: `${this.base}/procurement`,
      get suppliers() {
        return {
          all: `${this.all}/suppliers`,
        };
      },
    };
  },
};
