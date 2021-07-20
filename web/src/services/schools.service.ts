import api from './api';

const endPoint = '/schools';

export default {
  get: () => api.get(endPoint),
  getCourses: (id: number) => api.get(`${endPoint}/${id}/courses`),
  delete: (id: number) => api.delete(`${endPoint}/${id}`),
  create: (name: string, campusId: number) => api.post(endPoint, { name, campusId }),
  addCourse: (schoolId: number, courseId: number) => api.post(`${endPoint}/${schoolId}/add-course`, { schoolId, courseId }),
  deleteCourse: (schoolId: number, courseId: number) => api.post(`${endPoint}/${schoolId}/delete-course`, { courseId }),
  update: (id: number, name: string) => api.put(`${endPoint}/${id}`, { name }),
};