import { BaseEntity } from "@app/entities/base";

export default interface Country extends BaseEntity {

    id: number;
    title: string;
}

// export interface Country {
//     id: number;
//     title: string;
// }