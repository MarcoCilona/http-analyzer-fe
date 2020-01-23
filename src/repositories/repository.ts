import axios, { AxiosPromise } from 'axios';

const repository = axios.create({
  baseURL: 'https://api.myjson.com/bins',
});

export default {
  getRequest(requestHashCode: string): AxiosPromise<any> {
    return repository.get(`/${requestHashCode}`);
  },
  submitRequest(request: any): AxiosPromise<any> {
    return repository.post('', request);
  },
};
