export default {
    all: `/notification`,
    get standard() {
      return {
        base: `${this.all}/standard-notifications`,
      };
    },
    get forApprovals() {
      return {
        base: `${this.all}/for-approval-notifications`,
      };
    },
  };
  