import axios from 'axios';

const SOLSCAN_API_BASE = 'https://public-api.solscan.io';
const SOLSCAN_API_KEY = import.meta.env.VITE_SOLSCAN_API_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjcmVhdGVkQXQiOjE3NzAyNzM0MjMzODYsImVtYWlsIjoiYWxpeXVhaG1hZDE5OTZAZ21haWwuY29tIiwiYWN0aW9uIjoidG9rZW4tYXBpIiwiYXBpVmVyc2lvbiI6InYyIiwiaWF0IjoxNzcwMjczNDIzfQ.vjYg6Lz_Ep_7tADBuNrykOg8_uhGpnfRZCX2fSCTc9A';

const solscanRequest = async (endpoint, params = {}) => {
  try {
    const requestOptions = {
      method: 'get',
      url: `${SOLSCAN_API_BASE}${endpoint}`,
      headers: {
        token: SOLSCAN_API_KEY,
      },
      params: params,
    };

    const response = await axios.request(requestOptions);
    return response.data;
  } catch (error) {
    console.error('Solscan API error:', error.message);
    return null;
  }
};

export const getChainInfo = async () => {
  const data = await solscanRequest('/chaininfo');
  return data;
};

export const formatNumber = (num, decimals = 2) => {
  if (num >= 1e9) return `${(num / 1e9).toFixed(decimals)}B`;
  if (num >= 1e6) return `${(num / 1e6).toFixed(decimals)}M`;
  if (num >= 1e3) return `${(num / 1e3).toFixed(decimals)}K`;
  return num.toFixed(decimals);
};

export const formatSol = (lamports, decimals = 3) => {
  return (lamports / 1e9).toFixed(decimals);
};

export const formatTimeAgo = (timestamp) => {
  const seconds = Math.floor((Date.now() / 1000) - timestamp);
  
  if (seconds < 60) return `${seconds}s ago`;
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}hr ago`;
  return `${Math.floor(seconds / 86400)}d ago`;
};
