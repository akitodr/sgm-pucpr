import api from './api';

const endPoint = '/campuses';

export default {
  get: () => api.get(endPoint),
  getId: (id: number) => api.get(`${endPoint}/${id}`),
  getSchools: (id: number) => api.get(`${endPoint}/${id}/schools`),
  create: (name: string) => api.post(endPoint, { name }),
  delete: (id: number) => api.delete(`${endPoint}/${id}`),
  update: (id: number, name: string) => api.put(`${endPoint}/${id}`, { name }),
};
