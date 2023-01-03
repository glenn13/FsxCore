// import {StandardEntry} from './../../StandardEntry';

// export interface ContractType extends StandardEntry {}

// export const newContractType = (): ContractType => ({
//     id : 0,
//     code : '',
//     title : '',
//     description : ''
// });

// export { ContractType as default }


import {BaseEntity} from '../../base';

export interface ContractType extends BaseEntity {
    title: string;
}

export const newContractType = (): ContractType => ({
  id: 0,
  title: '',
});

export {ContractType as default};
