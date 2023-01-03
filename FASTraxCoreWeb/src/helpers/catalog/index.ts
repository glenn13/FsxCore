export default {
  get users() {
    const base = `/users`;
    return {
      all: base,
      find: (id: UrlParam) => `${base}/${id}`,
      updateUser: (id: UrlParam) => `${base}/${id}`,
      changePassword: `${base}/changePassword`,

      get projects() {
        return {
          findSitesByUserId: (userId: number) => `${this.all}/${userId}/projectsites`,
        };
      },

      get statuses() {
        const base = `${this.all}/standardentries/userstatuses`;
        return {
          all: base,
        };
      },

      get sessions() {
        const base = `${this.all}/sessions`;
        return {
          all: base,
        };
      },
    };
  },
  get projects() {
    const base = `/projects`;
    return {
      all: base,
      find: (id: UrlParam, forProjectSelection: boolean = false) =>
        `${base}/${id}?forProjectSelection=${forProjectSelection}`,
      findProjectsByUserId: (userId: string | number) => `${base}/users/${userId}`,
      updateProject: (id: string | number) => `${base}/${id}`,

      get sites() {
        return {
          all: `${this.all}/sites`,
          findByProject: (projectid: number) => `${this.all}/${projectid}/sites`,
        };
      },

      get assetCategories() {
        const base = `${this.all}/projectAssetCategories`;
        return {
          base,
          findByProjectId: (id: UrlParam) => `${base}/project/${id}`,
        };
      },

      get SE() {
        const base = `${this.all}/standardentries`;
        return {
          base,
          groups: `${base}/groups`,
          statuses: `${base}/statuses`,
        };
      },
    };
  },

  get projectSites() {
    const base = `/projectsites`;
    return {
      base,
      findByCustomerId: (customerId: string | number | null) => `${base}?customerId=${customerId}`,
      findByProjectId: (id: string | number) => `${base}/project/${id}`,
    };
  },

  get projectRoles() {
    const base = `/projectroles`;
    return {
      base,
      static: `${base}/static`,
      findByProjectId: (id: UrlParam) => `${base}/project/${id}`,
    };
  },

  get pages() {
    const base = `/pages`;
    return {
      base,
      get modules() {
        const base = `${this.base}/modules`;
        return {
          base,
          get permissions() {
            const base = `${this.base}/permissions`;
            return {
              base,
              find: (
                roleId: string | number,
                userId: string | number,
                projectSiteId: string | number,
              ) => `${base}/user/${userId}/projectSite/${projectSiteId}/role/${roleId}`,
            };
          },
        };
      },
      get actions() {
        const base = `${this.base}/actions`;
        return {
          base,
          get permissions() {
            const base = `${this.base}/permissions`;
            return {
              base,
              find: (
                roleId: string | number,
                userId: string | number,
                projectSiteId: string | number,
              ) => `${base}/user/${userId}/projectSite/${projectSiteId}/role/${roleId}`,
            };
          },
        };
      },
      get permissions() {
        const base = `${this.base}/permissions`;
        return {
          base,
          findByRole: (roleId: UrlParam) => `${base}/role/${roleId}`,
          findByUserRoleProjectSite: (
            roleId: string | number,
            userId: string | number,
            projectSiteId: string | number,
          ) => `${base}/user/${userId}/projectSite/${projectSiteId}/role/${roleId}`,
        };
      },
    };
  },

  get modules() {
    const base = `/catalog`;
    return {
      list: () => `${base}/modules`,
    };
  },

  get countries () {
    const base = `/countries`;
    return {
      all: `${base}`, 
      find: (id: UrlParam) => `${this.countries.all}/${id}`
    }
  },
  get formPages() {
    return {
      all: `/formpages`,
    };
  },

};
