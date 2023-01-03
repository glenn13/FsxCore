import {useQuery} from 'react-query';
import http from '@app/services/http.service';
import {Country} from '@app/entities/global/Country';
import {trackPromise} from 'react-promise-tracker';
import {FsxUri} from '@app/helpers/endpoints';
import {generateUUID} from '@app/helpers/randoms';

export const KEY = generateUUID();
const COUNTRIES = 'COUNTRIES';

export const useCountries = () => {
    const getCountries = async () => {
        const {data} = await http.get('catalog/standardentries/countries');
        return data as Array<Country>;
    };
    const result = useQuery(COUNTRIES, async () => trackPromise(getCountries()));

    return {...result, countries: result.data};
};


export const getCountryList = () => {
    return http.get<Country[]>(FsxUri.catalog.countries.all);
}
 
// export const useCountryList = () => useQuery(KEY, getCountryList);