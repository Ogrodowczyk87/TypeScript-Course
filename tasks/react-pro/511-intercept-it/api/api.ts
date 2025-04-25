import axios from 'axios';
import type { Product } from '../model/Product';
import { InternalAxiosRequestConfig, AxiosResponse } from 'axios';

// Define threshold for what constitutes a "slow" request (in milliseconds)
const SLOW_REQUEST_THRESHOLD = 1000; // 1 second

// Extend Axios types to include metadata
interface RequestConfigWithMetadata extends InternalAxiosRequestConfig {
  metadata?: {
    startTime: number;
  };
}

function trackSlowRequests(url: string, duration: number) {
  axios.post('/api/tracker', {
    duration: duration,
    url: url,
  });
}

const productsApi = axios.create({
  baseURL: 'https://dummyjson.com',
});

// Add request interceptor to track when the request starts
productsApi.interceptors.request.use((config: RequestConfigWithMetadata) => {
  // Store request start time in config metadata
  config.metadata = { startTime: new Date().getTime() };
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Add response interceptor to calculate and track response time
productsApi.interceptors.response.use((response: AxiosResponse & {config: RequestConfigWithMetadata}) => {
  // Calculate response time
  const endTime = new Date().getTime();
  const startTime = response.config.metadata?.startTime || 0;
  const responseTime = endTime - startTime;
  
  // Only track if the request is slow (exceeds threshold)
  if (responseTime > SLOW_REQUEST_THRESHOLD) {
    const url = response.config.url || '';
    trackSlowRequests(url, responseTime);
  }
  
  return response;
}, (error) => {
  // Handle errors - still track response time for failed requests
  if (error.config?.metadata) {
    const endTime = new Date().getTime();
    const startTime = error.config.metadata.startTime;
    const responseTime = endTime - startTime;
    
    // Only track slow failed requests
    if (responseTime > SLOW_REQUEST_THRESHOLD) {
      const url = error.config.url || '';
      trackSlowRequests(url, responseTime);
    }
  }
  
  return Promise.reject(error);
});

export async function getProducts(query: string, limit = 5, delay = 0) {
  const response = await productsApi.get<{ products: Product[] }>('/products/search', {
    params: {
      q: query,
      limit: limit,
      delay: delay,
    },
  });
  return response;
}
