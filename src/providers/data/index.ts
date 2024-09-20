import { fetchWrapper } from "./fetch-wrapper";
export const API_BASE_URL = "http://https://app.bruxt.com/api-lenses";
export const API_URL = `${API_BASE_URL}`;


// WebSocket is not applicable in REST, so WS_URL is removed

// A function to fetch data from the REST API
export const fetchData = async (endpoint: string, options: RequestInit) => {
  try {
    const url = `${API_BASE_URL}/${endpoint}`;
    return await fetchWrapper(url, options);
  } catch (error) {
    return Promise.reject(error as Error);
  }
};

export const dataProviderRest = {
  getList: async (resource: string, params: any) => {
    const data = await fetchData(`${resource}/${params.id}/traffic`, {
      method: 'GET',
    });
    return {
      data: data,
      total: data,
    };
  },
  getOne: async (resource: string, id: string) => {
    return await fetchData(`${resource}/${id}`, {
      method: 'GET',
    });
  },
  create: async (resource: string, data: any) => {
    const token = localStorage.getItem("accessToken")
    return await fetchData(resource, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, // Add the Bearer Authorization header
      },
      body: JSON.stringify(data),
    });
  },
  update: async (resource: string, id: string, data: any) => {
    return await fetchData(`${resource}/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },
  delete: async (resource: string, id: string) => {
    return await fetchData(`${resource}/${id}`, {
      method: 'DELETE',
    });
  },
};