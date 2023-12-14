import axios from 'axios';
import { useQuery, useQueryClient } from '@tanstack/react-query'

const client = axios.create({
	timeout: 8000,
	headers: {
		Accept: 'application/json',
	},
});

client.interceptors.response.use(
  (response) => {
    // const queryClient = useQueryClient()
    // console.log("Response in interceptor", response)
    // if (response.data.shouldInvalidate) {
    //   queryClient.invalidateQueries(response.data.invalidateQuery)
    // }
    console.log("Response in interceptor", response)
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default client;