import { BaseEntity } from "@app/entities/base";
import Country from '@app/entities/catalog/Country';
import Personnel from '@app/entities/hr/Personnel';
import { Project, ProjectSite } from "../catalog";

export default interface PersonnelWorkHistory extends BaseEntity {

    id: number;
    tempId: number;
    personnelId: number;
    projectId: number;
    projectSiteId: number;
    humanResourceDepartmentId: number;
    humanResourcePositionId: number;
    fromDate: Date;
    toDate: Date;
    basicPay: string;
    reportingToPersonnelId: number;

    project: Project | undefined;
    projectSite: ProjectSite | undefined;
    personnel: Personnel | undefined;
    reportingPesonnel: Personnel | undefined;
}
