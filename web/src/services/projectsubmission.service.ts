import api from './api';

const endPoint = '/projectsubmissions';


export default {
  get: () => api.get(endPoint),
  create: (
    campus_id: number,
    schools_id: number,
    courses_id: number,
    teachers_id: JSON,
    disciplines_id: JSON,
    students_amount: number,
    students_justification: string,
    chc_amount: number,
    chc_justification: string,
    che_amount: number,
    che_justification: string,
    total: number,
    characteristics_justification: string,
    challanges_justification: string,
    strategies: JSON,
    challanges: JSON,
    activities: JSON
  ) => api.post(endPoint, {
    campus_id,
    schools_id,
    courses_id,
    teachers_id,
    disciplines_id,
    students_amount,
    students_justification,
    chc_amount,
    chc_justification,
    che_amount,
    che_justification,
    total,
    characteristics_justification,
    challanges_justification,
    strategies,
    challanges,
    activities })
};