import api from './api';

const endPoint = '/teachers';

export default {
  get: (page: number, perPage: number, term: string) =>
    api.get(endPoint, { params: { page, perPage, term } }),
  getId: (id: number) => api.get(`${endPoint}/${id}`),
  create: (
    name: string,
    code: string,
    email: string,
    phone: string,
    course_id: number,
    school_id: number
  ) =>
    api.post(endPoint, {
      name,
      code,
      email,
      phone,
      course_id,
      school_id,
    }),
  update: (
    id: number,
    name: string,
    code: string,
    email: string,
    phone: string,
    course_id: number,
    school_id: number
  ) =>
    api.put(`${endPoint}/${id}`, {
      name,
      code,
      email,
      phone,
      course_id,
      school_id,
    }),
  import: (data: FormData) => api.post(`${endPoint}/import`, data),
};
