import axios, { AxiosError, AxiosResponse } from "axios";
import axiosRetry from "axios-retry";

export const baseUrl = process.env.NEXT_PUBLIC_BASE_URL as string;

export const retryCondition = (error: AxiosError): boolean => {
  return error.response?.status === 429;
};

axiosRetry(axios, {
  retries: 3,
  retryDelay: axiosRetry.exponentialDelay,
  retryCondition,
});

const handleResponse = (response: AxiosResponse<any[]>): any[] => {
    return response.data;
  };
  
  const fetchData = async (endpoint: string): Promise<any[]> => {
    try {
      const response = await axios.get<any[]>(`${baseUrl}${endpoint}`);
      return handleResponse(response);
    } catch (error) {
      console.error(`Error fetching data from ${endpoint}:`, error);
      throw error;
    }
  };

export const getDomainsData = (): Promise<any[]> => fetchData("/domain", []);

//DeleteDomain

export const deleteDomain = async (id: string): Promise<void> => {
  try {
      await axios.delete(`${baseUrl}/domain/${id}`);
  } catch (error) {
      console.error(`Error deleting domain with id ${id}:`, error);
      throw error;
  }
};