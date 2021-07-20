import api from './api';

const endPoint = '/students';

export default {
  get: (page: number, perPage: number, term: string) =>
    api.get(endPoint, { params: { page, perPage, term } }),
  getId: (id: number) => api.get(`${endPoint}/${id}`),
  create: (
    name: string,
    cpf: string,
    birth_date: Date,
    phone: string,
    email: string,
    institutional_email: string,
    status: string,
    school_id: number,
    course_id: number
  ) =>
    api.post(endPoint, {
      name,
      cpf,
      birth_date,
      phone,
      email,
      institutional_email,
      status,
      school_id,
      course_id,
    }),
  update: (
    id: number,
    name: string,
    cpf: string,
    birth_date: Date,
    phone: string,
    email: string,
    institutional_email: string,
    status: string,
    school_id: number,
    course_id: number
  ) =>
    api.put(`${endPoint}/${id}`, {
      name,
      cpf,
      birth_date,
      phone,
      email,
      institutional_email,
      status,
      school_id,
      course_id,
    }),
  import: (data: FormData) => api.post(`${endPoint}/import`, data),
};
