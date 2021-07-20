import api from './api';

const endPoint = '/projects';

export default {
  get: (page: number, perPage: number, term: string) =>
    api.get(endPoint, { params: { page, perPage, term } }),
  getAll: () => api.get(endPoint),
  show: (id: number) => api.get(`${endPoint}/${id}`),
  getStudents: (id: number) => api.get(`${endPoint}/${id}/students`),
  getTeachers: (id: number) => api.get(`${endPoint}/${id}/teachers`),
  getDisciplines: (id: number) => api.get(`${endPoint}/${id}/disciplines`),
  create: (code: string) => api.post(endPoint, { code }),
  import: (data: FormData) => api.post(`${endPoint}/import`, data),
};
