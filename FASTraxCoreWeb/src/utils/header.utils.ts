import {decryptMe} from './encryption.util';
import {RequestHeader} from '@app/entities/RequestHeader';

const headers = decryptMe<RequestHeader>(localStorage.getItem('X-HEADERS') || '');

export default headers;