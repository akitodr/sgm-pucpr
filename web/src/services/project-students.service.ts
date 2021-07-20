import api from './api';

const endPoint = '/projects-students';

export default {
  show: (student_id: number) => api.get(`${endPoint}/${student_id}`),
  create: (
    teacher_id: number,
    term_code: string,
    term_id: number,
    pay_amount: string,
    start_date: Date,
    modality: string,
    chr: number,
    chv: number,
    class_number: number,
    extraclass_number: number,
    type_of_service: string
  ) =>
    api.put(endPoint, {
      teacher_id,
      term_code,
      term_id,
      pay_amount,
      start_date,
      modality,
      chr,
      chv,
      class_number,
      extraclass_number,
      type_of_service,
    }),
  update: (
    id: number,
    teacher_id: number,
    term_code: string,
    term_id: number,
    pay_amount: string,
    start_date: Date,
    modality: string,
    chr: number,
    chv: number,
    class_number: number,
    extraclass_number: number,
    type_of_service: string,
    disciplines: number[]
  ) =>
    api.put(`${endPoint}/${id}`, {
      teacher_id,
      term_code,
      term_id,
      pay_amount,
      start_date,
      modality,
      chr,
      chv,
      class_number,
      extraclass_number,
      type_of_service,
      disciplines
    }),
};
