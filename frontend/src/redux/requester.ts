import axios, { AxiosResponse, AxiosError, AxiosRequestConfig } from 'axios';

type Method = 'get' | 'post' | 'put' | 'patch' | 'delete';

type Props = {
  url: string
  method: Method
  params: any
}

const setConf = ({ isCredentials= false, token }: { isCredentials?: boolean; token?: string }): AxiosRequestConfig => {
  return {
    withCredentials: isCredentials, // Only true when get token or login
    headers: {
      Accept: 'applicaiton/json',
      'Content-Type': 'application/json',
      Authorization: token ? 'Bearer ' + token : null
    }
  };
};

export const responseBody = (response: AxiosResponse) => response.data;
export const errorBody = (error: AxiosError) => error.response?.data ? error.response.data : error.response;
const put = (url: string, data = {}, config: AxiosRequestConfig) => axios.put(url, data, { ...config });

export const getToken = (props: Props) => {
  return axios.get(process.env.REACT_APP_API_REFRESH_TOKEN_URL ?? '', setConf({ isCredentials: true }))
    .then((rs) => {
      sessionStorage.setItem('accessToken', rs.data.accessToken);
      return requester[props.method](props.url, props.params, false, rs.data.accessToken);
    })
    .catch(errorBody);
};

const get = (url: string, params = {}, config: AxiosRequestConfig) => axios.get(url, { params, ...config });
const post = (url: string, data = {}, config: AxiosRequestConfig) => axios.post(url, data, { ...config });

const requester: any = {
  get: (url: string, params = {}, retry?: boolean, token?: string) => {
    return get(url, params, setConf({ token }))
      .then(responseBody)
      .catch((e) => {
        if (retry && e.response.status === 401) {
          return getToken({ method: 'get', url, params });
        } else {
          return errorBody(e);
        }
      });
  },
  post: (url: string, data = {}, retry?: boolean, token?: string) => {
    return post(url, data, setConf({ token }))
      .then(responseBody)
      .catch((e) => {
        if (retry && e.response.status === 401) {
          return getToken({ method: 'post', url, params: data });
        }
        return errorBody(e);
      });
  },
  put: (url: string, data = {}, retry?: boolean, token?: string) => {
    return put(url, data, setConf({ token }))
      .then(responseBody)
      .catch((e) => {
        if (retry && e.response.status === 401) {
          return getToken({ method: 'put', url, params: data });
        }
        return errorBody(e);
      });
  },
};

export default requester;
