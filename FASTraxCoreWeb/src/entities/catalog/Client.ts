import {Country} from '../global/Country';

export interface Client {
  id: number;
  countryId: number;
  name: string;
  websiteUrl: string;

  country?: Country;
}
