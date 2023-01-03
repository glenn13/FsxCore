import {BaseEntity} from '../../base';

export interface SkillLevel extends BaseEntity {
    title: string,
}

export const newSkillLevel = (): SkillLevel => ({
    id : 0,
    title : '',
});

export { SkillLevel as default };