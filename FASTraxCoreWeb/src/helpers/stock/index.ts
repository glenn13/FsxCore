export default {
    base: `/stock`,
    get SE() {
        return {
            all: `${this.base}/standardentries`,
            get stockCategory() {
                return {
                    all: `${this.all}/stockcategory`,
                    find: (id: number) => `${this.stockCategory.all}/${id}`
                };
            },
            get stockDepartment() {
                return {
                    all: `${this.all}/stockdepartment`,
                    find: (id: number) => `${this.stockDepartment.all}/${id}`
                };
            },
            get stockVersion() {
                return {
                    all: `${this.all}/stockversion`,
                    find: (id: number) => `${this.stockVersion.all}/${id}`
                };
            },
            get stockSeries() {
                return {
                    all: `${this.all}/stockseries`,
                    find: (id: number) => `${this.stockSeries.all}/${id}`
                };
            },
            get unitType() {
                return {
                    all: `${this.all}/unittype`,
                    find: (id: number) => `${this.unitType.all}/${id}`
                };
            },
            get stockLocation() {
                return {
                    all: `${this.all}/stocklocation`,
                    find: (id: number) => `${this.stockLocation.all}/${id}`
                };
            },
            get stockLocationShelf() {
                return {
                    all: `${this.all}/stocklocationshelf`,
                    find: (id: number) => `${this.stockLocationShelf.all}/${id}`
                };
            },
            get stockCondition() {
                return {
                    all: `${this.all}/stockcondition`,
                    find: (id: number) => `${this.stockCondition.all}/${id}`
                };
            },
            get stockConditionStatusCode() {
                return {
                    all: `${this.all}/stockconditionstatuscode`,
                    find: (id: number) => `${this.stockConditionStatusCode.all}/${id}`
                };
            },
            get stockConditionDispositionCode() {
                return {
                    all: `${this.all}/stockconditiondispositioncode`,
                    find: (id: number) => `${this.stockConditionDispositionCode.all}/${id}`
                };
            },
            get commodityBrand() {
                return {
                    all: `${this.all}/commoditybrand`,
                    find: (id: number) => `${this.commodityBrand.all}/${id}`
                };
            },
            get commodityDepartment() {
                return {
                    all: `${this.all}/commoditydepartment`,
                    find: (id: number) => `${this.commodityDepartment.all}/${id}`
                };
            },
            get commodityGroup() {
                return {
                    all: `${this.all}/commoditygroup`,
                    find: (id: number) => `${this.commodityGroup.all}/${id}`
                };
            },
            get commodityModel() {
                return {
                    all: `${this.all}/commoditymodel`,
                    find: (id: number) => `${this.commodityModel.all}/${id}`
                };
            },
            get commoditySize() {
                return {
                    all: `${this.all}/commoditysize`,
                    find: (id: number) => `${this.commoditySize.all}/${id}`
                };
            },
            get commodityItemNameGroup() {
                return {
                    all: `${this.all}/commodityitemnamegroup`,
                    find: (id: number) => `${this.commodityItemNameGroup.all}/${id}`
                };
            },
            get commodityItemName() {
                return {
                    all: `${this.all}/commodityitemname`,
                    find: (id: number) => `${this.commodityItemName.all}/${id}`
                };
            },
        }
    }
}